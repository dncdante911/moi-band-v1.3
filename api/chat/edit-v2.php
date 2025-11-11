<?php
/**
 * API для редактирования сообщений - версия 2.0
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
    $newMessage = isset($data['message']) ? trim($data['message']) : '';
    
    if (!$messageId || empty($newMessage)) {
        http_response_code(400);
        $response['error'] = 'Некорректные данные';
        throw new Exception('Invalid data');
    }
    
    if (mb_strlen($newMessage) > 5000) {
        http_response_code(400);
        $response['error'] = 'Сообщение слишком длинное';
        throw new Exception('Message too long');
    }
    
    // Проверка владельца сообщения
    $checkStmt = $pdo->prepare("
        SELECT user_id, created_at 
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
    
    // Проверка прав (только владелец или админ)
    if ($message['user_id'] != $currentUser['id'] && !$currentUser['is_admin']) {
        http_response_code(403);
        $response['error'] = 'Нет прав для редактирования';
        throw new Exception('No permission');
    }
    
    // Проверка времени (можно редактировать в течение 24 часов)
    $messageTime = strtotime($message['created_at']);
    $currentTime = time();
    if (($currentTime - $messageTime) > 86400 && !$currentUser['is_admin']) {
        http_response_code(403);
        $response['error'] = 'Время редактирования истекло';
        throw new Exception('Edit time expired');
    }
    
    // Сохранение истории редактирования
    $pdo->beginTransaction();
    
    try {
        // Сохранение старой версии
        $historyStmt = $pdo->prepare("
            INSERT INTO MessageHistory (
                message_id,
                old_content,
                edited_by,
                edited_at
            ) SELECT 
                id,
                message,
                :user_id,
                NOW()
            FROM RoomMessages 
            WHERE id = :message_id
        ");
        $historyStmt->execute([
            'user_id' => $currentUser['id'],
            'message_id' => $messageId
        ]);
        
        // Обновление сообщения
        $updateStmt = $pdo->prepare("
            UPDATE RoomMessages 
            SET 
                message = :message,
                is_edited = 1,
                updated_at = NOW(),
                edited_by = :user_id
            WHERE id = :id
        ");
        $updateStmt->execute([
            'message' => $newMessage,
            'user_id' => $currentUser['id'],
            'id' => $messageId
        ]);
        
        $pdo->commit();
        
        $response = [
            'success' => true,
            'message_id' => $messageId,
            'message' => $newMessage,
            'updated_at' => date('Y-m-d H:i:s'),
            'is_edited' => true
        ];
        
    } catch (PDOException $e) {
        $pdo->rollBack();
        error_log('Error editing message: ' . $e->getMessage());
        http_response_code(500);
        $response['error'] = 'Ошибка при редактировании';
    }
    
} catch (Exception $e) {
    error_log('Edit API error: ' . $e->getMessage());
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);