<?php
/**
 * Файл: admin/auth_check.php
 * Проверка авторизации для защиты админ-панели
 * 
 * ИСПОЛЬЗОВАНИЕ:
 * Подключайте этот файл в начале каждой админской страницы:
 * require_once __DIR__ . '/auth_check.php';
 */

// Запускаем сессию если еще не запущена
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Проверяем авторизацию
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    // Сохраняем URL, на который пытался зайти пользователь
    $_SESSION['redirect_after_login'] = $_SERVER['REQUEST_URI'] ?? '/admin/index.php';
    
    // Перенаправляем на страницу входа
    header('Location: /admin/login.php');
    exit;
}

// Проверяем таймаут сессии (30 минут)
$session_timeout = 1800; // 30 минут в секундах

if (isset($_SESSION['admin_last_activity'])) {
    $inactive_time = time() - $_SESSION['admin_last_activity'];
    
    if ($inactive_time > $session_timeout) {
        // Сессия истекла
        session_unset();
        session_destroy();
        session_start();
        
        $_SESSION['login_error'] = 'Сессия истекла. Пожалуйста, войдите снова.';
        header('Location: /admin/login.php');
        exit;
    }
}

// Обновляем время последней активности
$_SESSION['admin_last_activity'] = time();

// Генерируем CSRF токен если его нет
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

/**
 * Функция для проверки CSRF токена
 * 
 * @param string $token Токен из формы
 * @return bool
 */
function verify_csrf_token($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Функция выхода из системы
 */
function logout_admin() {
    session_unset();
    session_destroy();
    header('Location: /admin/login.php');
    exit;
}

// Обработка выхода если передан параметр
if (isset($_GET['logout'])) {
    logout_admin();
}