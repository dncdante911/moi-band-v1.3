<?php
/**
 * API для получения онлайн пользователей - версия 2.0
 * Расширенная информация о пользователях
 */

header('Content-Type: application/json');
header('Cache-Control: no-cache');

require_once '../../../../include_config/config.php';
require_once '../../../../include_config/db_connect.php';
require_once '../../../../include_config/Auth.php';

$response = [
    'success' => false,
    'users' => [],
    'count' => 0,
    'total_users' => 0
];

try {
    $auth = new Auth($pdo);
    
    if (!$auth->isLoggedIn()) {
        http_response_code(401);
        $response['error'] = 'Требуется авторизация';
        throw new Exception('Unauthorized');
    }
    
    $currentUser = $auth->getCurrentUser();
    
    // Параметры
    $roomId = filter_input(INPUT_GET, 'room_id', FILTER_VALIDATE_INT);
    $includeAway = filter_input(INPUT_GET, 'include_away', FILTER_VALIDATE_BOOLEAN) ?: false;
    $limit = filter_input(INPUT_GET, 'limit', FILTER_VALIDATE_INT) ?: 50;
    
    // Обновление статуса текущего пользователя
    $updateStmt = $pdo->prepare("
        UPDATE Users 
        SET 
            last_seen = NOW(),
            status = 'online'
        WHERE id = :user_id
    ");
    $updateStmt->execute(['user_id' => $currentUser['id']]);
    
    // Условия для выборки
    $conditions = ["u.is_banned = 0"];
    $params = [];
    
    // Онлайн - активность в последние 5 минут
    // Away - активность в последние 15 минут
    // Offline - остальные
    
    if ($includeAway) {
        $conditions[] = "u.last_seen > DATE_SUB(NOW(), INTERVAL 15 MINUTE)";
    } else {
        $conditions[] = "u.status = 'online'";
        $conditions[] = "u.last_seen > DATE_SUB(NOW(), INTERVAL 5 MINUTE)";
    }
    
    // Фильтрация по комнате если указана
    if ($roomId) {
        $conditions[] = "EXISTS (
            SELECT 1 FROM RoomMembers rm 
            WHERE rm.room_id = :room_id 
                AND rm.user_id = u.id
        )";
        $params['room_id'] = $roomId;
    }
    
    $whereClause = implode(' AND ', $conditions);
    
    // Получение пользователей
    $usersStmt = $pdo->prepare("
        SELECT 
            u.id,
            u.username,
            u.display_name,
            u.avatar_path,
            u.status,
            u.last_seen,
            u.bio,
            u.is_admin,
            u.is_verified,
            CASE 
                WHEN u.last_seen > DATE_SUB(NOW(), INTERVAL 5 MINUTE) THEN 'online'
                WHEN u.last_seen > DATE_SUB(NOW(), INTERVAL 15 MINUTE) THEN 'away'
                ELSE 'offline'
            END as calculated_status,
            -- Активность в чате
            (
                SELECT COUNT(*) 
                FROM RoomMessages 
                WHERE user_id = u.id 
                    AND created_at > DATE_SUB(NOW(), INTERVAL 24 HOUR)
            ) as messages_today,
            -- Последнее сообщение
            (
                SELECT created_at 
                FROM RoomMessages 
                WHERE user_id = u.id 
                ORDER BY created_at DESC 
                LIMIT 1
            ) as last_message_at
        FROM Users u
        WHERE $whereClause
        ORDER BY 
            CASE u.status 
                WHEN 'online' THEN 1
                WHEN 'away' THEN 2
                ELSE 3
            END,
            u.last_seen DESC,
            u.username ASC
        LIMIT :limit
    ");
    
    // Привязка параметров
    foreach ($params as $key => $value) {
        $usersStmt->bindValue(':' . $key, $value, is_int($value) ? PDO::PARAM_INT : PDO::PARAM_STR);
    }
    $usersStmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    
    $usersStmt->execute();
    $users = $usersStmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Подсчет общего количества пользователей
    $totalStmt = $pdo->query("
        SELECT COUNT(*) FROM Users WHERE is_banned = 0
    ");
    $totalUsers = $totalStmt->fetchColumn();
    
    // Форматирование данных
    $formattedUsers = array_map(function($user) {
        $lastSeen = strtotime($user['last_seen']);
        $now = time();
        $diff = $now - $lastSeen;
        
        // Форматирование времени последней активности
        if ($diff < 60) {
            $lastSeenText = 'только что';
        } elseif ($diff < 3600) {
            $minutes = floor($diff / 60);
            $lastSeenText = $minutes . ' мин. назад';
        } elseif ($diff < 86400) {
            $hours = floor($diff / 3600);
            $lastSeenText = $hours . ' ч. назад';
        } else {
            $days = floor($diff / 86400);
            $lastSeenText = $days . ' дн. назад';
        }
        
        return [
            'id' => (int)$user['id'],
            'username' => $user['username'],
            'display_name' => $user['display_name'] ?: $user['username'],
            'avatar_path' => $user['avatar_path'],
            'bio' => $user['bio'],
            'status' => $user['calculated_status'],
            'last_seen' => $user['last_seen'],
            'last_seen_text' => $lastSeenText,
            'is_admin' => (bool)$user['is_admin'],
            'is_verified' => (bool)$user['is_verified'],
            'messages_today' => (int)$user['messages_today'],
            'last_message_at' => $user['last_message_at']
        ];
    }, $users);
    
    // Группировка по статусу
    $groupedUsers = [
        'online' => [],
        'away' => [],
        'offline' => []
    ];
    
    foreach ($formattedUsers as $user) {
        $groupedUsers[$user['status']][] = $user;
    }
    
    $response = [
        'success' => true,
        'users' => $formattedUsers,
        'grouped' => $groupedUsers,
        'count' => count($formattedUsers),
        'online_count' => count($groupedUsers['online']),
        'away_count' => count($groupedUsers['away']),
        'total_users' => (int)$totalUsers,
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
} catch (PDOException $e) {
    error_log('Database error in online users API: ' . $e->getMessage());
    http_response_code(500);
    $response['error'] = 'Ошибка базы данных';
} catch (Exception $e) {
    error_log('Error in online users API: ' . $e->getMessage());
}

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);