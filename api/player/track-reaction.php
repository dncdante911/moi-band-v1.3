<?php
/**
 * API для лайков/дизлайков треков
 * Метод: POST
 * Параметры:
 * - track_id (int, обязательный)
 * - reaction (string: 'like' или 'dislike', обязательный)
 */

header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../../include_config/db_connect.php';

// Проверяем метод запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Получаем данные
$data = json_decode(file_get_contents('php://input'), true);
$trackId = isset($data['track_id']) ? (int)$data['track_id'] : 0;
$reactionType = isset($data['reaction']) ? trim($data['reaction']) : '';

// Валидация
if ($trackId <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Неверный ID трека']);
    exit;
}

if (!in_array($reactionType, ['like', 'dislike'], true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Неверный тип реакции']);
    exit;
}

// Проверяем существование трека
$stmt = $pdo->prepare("SELECT id, likes, dislikes FROM Track WHERE id = ?");
$stmt->execute([$trackId]);
$track = $stmt->fetch();

if (!$track) {
    http_response_code(404);
    echo json_encode(['error' => 'Трек не найден']);
    exit;
}

// Определяем пользователя (авторизованный или анонимный)
$userId = isset($_SESSION['user_id']) ? (int)$_SESSION['user_id'] : null;
$sessionId = $userId ? null : session_id();

try {
    $pdo->beginTransaction();

    // Проверяем, есть ли уже реакция от этого пользователя
    if ($userId) {
        $stmt = $pdo->prepare("SELECT id, reaction_type FROM TrackReactions WHERE track_id = ? AND user_id = ?");
        $stmt->execute([$trackId, $userId]);
    } else {
        $stmt = $pdo->prepare("SELECT id, reaction_type FROM TrackReactions WHERE track_id = ? AND session_id = ?");
        $stmt->execute([$trackId, $sessionId]);
    }

    $existingReaction = $stmt->fetch();

    if ($existingReaction) {
        $oldReaction = $existingReaction['reaction_type'];

        if ($oldReaction === $reactionType) {
            // Убираем реакцию (пользователь нажал еще раз на ту же кнопку)
            $stmt = $pdo->prepare("DELETE FROM TrackReactions WHERE id = ?");
            $stmt->execute([$existingReaction['id']]);

            // Уменьшаем счетчик
            if ($reactionType === 'like') {
                $pdo->prepare("UPDATE Track SET likes = GREATEST(0, likes - 1) WHERE id = ?")->execute([$trackId]);
            } else {
                $pdo->prepare("UPDATE Track SET dislikes = GREATEST(0, dislikes - 1) WHERE id = ?")->execute([$trackId]);
            }

            $action = 'removed';
        } else {
            // Меняем реакцию
            $stmt = $pdo->prepare("UPDATE TrackReactions SET reaction_type = ? WHERE id = ?");
            $stmt->execute([$reactionType, $existingReaction['id']]);

            // Обновляем счетчики
            if ($reactionType === 'like') {
                $pdo->prepare("UPDATE Track SET likes = likes + 1, dislikes = GREATEST(0, dislikes - 1) WHERE id = ?")->execute([$trackId]);
            } else {
                $pdo->prepare("UPDATE Track SET dislikes = dislikes + 1, likes = GREATEST(0, likes - 1) WHERE id = ?")->execute([$trackId]);
            }

            $action = 'changed';
        }
    } else {
        // Добавляем новую реакцию
        if ($userId) {
            $stmt = $pdo->prepare("INSERT INTO TrackReactions (track_id, user_id, reaction_type) VALUES (?, ?, ?)");
            $stmt->execute([$trackId, $userId, $reactionType]);
        } else {
            $stmt = $pdo->prepare("INSERT INTO TrackReactions (track_id, session_id, reaction_type) VALUES (?, ?, ?)");
            $stmt->execute([$trackId, $sessionId, $reactionType]);
        }

        // Увеличиваем счетчик
        if ($reactionType === 'like') {
            $pdo->prepare("UPDATE Track SET likes = likes + 1 WHERE id = ?")->execute([$trackId]);
        } else {
            $pdo->prepare("UPDATE Track SET dislikes = dislikes + 1 WHERE id = ?")->execute([$trackId]);
        }

        $action = 'added';
    }

    $pdo->commit();

    // Получаем обновленные данные
    $stmt = $pdo->prepare("SELECT likes, dislikes FROM Track WHERE id = ?");
    $stmt->execute([$trackId]);
    $updatedTrack = $stmt->fetch();

    echo json_encode([
        'success' => true,
        'action' => $action,
        'track_id' => $trackId,
        'likes' => (int)$updatedTrack['likes'],
        'dislikes' => (int)$updatedTrack['dislikes']
    ]);

} catch (Exception $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка при обработке реакции: ' . $e->getMessage()]);
}
