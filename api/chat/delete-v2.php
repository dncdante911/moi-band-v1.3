<?php
/**
 * API для удаления сообщений - версия 2.0
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
    
    $messageId = isset($data['message_id']) ? (int)$data['message_id'] : 0;
    $hardDelete = isset($data['hard_delete']) ? (bool)$data['hard_delete'] : false;
    
    if (!$messageId) {
        http_response_code(400);
        $response['error'] = 'ID сообщения обязателен';
        throw new Exception('Message ID required');
    }
    
    // Получение информации о сообщении
    $checkStmt = $pdo->prepare("
        SELECT user_id, room_id, message 
        FROM RoomMessages 
        WHERE id = :id AND is_deleted = 0
        LIMIT 1
    ");
    $checkStmt->execute(['id' => $messageId]);
    $message = $checkStmt->fetch();
    
    if (!$message) {
        http_response_code(404);
        $response['error'] = 'Сообщение не найдено';
        throw new Exception('Message not found');
    }
    
    // Проверка прав
    $canDelete = false;
    
    // Владелец может удалять свои сообщения
    if ($message['user_id'] == $currentUser['id']) {
        $canDelete = true;
    }
    
    // Админ может удалять любые сообщения
    if ($currentUser['is_admin']) {
        $canDelete = true;
    }
    
    // Модератор комнаты может удалять сообщения
    if (!$canDelete) {
        $modStmt = $pdo->prepare("
            SELECT role FROM RoomMembers 
            WHERE room_id = :room_id 
                AND user_id = :user_id 
                AND role IN ('moderator', 'owner')
            LIMIT 1
        ");
        $modStmt->execute([
            'room_id' => $message['room_id'],
            'user_id' => $currentUser['id']
        ]);
        
        if ($modStmt->fetch()) {
            $canDelete = true;
        }
    }
    
    if (!$canDelete) {
        http_response_code(403);
        $response['error'] = 'Нет прав для удаления';
        throw new Exception('No permission');
    }
    
    $pdo->beginTransaction();
    
    try {
        // Сохранение в архив перед удалением
        $archiveStmt = $pdo->prepare("
            INSERT INTO DeletedMessages (
                original_id,
                room_id,
                user_id,
                message,
                deleted_by,
                deleted_at,
                reason
            ) VALUES (
                :original_id,
                :room_id,
                :user_id,
                :message,
                :deleted_by,
                NOW(),
                :reason
            )
        ");
        
        $archiveStmt->execute([
            'original_id' => $messageId,
            'room_id' => $message['room_id'],
            'user_id' => $message['user_id'],
            'message' => $message['message'],
            'deleted_by' => $currentUser['id'],
            'reason' => $data['reason'] ?? null
        ]);
        
        if ($hardDelete && $currentUser['is_admin']) {
            // Полное удаление (только для админов)
            $deleteStmt = $pdo->prepare("
                DELETE FROM RoomMessages WHERE id = :id
            ");
            $deleteStmt->execute(['id' => $messageId]);
        } else {
            // Мягкое удаление
            $deleteStmt = $pdo->prepare("
                UPDATE RoomMessages 
                SET 
                    is_deleted = 1,
                    deleted_at = NOW(),
                    deleted_by = :deleted_by
                WHERE id = :id
            ");
            $deleteStmt->execute([
                'deleted_by' => $currentUser['id'],
                'id' => $messageId
            ]);
        }
        
        $pdo->commit();
        
        $response = [
            'success' => true,
            'message_id' => $messageId,
            'deleted_at' => date('Y-m-d H:i:s'),
            'deleted_by' => $currentUser['username']
        ];
        
    } catch (PDOException $e) {
        $pdo->rollBack();
        error_log('Error deleting message: ' . $e->getMessage());
        http_response_code(500);
        $response['error'] = 'Ошибка при удалении';
    }
    
} catch (Exception $e) {
    error_log('Delete API error: ' . $e->getMessage());
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);