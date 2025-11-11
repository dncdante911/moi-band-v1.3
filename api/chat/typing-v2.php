<?php
/**
 * API для индикатора набора текста - версия 2.0
 */

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Метод не поддерживается']);
    exit;
}

require_once '../../../../include_config/config.php';
require_once '../../../../include_config/db_connect.php';
require_once '../../../../include_config/Auth.php';

$response = ['success' => false];

try {
    $auth = new Auth($pdo);
    
    if (!$auth->isLoggedIn()) {
        http_response_code(401);
        $response['error'] = 'Требуется авторизация';
        throw new Exception('Unauthorized');
    }
    
    $currentUser = $auth->getCurrentUser();
    $data = json_decode(file_get_contents('php://input'), true);
    
    $roomId = isset($data['room_id']) ? (int)$data['room_id'] : 0;
    $isTyping = isset($data['typing']) ? (bool)$data['typing'] : false;
    
    if (!$roomId) {
        http_response_code(400);
        $response['error'] = 'ID комнаты обязателен';
        throw new Exception('Room ID required');
    }
    
    // Проверка существования комнаты
    $roomStmt = $pdo->prepare("SELECT id FROM Rooms WHERE id = :id LIMIT 1");
    $roomStmt->execute(['id' => $roomId]);
    
    if (!$roomStmt->fetch()) {
        http_response_code(404);
        $response['error'] = 'Комната не найдена';
        throw new Exception('Room not found');
    }
    
    if ($isTyping) {
        // Добавление или обновление статуса набора
        $upsertStmt = $pdo->prepare("
            INSERT INTO TypingIndicators (room_id, user_id, started_at)
            VALUES (:room_id, :user_id, NOW())
            ON DUPLICATE KEY UPDATE started_at = NOW()
        ");
        $upsertStmt->execute([
            'room_id' => $roomId,
            'user_id' => $currentUser['id']
        ]);
    } else {
        // Удаление статуса набора
        $deleteStmt = $pdo->prepare("
            DELETE FROM TypingIndicators 
            WHERE room_id = :room_id AND user_id = :user_id
        ");
        $deleteStmt->execute([
            'room_id' => $roomId,
            'user_id' => $currentUser['id']
        ]);
    }
    
    // Очистка старых индикаторов (старше 10 секунд)
    $cleanupStmt = $pdo->prepare("
        DELETE FROM TypingIndicators 
        WHERE started_at < DATE_SUB(NOW(), INTERVAL 10 SECOND)
    ");
    $cleanupStmt->execute();
    
    // Получение текущих пользователей, которые печатают
    $typingStmt = $pdo->prepare("
        SELECT u.username, u.display_name
        FROM TypingIndicators ti
        JOIN Users u ON ti.user_id = u.id
        WHERE ti.room_id = :room_id 
            AND ti.user_id != :user_id
            AND ti.started_at > DATE_SUB(NOW(), INTERVAL 10 SECOND)
    ");
    $typingStmt->execute([
        'room_id' => $roomId,
        'user_id' => $currentUser['id']
    ]);
    $typingUsers = $typingStmt->fetchAll(PDO::FETCH_ASSOC);
    
    $response = [
        'success' => true,
        'typing_users' => array_map(function($user) {
            return $user['display_name'] ?: $user['username'];
        }, $typingUsers)
    ];
    
} catch (Exception $e) {
    error_log('Typing indicator error: ' . $e->getMessage());
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);