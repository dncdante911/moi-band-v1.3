<?php
/**
 * API для получения статистики трека
 * Метод: GET
 * Параметры:
 * - track_id (int, обязательный)
 */

header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../../include_config/db_connect.php';

// Проверяем метод запроса
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Получаем ID трека
$trackId = isset($_GET['track_id']) ? (int)$_GET['track_id'] : 0;

// Валидация
if ($trackId <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Неверный ID трека']);
    exit;
}

try {
    // Получаем статистику трека
    $stmt = $pdo->prepare("SELECT id, likes, dislikes, views FROM Track WHERE id = ?");
    $stmt->execute([$trackId]);
    $track = $stmt->fetch();

    if (!$track) {
        http_response_code(404);
        echo json_encode(['error' => 'Трек не найден']);
        exit;
    }

    // Определяем пользователя
    $userId = isset($_SESSION['user_id']) ? (int)$_SESSION['user_id'] : null;
    $sessionId = $userId ? null : session_id();

    // Получаем реакцию текущего пользователя
    $userReaction = null;
    if ($userId) {
        $stmt = $pdo->prepare("SELECT reaction_type FROM TrackReactions WHERE track_id = ? AND user_id = ?");
        $stmt->execute([$trackId, $userId]);
    } else {
        $stmt = $pdo->prepare("SELECT reaction_type FROM TrackReactions WHERE track_id = ? AND session_id = ?");
        $stmt->execute([$trackId, $sessionId]);
    }

    $reaction = $stmt->fetch();
    if ($reaction) {
        $userReaction = $reaction['reaction_type'];
    }

    echo json_encode([
        'success' => true,
        'track_id' => $trackId,
        'likes' => (int)$track['likes'],
        'dislikes' => (int)$track['dislikes'],
        'views' => (int)$track['views'],
        'user_reaction' => $userReaction
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка при получении статистики: ' . $e->getMessage()]);
}
