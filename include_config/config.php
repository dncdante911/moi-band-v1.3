<?php
/**
 * Файл: include_config/config.php
 * УЛУЧШЕННАЯ ВЕРСИЯ v2.0
 * 
 * Изменения:
 * ✅ Использует переменные окружения из .env файла
 * ✅ Безопасно скрывает учетные данные
 * ✅ Поддерживает production/development режимы
 * ✅ Добавлена правильная обработка ошибок
 */

// ============================================
// ЗАГРУЗКА ПЕРЕМЕННЫХ ОКРУЖЕНИЯ
// ============================================

// Определяем корневую директорию проекта
define('PROJECT_ROOT', dirname(__DIR__));

header("Cache-Control: public, max-age=31536000"); // Для статики
header("Cache-Control: no-cache, must-revalidate"); // Для динамики

// Функция для загрузки .env файла (если Composer не используется)
if (!function_exists('load_env')) {
    function load_env($path) {
        if (!file_exists($path)) {
            return false;
        }
        
        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            // Пропускаем комментарии
            if (strpos(trim($line), '#') === 0) {
                continue;
            }
            
            // Парсим KEY=VALUE
            if (strpos($line, '=') !== false) {
                list($key, $value) = explode('=', $line, 2);
                $key = trim($key);
                $value = trim($value);
                
                // Убираем кавычки если есть
                $value = preg_replace('/^["\']+|["\']+$/', '', $value);
                
                // Устанавливаем переменную окружения
                putenv("$key=$value");
                $_ENV[$key] = $value;
            }
        }
        return true;
    }
}

// Загружаем .env файл
$env_file = PROJECT_ROOT . '/.env';
if (!file_exists($env_file)) {
    // Если .env нет, используем .env.example как fallback (только для локальной разработки)
    $env_file = PROJECT_ROOT . '/.env.example';
    
    if (!file_exists($env_file)) {
        die('❌ КРИТИЧЕСКАЯ ОШИБКА: Не найден файл .env или .env.example. ' .
            'Скопируйте .env.example в .env и заполните значения.');
    }
}

load_env($env_file);

// ============================================
// ОПРЕДЕЛЕНИЕ РЕЖИМА РАБОТЫ
// ============================================

$app_env = getenv('APP_ENV') ?: 'production';
$app_debug = getenv('APP_DEBUG') ?: 'false';

define('APP_ENV', $app_env);
define('DEBUG_MODE', in_array($app_debug, ['true', '1', 'yes', 'on'], true));

// На production всегда скрываем ошибки
if (APP_ENV === 'production') {
    ini_set('display_errors', 0);
    ini_set('log_errors', 1);
    ini_set('error_log', getenv('LOG_PATH') . 'php_errors.log');
} else {
    ini_set('display_errors', DEBUG_MODE ? 1 : 0);
    ini_set('log_errors', 1);
}

error_reporting(E_ALL);

// ============================================
// КОНСТАНТЫ САЙТА
// ============================================

define('SITE_NAME', getenv('SITE_NAME') ?: 'Master of illusion');
define('SITE_URL', getenv('SITE_URL') ?: 'https://lovix.top');
define('SITE_EMAIL', getenv('SITE_EMAIL') ?: 'contact@lovix.top');

// ============================================
// API КЛЮЧИ
// ============================================

define('FOSSBILLING_API_URL', getenv('FOSSBILLING_API_URL') ?: '');
define('FOSSBILLING_API_TOKEN', getenv('FOSSBILLING_API_TOKEN') ?: '');

// ============================================
// БЕЗОПАСНОСТЬ - СЕССИИ
// ============================================

define('SESSION_LIFETIME', (int)(getenv('SESSION_LIFETIME') ?: 3600));
define('SESSION_NAME', getenv('SESSION_NAME') ?: 'moi_session');
define('MAX_UPLOAD_SIZE', (int)(getenv('MAX_UPLOAD_SIZE') ?: 104857600)); // 100MB

// ============================================
// ПУТИ К ФАЙЛАМ
// ============================================

