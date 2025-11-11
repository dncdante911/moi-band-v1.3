<?php
/**
 * API для получения сообщений - версия 2.0
 * Улучшенная производительность и функциональность
 */

header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('X-Content-Type-Options: nosniff');

// Подключения
require_once '../../../../include_config/config.php';
require_once '../../../../include_config/db_connect.php';
require_once '../../../../include_config/Auth.php';

// Инициализация ответа
$response = [
    'success' => false,
    'error' => null,
    'messages' => [],
    'room' => null,
    'total' => 0,
    'has_more' => false
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
    
    // Получение и валидация параметров
    $roomId = filter_input(INPUT_GET, 'room_id', FILTER_VALIDATE_INT);
    $limit = filter_input(INPUT_GET, 'limit', FILTER_VALIDATE_INT) ?: 50;
    $offset = filter_input(INPUT_GET, 'offset', FILTER_VALIDATE_INT) ?: 0;
    $afterId = filter_input(INPUT_GET, 'after_id', FILTER_VALIDATE_INT) ?: 0;
    $beforeId = filter_input(INPUT_GET, 'before_id', FILTER_VALIDATE_INT) ?: 0;
    $search = filter_input(INPUT_GET, 'search', FILTER_SANITIZE_STRING);
    
    // Ограничения
    $limit = min(max($limit, 1), 100);
    $offset = max($offset, 0);
    
    if (!$roomId) {
        http_response_code(400);
        $response['error'] = 'ID комнаты обязателен';
        throw new Exception('Room ID required');
    }
    
    // Проверка существования и доступа к комнате
    $roomStmt = $pdo->prepare("
        SELECT id, name, slug, is_private 
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
    
    // TODO: Проверка доступа к приватным комнатам
    if ($room['is_private']) {
        // Проверка членства в приватной комнате
        // ...
    }
    
    // Построение запроса для сообщений
    $conditions = ['rm.room_id = :room_id', 'rm.is_deleted = 0'];
    $params = ['room_id' => $roomId];
    
    if ($afterId > 0) {
        $conditions[] = 'rm.id > :after_id';
        $params['after_id'] = $afterId;
    }
    
    if ($beforeId > 0) {
        $conditions[] = 'rm.id < :before_id';
        $params['before_id'] = $beforeId;
    }
    
    if (!empty($search)) {
        $conditions[] = 'rm.message LIKE :search';
        $params['search'] = '%' . $search . '%';
    }
    
    $whereClause = implode(' AND ', $conditions);
    
    // Получение общего количества сообщений
    $countStmt = $pdo->prepare("
        SELECT COUNT(*) as total
        FROM RoomMessages rm
        WHERE $whereClause
    ");
    $countStmt->execute($params);
    $totalCount = $countStmt->fetchColumn();
    
    // Получение сообщений
    $messagesStmt = $pdo->prepare("
        SELECT 
            rm.id,
            rm.user_id,
            rm.message,
            rm.created_at,
            rm.updated_at,
            rm.is_edited,
            rm.reply_to_id,
            rm.attachment_url,
            rm.attachment_type,
            u.username,
            u.display_name,
            u.avatar_path,
            u.status,
            u.is_admin,
            u.is_verified,
            -- Информация о сообщении, на которое отвечаем
            reply_msg.message as reply_message,
            reply_user.username as reply_username
        FROM RoomMessages rm
        INNER JOIN Users u ON rm.user_id = u.id
        LEFT JOIN RoomMessages reply_msg ON rm.reply_to_id = reply_msg.id
        LEFT JOIN Users reply_user ON reply_msg.user_id = reply_user.id
        WHERE $whereClause
        ORDER BY rm.created_at DESC
        LIMIT :limit OFFSET :offset
    ");
    
    // Привязка параметров с типами
    foreach ($params as $key => $value) {
        $messagesStmt->bindValue(':' . $key, $value, is_int($value) ? PDO::PARAM_INT : PDO::PARAM_STR);
    }
    $messagesStmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $messagesStmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    
    $messagesStmt->execute();
    $messages = $messagesStmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Обработка и форматирование сообщений
    $formattedMessages = array_reverse(array_map(function($msg) use ($currentUser) {
        return [
            'id' => (int)$msg['id'],
            'user_id' => (int)$msg['user_id'],
            'username' => $msg['username'],
            'display_name' => $msg['display_name'],
            'avatar_path' => $msg['avatar_path'],
            'message' => $msg['message'],
            'created_at' => $msg['created_at'],
            'updated_at' => $msg['updated_at'],
            'timestamp' => date('H:i', strtotime($msg['created_at'])),
            'date' => date('d.m.Y', strtotime($msg['created_at'])),
            'is_edited' => (bool)$msg['is_edited'],
            'is_own' => ($msg['user_id'] == $currentUser['id']),
            'status' => $msg['status'],
            'is_admin' => (bool)$msg['is_admin'],
            'is_verified' => (bool)$msg['is_verified'],
            'reply_to' => $msg['reply_to_id'] ? [
                'id' => (int)$msg['reply_to_id'],
                'message' => $msg['reply_message'],
                'username' => $msg['reply_username']
            ] : null,
            'attachment' => $msg['attachment_url'] ? [
                'url' => $msg['attachment_url'],
                'type' => $msg['attachment_type']
            ] : null
        ];
    }, $messages));
    
    // Обновление последнего просмотра пользователем
    $updateLastSeenStmt = $pdo->prepare("
        UPDATE Users 
        SET last_seen = NOW(), status = 'online' 
        WHERE id = :user_id
    ");
    $updateLastSeenStmt->execute(['user_id' => $currentUser['id']]);
    
    // Формирование успешного ответа
    $response = [
        'success' => true,
        'room' => [
            'id' => (int)$room['id'],
            'name' => $room['name'],
            'slug' => $room['slug']
        ],
        'messages' => $formattedMessages,
        'total' => (int)$totalCount,
        'has_more' => ($offset + $limit < $totalCount),
        'pagination' => [
            'limit' => $limit,
            'offset' => $offset,
            'current_page' => floor($offset / $limit) + 1,
            'total_pages' => ceil($totalCount / $limit)
        ]
    ];
    
} catch (PDOException $e) {
    error_log('Database error in messages API: ' . $e->getMessage());
    http_response_code(500);
    $response['error'] = 'Ошибка базы данных';
} catch (Exception $e) {
    // Ошибки уже обработаны выше
    error_log('Error in messages API: ' . $e->getMessage());
}

// Отправка ответа
echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);