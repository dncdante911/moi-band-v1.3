<?php
/**
 * API для подсчета прослушиваний треков
 * Метод: POST
 * Параметры:
 * - track_id (int, обязательный)
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

// Валидация
if ($trackId <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Неверный ID трека']);
    exit;
}

try {
    // Проверяем существование трека
    $stmt = $pdo->prepare("SELECT id, views FROM Track WHERE id = ?");
    $stmt->execute([$trackId]);
    $track = $stmt->fetch();

    if (!$track) {
        http_response_code(404);
        echo json_encode(['error' => 'Трек не найден']);
        exit;
    }

    // Защита от накрутки: JS уже не даёт засчитать один и тот же трек дважды
    // подряд, но это легко обойти прямым POST-запросом. Дублируем защиту на
    // сервере — считаем максимум один просмотр трека на сессию за 12 часов.
    if (!isset($_SESSION['viewed_tracks']) || !is_array($_SESSION['viewed_tracks'])) {
        $_SESSION['viewed_tracks'] = [];
    }

    $now = time();
    $viewCooldown = 12 * 3600;
    $alreadyCounted = isset($_SESSION['viewed_tracks'][$trackId])
        && ($now - $_SESSION['viewed_tracks'][$trackId]) < $viewCooldown;

    if (!$alreadyCounted) {
        $stmt = $pdo->prepare("UPDATE Track SET views = views + 1 WHERE id = ?");
        $stmt->execute([$trackId]);
        $_SESSION['viewed_tracks'][$trackId] = $now;
    }

    // Получаем актуальное значение
    $stmt = $pdo->prepare("SELECT views FROM Track WHERE id = ?");
    $stmt->execute([$trackId]);
    $updatedTrack = $stmt->fetch();

    echo json_encode([
        'success' => true,
        'track_id' => $trackId,
        'views' => (int)$updatedTrack['views']
    ]);

} catch (Exception $e) {
    error_log('track-view.php: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка при подсчете прослушиваний']);
}