define('BASE_PATH', PROJECT_ROOT);
define('UPLOAD_PATH', BASE_PATH . '/public/uploads');
define('LOGS_PATH', getenv('LOG_PATH') ?: BASE_PATH . '/logs');

// Проверяем и создаем директории логов если их нет
if (!is_dir(LOGS_PATH)) {
    @mkdir(LOGS_PATH, 0755, true);
}

// ============================================
// ИНИЦИАЛИЗАЦИЯ СЕССИИ
// ============================================

if (!defined('SKIP_SESSION_START')) {
    // Убедимся, что сессия еще не начата
    if (session_status() === PHP_SESSION_NONE) {
        session_name(SESSION_NAME);
        
        session_set_cookie_params([
            'lifetime' => SESSION_LIFETIME,
            'path' => '/',
            'domain' => '',
            'secure' => (strpos(SITE_URL, 'https://') === 0), // Только для HTTPS
            'httponly' => true, // Защита от XSS
            'samesite' => 'Strict' // Защита от CSRF
        ]);
        
        session_start();
    }
    
    // Регенерируем ID сессии для безопасности (каждый час)
    if (!isset($_SESSION['last_regenerate'])) {
        $_SESSION['last_regenerate'] = time();
        session_regenerate_id(true);
    } elseif (time() - $_SESSION['last_regenerate'] > 3600) {
        $_SESSION['last_regenerate'] = time();
        session_regenerate_id(true);
    }
}

// ============================================
// ЛОГИРОВАНИЕ
// ============================================

function write_log($message, $level = 'info') {
    $log_level = getenv('LOG_LEVEL') ?: 'error';
    
    $levels = ['debug' => 0, 'info' => 1, 'warning' => 2, 'error' => 3];
    
    if ($levels[$level] >= $levels[$log_level]) {
        $log_file = LOGS_PATH . '/' . date('Y-m-d') . '.log';
        $timestamp = date('Y-m-d H:i:s');
        $log_entry = "[$timestamp] [$level] $message\n";
        
        error_log($log_entry, 3, $log_file);
    }
}

// ============================================
// ОБРАБОТЧИК ОШИБОК
// ============================================

set_error_handler(function($errno, $errstr, $errfile, $errline) {
    $error_types = [
        E_ERROR => 'Fatal Error',
        E_WARNING => 'Warning',
        E_PARSE => 'Parse Error',
        E_NOTICE => 'Notice',
        E_CORE_ERROR => 'Core Error',
        E_CORE_WARNING => 'Core Warning',
        E_COMPILE_ERROR => 'Compile Error',
        E_COMPILE_WARNING => 'Compile Warning',
        E_USER_ERROR => 'User Error',
        E_USER_WARNING => 'User Warning',
        E_USER_NOTICE => 'User Notice',
    ];
    
    $type = $error_types[$errno] ?? 'Unknown';
    write_log("$type: $errstr in $errfile:$errline", 'error');
    
    if (DEBUG_MODE) {
        echo "<div style='background: #f8d7da; padding: 10px; margin: 10px; border-radius: 4px;'>";
        echo "<strong>$type:</strong> $errstr<br>";
        echo "<small>$errfile:$errline</small>";
        echo "</div>";
    }
    
    return true;
});

// ============================================
// КОНСТАНТЫ ЗАГРУЗКИ ФАЙЛОВ
// ============================================

define('ALLOWED_IMAGE_TYPES', ['image/jpeg', 'image/png', 'image/webp']);
define('ALLOWED_AUDIO_TYPES', ['audio/mpeg', 'audio/wav', 'audio/flac']);
define('ALLOWED_VIDEO_TYPES', ['video/mp4', 'video/webm']);

define('MAX_IMAGE_SIZE', 5 * 1024 * 1024); // 5MB
define('MAX_AUDIO_SIZE', 200 * 1024 * 1024); // 200MB
define('MAX_VIDEO_SIZE', 500 * 1024 * 1024); // 500MB

?>