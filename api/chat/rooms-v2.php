<?php
/**
 * API для управления комнатами - версия 2.0
 */

header('Content-Type: application/json');

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
    $method = $_SERVER['REQUEST_METHOD'];
    
    switch ($method) {
        case 'GET':
            // Получение списка комнат
            $includePrivate = filter_input(INPUT_GET, 'include_private', FILTER_VALIDATE_BOOLEAN) ?: false;
            $search = filter_input(INPUT_GET, 'search', FILTER_SANITIZE_STRING);
            
            $conditions = [];
            $params = [];
            
            if (!$includePrivate) {
                $conditions[] = "r.is_private = 0";
            } else {
                // Включить приватные комнаты, в которых состоит пользователь
                $conditions[] = "(r.is_private = 0 OR EXISTS (
                    SELECT 1 FROM RoomMembers rm 
                    WHERE rm.room_id = r.id AND rm.user_id = :user_id
                ))";
                $params['user_id'] = $currentUser['id'];
            }
            
            if ($search) {
                $conditions[] = "(r.name LIKE :search OR r.description LIKE :search)";
                $params['search'] = '%' . $search . '%';
            }
            
            $whereClause = $conditions ? 'WHERE ' . implode(' AND ', $conditions) : '';
            
            $roomsStmt = $pdo->prepare("
                SELECT 
                    r.id,
                    r.name,
                    r.slug,
                    r.description,
                    r.icon,
                    r.is_private,
                    r.created_at,
                    r.last_message_at,
                    r.messages_count,
                    u.username as creator_name,
                    -- Количество участников
                    (SELECT COUNT(*) FROM RoomMembers WHERE room_id = r.id) as members_count,
                    -- Количество онлайн
                    (SELECT COUNT(*) 
                     FROM RoomMembers rm 
                     JOIN Users u ON rm.user_id = u.id
                     WHERE rm.room_id = r.id 
                        AND u.status = 'online'
                        AND u.last_seen > DATE_SUB(NOW(), INTERVAL 5 MINUTE)
                    ) as online_count,
                    -- Последнее сообщение
                    (SELECT message 
                     FROM RoomMessages 
                     WHERE room_id = r.id AND is_deleted = 0
                     ORDER BY created_at DESC 
                     LIMIT 1
                    ) as last_message,
                    -- Непрочитанные сообщения
                    COALESCE((
                        SELECT COUNT(*) 
                        FROM RoomMessages msg
                        WHERE msg.room_id = r.id 
                            AND msg.created_at > COALESCE(
                                (SELECT last_read_at 
                                 FROM RoomReadStatus 
                                 WHERE room_id = r.id AND user_id = :current_user_id),
                                '1970-01-01'
                            )
                    ), 0) as unread_count
                FROM Rooms r
                LEFT JOIN Users u ON r.created_by = u.id
                $whereClause
                ORDER BY 
                    r.last_message_at DESC,
                    r.created_at DESC
            ");
            
            $params['current_user_id'] = $currentUser['id'];
            $roomsStmt->execute($params);
            $rooms = $roomsStmt->fetchAll(PDO::FETCH_ASSOC);
            
            $response = [
                'success' => true,
                'rooms' => array_map(function($room) {
                    return [
                        'id' => (int)$room['id'],
                        'name' => $room['name'],
                        'slug' => $room['slug'],
                        'description' => $room['description'],
                        'icon' => $room['icon'] ?: '💬',
                        'is_private' => (bool)$room['is_private'],
                        'created_at' => $room['created_at'],
                        'creator_name' => $room['creator_name'],
                        'members_count' => (int)$room['members_count'],
                        'online_count' => (int)$room['online_count'],
                        'messages_count' => (int)$room['messages_count'],
                        'last_message' => $room['last_message'],
                        'last_message_at' => $room['last_message_at'],
                        'unread_count' => (int)$room['unread_count'],
                        'has_unread' => $room['unread_count'] > 0
                    ];
                }, $rooms),
                'total' => count($rooms)
            ];
            break;
            
        case 'POST':
            // Создание новой комнаты (только для админов)
            if (!$currentUser['is_admin']) {
                http_response_code(403);
                $response['error'] = 'Недостаточно прав';
                throw new Exception('No permission');
            }
            
            $data = json_decode(file_get_contents('php://input'), true);
            
            $name = trim($data['name'] ?? '');
            $description = trim($data['description'] ?? '');
            $icon = trim($data['icon'] ?? '');
            $isPrivate = isset($data['is_private']) ? (bool)$data['is_private'] : false;
            
            if (empty($name)) {
                http_response_code(400);
                $response['error'] = 'Название комнаты обязательно';
                throw new Exception('Room name required');
            }
            
            // Генерация slug
            $slug = strtolower(preg_replace('/[^a-z0-9-]/', '-', 
                    transliterator_transliterate('Any-Latin; Latin-ASCII', $name)));
            $slug = preg_replace('/-+/', '-', $slug);
            $slug = trim($slug, '-');
            
            // Проверка уникальности slug
            $checkSlugStmt = $pdo->prepare("SELECT id FROM Rooms WHERE slug = :slug");
            $checkSlugStmt->execute(['slug' => $slug]);
            
            if ($checkSlugStmt->fetch()) {
                $slug .= '-' . uniqid();
            }
            
            $pdo->beginTransaction();
            
            try {
                // Создание комнаты
                $createStmt = $pdo->prepare("
                    INSERT INTO Rooms (
                        name, slug, description, icon, 
                        is_private, created_by, created_at
                    ) VALUES (
                        :name, :slug, :description, :icon,
                        :is_private, :created_by, NOW()
                    )
                ");
                
                $createStmt->execute([
                    'name' => $name,
                    'slug' => $slug,
                    'description' => $description,
                    'icon' => $icon ?: '💬',
                    'is_private' => $isPrivate,
                    'created_by' => $currentUser['id']
                ]);
                
                $roomId = $pdo->lastInsertId();
                
                // Добавление создателя как владельца
                $memberStmt = $pdo->prepare("
                    INSERT INTO RoomMembers (room_id, user_id, role, joined_at)
                    VALUES (:room_id, :user_id, 'owner', NOW())
                ");
                $memberStmt->execute([
                    'room_id' => $roomId,
                    'user_id' => $currentUser['id']
                ]);
                
                $pdo->commit();
                
                $response = [
                    'success' => true,
                    'room' => [
                        'id' => $roomId,
                        'name' => $name,
                        'slug' => $slug,
                        'description' => $description,
                        'icon' => $icon ?: '💬',
                        'is_private' => $isPrivate
                    ]
                ];
                
            } catch (PDOException $e) {
                $pdo->rollBack();
                error_log('Error creating room: ' . $e->getMessage());
                http_response_code(500);
                $response['error'] = 'Ошибка создания комнаты';
            }
            break;
            
        case 'PUT':
            // Обновление комнаты
            $data = json_decode(file_get_contents('php://input'), true);
            $roomId = isset($data['room_id']) ? (int)$data['room_id'] : 0;
            
            if (!$roomId) {
                http_response_code(400);
                $response['error'] = 'ID комнаты обязателен';
                throw new Exception('Room ID required');
            }
            
            // Проверка прав на редактирование
            $checkRoomStmt = $pdo->prepare("
                SELECT r.*, rm.role 
                FROM Rooms r
                LEFT JOIN RoomMembers rm ON r.id = rm.room_id AND rm.user_id = :user_id
                WHERE r.id = :room_id
            ");
            $checkRoomStmt->execute([
                'room_id' => $roomId,
                'user_id' => $currentUser['id']
            ]);
            $room = $checkRoomStmt->fetch();
            
            if (!$room) {
                http_response_code(404);
                $response['error'] = 'Комната не найдена';
                throw new Exception('Room not found');
            }
            
            $canEdit = $currentUser['is_admin'] || 
                       $room['role'] === 'owner' || 
                       $room['role'] === 'moderator';
            
            if (!$canEdit) {
                http_response_code(403);
                $response['error'] = 'Недостаточно прав';
                throw new Exception('No permission');
            }
            
            // Обновление полей
            $updates = [];
            $params = ['room_id' => $roomId];
            
            if (isset($data['name'])) {
                $updates[] = 'name = :name';
                $params['name'] = trim($data['name']);
            }
            
            if (isset($data['description'])) {
                $updates[] = 'description = :description';
                $params['description'] = trim($data['description']);
            }
            
            if (isset($data['icon'])) {
                $updates[] = 'icon = :icon';
                $params['icon'] = trim($data['icon']);
            }
            
            if (isset($data['is_private']) && $currentUser['is_admin']) {
                $updates[] = 'is_private = :is_private';
                $params['is_private'] = (bool)$data['is_private'];
            }
            
            if (empty($updates)) {
                http_response_code(400);
                $response['error'] = 'Нет данных для обновления';
                throw new Exception('No data to update');
            }
            
            $updateStmt = $pdo->prepare("
                UPDATE Rooms 
                SET " . implode(', ', $updates) . "
                WHERE id = :room_id
            ");
            $updateStmt->execute($params);
            
            $response = [
                'success' => true,
                'room_id' => $roomId,
                'updated' => true
            ];
            break;
            
        case 'DELETE':
            // Удаление комнаты (только владелец или админ)
            $roomId = filter_input(INPUT_GET, 'room_id', FILTER_VALIDATE_INT);
            
            if (!$roomId) {
                http_response_code(400);
                $response['error'] = 'ID комнаты обязателен';
                throw new Exception('Room ID required');
            }
            
            $checkStmt = $pdo->prepare("
                SELECT r.created_by, rm.role
                FROM Rooms r
                LEFT JOIN RoomMembers rm ON r.id = rm.room_id AND rm.user_id = :user_id
                WHERE r.id = :room_id
            ");
            $checkStmt->execute([
                'room_id' => $roomId,
                'user_id' => $currentUser['id']
            ]);
            $room = $checkStmt->fetch();
            
            if (!$room) {
                http_response_code(404);
                $response['error'] = 'Комната не найдена';
                throw new Exception('Room not found');
            }
            
            $canDelete = $currentUser['is_admin'] || $room['role'] === 'owner';
            
            if (!$canDelete) {
                http_response_code(403);
                $response['error'] = 'Недостаточно прав';
                throw new Exception('No permission');
            }
            
            // Удаление комнаты (каскадно удалятся сообщения и участники)
            $deleteStmt = $pdo->prepare("DELETE FROM Rooms WHERE id = :room_id");
            $deleteStmt->execute(['room_id' => $roomId]);
            
            $response = [
                'success' => true,
                'deleted' => true,
                'room_id' => $roomId
            ];
            break;
            
        default:
            http_response_code(405);
            $response['error'] = 'Метод не поддерживается';
    }
    
} catch (Exception $e) {
    error_log('Rooms API error: ' . $e->getMessage());
}

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);