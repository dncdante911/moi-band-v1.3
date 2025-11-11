<?php
/**
 * API для отправки сообщений - версия 2.0
 * Расширенная функциональность и валидация
 */

header('Content-Type: application/json');
header('Cache-Control: no-cache');
header('X-Content-Type-Options: nosniff');

// Только POST запросы
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Метод не поддерживается']);
    exit;
}

// Подключения
require_once '../../../../include_config/config.php';
require_once '../../../../include_config/db_connect.php';
require_once '../../../../include_config/Auth.php';

// Инициализация
$response = [
    'success' => false,
    'error' => null,
    'message_id' => null,
    'message' => null
];

try {
    // Проверка авторизации
    $auth = new Auth($pdo);
    
    if (!$auth->isLoggedIn()) {
        http_response_code(401);
        $response['error'] = 'Требуется авторизация';
        throw new Exception('Unauthorized');
    }
    
    $currentUser = $auth->getCurrentUser();
    
    // Получение и парсинг данных
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        $response['error'] = 'Некорректный JSON: ' . json_last_error_msg();
        throw new Exception('Invalid JSON');
    }
    
    // Валидация данных
    $roomId = isset($data['room_id']) ? (int)$data['room_id'] : 0;
    $message = isset($data['message']) ? trim($data['message']) : '';
    $replyToId = isset($data['reply_to_id']) ? (int)$data['reply_to_id'] : null;
    $attachmentUrl = isset($data['attachment_url']) ? trim($data['attachment_url']) : null;
    $attachmentType = isset($data['attachment_type']) ? trim($data['attachment_type']) : null;
    
    // Проверка обязательных полей
    if (!$roomId) {
        http_response_code(400);
        $response['error'] = 'ID комнаты обязателен';
        throw new Exception('Room ID required');
    }
    
    if (empty($message) && empty($attachmentUrl)) {
        http_response_code(400);
        $response['error'] = 'Сообщение не может быть пустым';
        throw new Exception('Message required');
    }
    
    // Проверка длины сообщения
    $messageLength = mb_strlen($message);
    if ($messageLength > 5000) {
        http_response_code(400);
        $response['error'] = 'Сообщение слишком длинное (максимум 5000 символов)';
        throw new Exception('Message too long');
    }
    
    // Проверка существования комнаты
    $roomStmt = $pdo->prepare("
        SELECT id, name, is_private, allow_messages 
        FROM Rooms 
        WHERE id = :room_id
        LIMIT 1
    ");
    $roomStmt->execute(['room_id' => $roomId]);
    $room = $roomStmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$room) {
        http_response_code(404);
        $response['error'] = 'Комната не найдена';
        throw new Exception('Room not found');
    }
    
    // Проверка разрешения отправки сообщений
    if (isset($room['allow_messages']) && !$room['allow_messages']) {
        http_response_code(403);
        $response['error'] = 'Отправка сообщений в эту комнату запрещена';
        throw new Exception('Messages not allowed');
    }
    
    // Проверка доступа к приватной комнате
    if ($room['is_private']) {
        $memberStmt = $pdo->prepare("
            SELECT id FROM RoomMembers 
            WHERE room_id = :room_id AND user_id = :user_id
            LIMIT 1
        ");
        $memberStmt->execute([
            'room_id' => $roomId,
            'user_id' => $currentUser['id']
        ]);
        
        if (!$memberStmt->fetch()) {
            http_response_code(403);
            $response['error'] = 'Нет доступа к приватной комнате';
            throw new Exception('No access to private room');
        }
    }
    
    // Проверка лимита сообщений (антиспам)
    $rateLimitStmt = $pdo->prepare("
        SELECT COUNT(*) as count 
        FROM RoomMessages 
        WHERE user_id = :user_id 
            AND created_at > DATE_SUB(NOW(), INTERVAL 1 MINUTE)
    ");
    $rateLimitStmt->execute(['user_id' => $currentUser['id']]);
    $recentMessages = $rateLimitStmt->fetchColumn();
    
    if ($recentMessages >= 10) {
        http_response_code(429);
        $response['error'] = 'Слишком много сообщений. Подождите немного.';
        throw new Exception('Rate limit exceeded');
    }
    
    // Проверка сообщения для ответа
    if ($replyToId) {
        $replyStmt = $pdo->prepare("
            SELECT id FROM RoomMessages 
            WHERE id = :id AND room_id = :room_id
            LIMIT 1
        ");
        $replyStmt->execute([
            'id' => $replyToId,
            'room_id' => $roomId
        ]);
        
        if (!$replyStmt->fetch()) {
            $replyToId = null; // Игнорируем неверный reply_to_id
        }
    }
    
    // Начало транзакции
    $pdo->beginTransaction();
    
    try {
        // Вставка сообщения
        $insertStmt = $pdo->prepare("
            INSERT INTO RoomMessages (
                room_id, 
                user_id, 
                message, 
                reply_to_id,
                attachment_url,
                attachment_type,
                created_at,
                ip_address,
                user_agent
            ) VALUES (
                :room_id,
                :user_id,
                :message,
                :reply_to_id,
                :attachment_url,
                :attachment_type,
                NOW(),
                :ip_address,
                :user_agent
            )
        ");
        
        $insertStmt->execute([
            'room_id' => $roomId,
            'user_id' => $currentUser['id'],
            'message' => $message,
            'reply_to_id' => $replyToId,
            'attachment_url' => $attachmentUrl,
            'attachment_type' => $attachmentType,
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? null,
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? null
        ]);
        
        $messageId = $pdo->lastInsertId();
        
        // Обновление счетчика сообщений пользователя
        $updateUserStmt = $pdo->prepare("
            UPDATE Users 
            SET 
                messages_count = messages_count + 1,
                last_message_at = NOW(),
                last_seen = NOW(),
                status = 'online'
            WHERE id = :user_id
        ");
        $updateUserStmt->execute(['user_id' => $currentUser['id']]);
        
        // Обновление активности комнаты
        $updateRoomStmt = $pdo->prepare("
            UPDATE Rooms 
            SET 
                last_message_at = NOW(),
                messages_count = messages_count + 1
            WHERE id = :room_id
        ");
        $updateRoomStmt->execute(['room_id' => $roomId]);
        
        // Создание уведомлений для упомянутых пользователей
        if (preg_match_all('/@(\w+)/', $message, $matches)) {
            $mentions = array_unique($matches[1]);
            
            foreach ($mentions as $username) {
                $mentionStmt = $pdo->prepare("
                    SELECT id FROM Users 
                    WHERE username = :username 
                    LIMIT 1
                ");
                $mentionStmt->execute(['username' => $username]);
                $mentionedUser = $mentionStmt->fetch();
                
                if ($mentionedUser && $mentionedUser['id'] != $currentUser['id']) {
                    // Создание уведомления
                    $notifyStmt = $pdo->prepare("
                        INSERT INTO Notifications (
                            user_id,
                            type,
                            message,
                            data,
                            created_at
                        ) VALUES (
                            :user_id,
                            'mention',
                            :message,
                            :data,
                            NOW()
                        )
                    ");
                    
                    $notifyStmt->execute([
                        'user_id' => $mentionedUser['id'],
                        'message' => $currentUser['username'] . ' упомянул вас в чате',
                        'data' => json_encode([
                            'room_id' => $roomId,
                            'message_id' => $messageId,
                            'from_user' => $currentUser['username']
                        ])
                    ]);
                }
            }
        }
        
        $pdo->commit();
        
        // Формирование успешного ответа
        $response = [
            'success' => true,
            'message_id' => (int)$messageId,
            'message' => $message,
            'username' => $currentUser['username'],
            'display_name' => $currentUser['display_name'] ?? $currentUser['username'],
            'avatar_path' => $currentUser['avatar_path'],
            'timestamp' => date('H:i'),
            'created_at' => date('Y-m-d H:i:s'),
            'reply_to_id' => $replyToId,
            'attachment' => $attachmentUrl ? [
                'url' => $attachmentUrl,
                'type' => $attachmentType
            ] : null
        ];
        
    } catch (PDOException $e) {
        $pdo->rollBack();
        error_log('Database error in send message: ' . $e->getMessage());
        http_response_code(500);
        $response['error'] = 'Ошибка сохранения сообщения';
        throw new Exception('Database error');
    }
    
} catch (Exception $e) {
    error_log('Error in send API: ' . $e->getMessage());
}

// Отправка ответа
echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);