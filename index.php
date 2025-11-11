<?php
/**
 * Файл: index.php
 * УЛУЧШЕННАЯ ВЕРСИЯ v2.0
 * 
 * Изменения:
 * ✅ Защита от Path Traversal (LFI) атак
 * ✅ Валидация параметров страницы
 * ✅ CSRF токен для форм
 * ✅ Правильная обработка AJAX запросов
 * ✅ Логирование подозрительной активности
 */

if (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] !== 'on') {
    header('Location: https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
    exit;
}

require_once 'include_config/config.php';
require_once 'include_config/db_connect.php';
require_once 'include_config/header.php';

// ============================================
// БЕЛЫЙ СПИСОК ДОПУСТИМЫХ СТРАНИЦ
// ============================================

$allowed_pages = [
    'home',
    'albums',
    'about',
    'news',
    'gallery',
    'contact',
    'chat',
    'terms'
];

// ============================================
// ПОЛУЧЕНИЕ И ВАЛИДАЦИЯ ПАРАМЕТРА СТРАНИЦЫ
// ============================================

$page = $_GET['p'] ?? 'home';
$param = $_GET['id'] ?? null;

// Санитизация: убираем опасные символы
$page = preg_replace('/[^a-z0-9_-]/i', '', $page);

// Проверяем наличие в белом списке
if (!in_array($page, $allowed_pages, true)) {
    write_log("Попытка доступа к недопустимой странице: $page", 'warning');
    $page = '404'; // Загружаем страницу 404
}

$pagePath = 'pages/' . $page . '.php';

// ============================================
// ДОПОЛНИТЕЛЬНАЯ ПРОВЕРКА ПУТИ
// ============================================

// Убедимся, что путь не содержит ../ или абсолютные пути
if (
    strpos($pagePath, '..') !== false ||
    strpos($pagePath, '/') === 0 ||
    !file_exists($pagePath)
) {
    write_log("Подозрительный запрос к пути: $pagePath", 'error');
    http_response_code(404);
    $pagePath = 'pages/404.php';
}

// ============================================
// ОПРЕДЕЛЕНИЕ ТИПА ЗАПРОСА
// ============================================

$isAjaxRequest = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
                 strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';

// ============================================
// ОБРАБОТКА AJAX ЗАПРОСОВ
// ============================================

if ($isAjaxRequest) {
    header('Content-Type: application/html; charset=utf-8');
    
    if (file_exists($pagePath)) {
        require_once $pagePath;
    } else {
        http_response_code(404);
        echo '<div class="error-container"><h2>404</h2><p>Страница не найдена</p></div>';
        write_log("AJAX запрос к несуществующей странице: $pagePath", 'warning');
    }
    exit;
}

// ============================================
// ОБРАБОТКА ОБЫЧНЫХ ЗАПРОСОВ (с header/footer)
// ============================================

// Генерируем CSRF токен если его нет
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

?>

<main id="content-container" class="main-content">
    <?php 
    if (file_exists($pagePath)) {
        require_once $pagePath;
    } else {
        http_response_code(404);
        require_once 'pages/404.php';
        write_log("Запрос к несуществующему файлу: $pagePath", 'error');
    }
    ?>
</main>

<?php 
require_once 'include_config/footer.php';
?>