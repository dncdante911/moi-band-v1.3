<?php
/**
 * API: hero-settings.php
 * GET /api/hero-settings.php — настройки hero-секции главной страницы
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/../include_config/db_connect.php';
require_once __DIR__ . '/../include_config/APIResponse.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    APIResponse::error('Method not allowed', 405);
}

$defaults = [
    'title'       => '🎸 Перекрестки Времен',
    'subtitle'    => 'Historical Heavy Metal',
    'description' => 'Новый альбом. Окунитесь в перекрестки истории, которые мир не забыл',
    'btn1_text'   => '▶️ Слушать альбом',
    'btn1_url'    => '/player',
    'btn2_text'   => '📖 О проекте',
    'btn2_url'    => '/about',
];

$settings = $defaults;

try {
    $keys = array_map(fn($k) => "hero_$k", array_keys($defaults));
    $placeholders = implode(',', array_fill(0, count($keys), '?'));
    $stmt = $pdo->prepare(
        "SELECT setting_key, setting_value FROM SiteSettings WHERE setting_key IN ($placeholders)"
    );
    $stmt->execute($keys);
    foreach ($stmt->fetchAll() as $row) {
        $key = str_replace('hero_', '', $row['setting_key']);
        if (isset($settings[$key]) && $row['setting_value'] !== '') {
            $settings[$key] = $row['setting_value'];
        }
    }
} catch (Exception $e) {
    // Таблицы настроек может не быть — возвращаем дефолты
}

APIResponse::success($settings);
