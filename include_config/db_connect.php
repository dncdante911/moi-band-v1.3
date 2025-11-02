<?php
/**
 * Файл: include_config/db_connect.php
 * УЛУЧШЕННАЯ ВЕРСИЯ v2.0
 * 
 * Изменения:
 * ✅ Использует переменные окружения вместо жестких паролей
 * ✅ Безопасная обработка ошибок подключения
 * ✅ Логирование ошибок БД
 * ✅ Поддержка APIResponse для JSON ответов
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/APIResponse.php';

// ============================================
// НАСТРОЙКИ ПОДКЛЮЧЕНИЯ К БД
// ============================================

$db_config = [
    'host' => getenv('DB_HOST') ?: '127.0.0.1',
    'port' => getenv('DB_PORT') ?: 3306,
    'name' => getenv('DB_NAME') ?: 'moi-band',
    'user' => getenv('DB_USER') ?: 'moi-band',
    'pass' => getenv('DB_PASS') ?: '',
    'charset' => getenv('DB_CHARSET') ?: 'utf8mb4',
];

// Проверяем, что пароль не содержит значение по умолчанию из примера
if ($db_config['pass'] === '' || strpos($db_config['pass'], 'ИЗМЕНИТЕ') !== false) {
    die('❌ КРИТИЧЕСКАЯ ОШИБКА: Пароль БД не установлен или содержит значение по умолчанию. ' .
        'Проверьте файл .env и установите безопасный пароль.');
}

// ============================================
// СОЗДАНИЕ DSN
// ============================================

$dsn = "mysql:host={$db_config['host']};port={$db_config['port']};dbname={$db_config['name']};charset={$db_config['charset']}";

// ============================================
// ОПЦИИ PDO
// ============================================

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES {$db_config['charset']}",
];

// ============================================
// ПОДКЛЮЧЕНИЕ К БД
// ============================================

try {
    $pdo = new PDO(
        $dsn,
        $db_config['user'],
        $db_config['pass'],
        $options
    );
    
    // Проверка подключения
    $pdo->query('SELECT 1');
    
    write_log('Успешное подключение к БД', 'info');
    
} catch (\PDOException $e) {
    
    // Логируем ошибку
    write_log('Ошибка подключения к БД: ' . $e->getMessage(), 'error');
    
    // Определяем тип запроса (API или обычный)
    $is_api_request = strpos($_SERVER['REQUEST_URI'] ?? '', '/api/') !== false;
    
    http_response_code(500);
    
    if ($is_api_request) {
        // ========== JSON ОТВЕТ ДЛЯ API ==========
        $message = 'Ошибка подключения к базе данных';
        $details = null;
        
        if (DEBUG_MODE) {
            $details = $e->getMessage();
        }
        
        APIResponse::error($message, 500, $details);
        exit;
        
    } else {
        // ========== HTML ОТВЕТ ДЛЯ САЙТА ==========
        echo '<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>❌ Ошибка подключения к БД</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
            color: #e0e0e0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            background: #222;
            border: 1px solid #444;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        }
        .error-header {
            text-align: center;
            margin-bottom: 30px;
        }
        .error-icon {
            font-size: 4rem;
            margin-bottom: 15px;
        }
        h1 {
            font-size: 28px;
            margin-bottom: 10px;
            color: #ff6b6b;
        }
        .error-description {
            color: #aaa;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .error-details {
            background: #1a1a1a;
            border-left: 4px solid #ff6b6b;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            font-family: "Courier New", monospace;
            font-size: 13px;
            color: #ff9999;
            word-break: break-word;
            max-height: 200px;
            overflow-y: auto;
        }
        .checklist {
            background: rgba(65, 105, 225, 0.1);
            border-left: 4px solid #4169e1;
            padding: 20px;
            border-radius: 4px;
            margin: 20px 0;
        }
        .checklist h3 {
            color: #4169e1;
            margin-bottom: 12px;
            font-size: 14px;
        }
        .checklist ul {
            list-style: none;
        }
        .checklist li {
            padding: 8px 0;
            border-bottom: 1px solid rgba(65, 105, 225, 0.2);
            font-size: 14px;
        }
        .checklist li:last-child {
            border-bottom: none;
        }
        .checklist code {
            background: #1a1a1a;
            padding: 2px 6px;
            border-radius: 3px;
            color: #64b5f6;
            font-family: "Courier New", monospace;
        }
        .footer-note {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #444;
            color: #777;
            font-size: 12px;
            line-height: 1.6;
        }
        .contact-admin {
            margin-top: 20px;
            padding: 15px;
            background: rgba(255, 193, 7, 0.1);
            border-left: 4px solid #ffc107;
            border-radius: 4px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="error-header">
            <div class="error-icon">⚠️</div>
            <h1>Ошибка подключения</h1>
            <p class="error-description">
                Невозможно установить соединение с базой данных.
                Пожалуйста, свяжитесь с администратором.
            </p>
        </div>
        
        <div class="error-details">
            ' . (DEBUG_MODE ? htmlspecialchars($e->getMessage(), ENT_QUOTES, 'UTF-8') : 'Детали скрыты') . '
        </div>
        
        <div class="checklist">
            <h3>🔍 Проверьте на сервере:</h3>
            <ul>
                <li>✓ MySQL сервер запущен</li>
                <li>✓ Хост: <code>' . htmlspecialchars($db_config['host'], ENT_QUOTES) . '</code></li>
                <li>✓ База: <code>' . htmlspecialchars($db_config['name'], ENT_QUOTES) . '</code></li>
                <li>✓ Пользователь: <code>' . htmlspecialchars($db_config['user'], ENT_QUOTES) . '</code></li>
                <li>✓ Пароль установлен в .env</li>
                <li>✓ Брандмауэр не блокирует порт 3306</li>
            </ul>
        </div>
        
        <div class="contact-admin">
            📧 Если это production, свяжитесь с администратором сайта:
            <strong>' . htmlspecialchars(SITE_EMAIL, ENT_QUOTES) . '</strong>
        </div>
        
        <div class="footer-note">
            <strong>Подсказка для администратора:</strong> 
            Убедитесь, что переменные окружения в файле <code>.env</code> установлены правильно.
            На production сервере режим DEBUG должен быть отключен (APP_DEBUG=false).
        </div>
    </div>
</body>
</html>';
        exit;
    }
}

?>