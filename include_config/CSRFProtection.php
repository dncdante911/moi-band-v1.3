<?php
/**
 * Файл: include_config/CSRFProtection.php
 * Защита от CSRF (Cross-Site Request Forgery) атак
 */

class CSRFProtection {
    
    /**
     * Генерирует CSRF токен и сохраняет в сессию
     */
    public static function generateToken() {
        if (!isset($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }
    
    /**
     * Возвращает HTML поле с CSRF токеном для вставки в формы
     */
    public static function getTokenField() {
        $token = self::generateToken();
        return '<input type="hidden" name="csrf_token" value="' . htmlspecialchars($token, ENT_QUOTES, 'UTF-8') . '">';
    }
    
    /**
     * Проверяет CSRF токен из POST запроса
     * Должна быть вызвана при обработке POST форм
     */
    public static function validateToken() {
        // Не проверяем GET запросы
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            return true;
        }
        
        // Получаем токен из формы
        $token = $_POST['csrf_token'] ?? null;
        
        // Проверяем наличие токена
        if (empty($token) || !isset($_SESSION['csrf_token'])) {
            write_log('CSRF: Отсутствует токен', 'warning');
            return false;
        }
        
        // Проверяем совпадение токена (используем hash_equals для защиты от timing атак)
        if (!hash_equals($_SESSION['csrf_token'], $token)) {
            write_log('CSRF: Токен не совпадает', 'error');
            return false;
        }
        
        return true;
    }
    
    /**
     * Проверяет токен и завершает выполнение если ошибка
     */
    public static function validateTokenOrDie() {
        if (!self::validateToken()) {
            http_response_code(403);
            die('❌ Ошибка безопасности: CSRF токен недействителен');
        }
    }
}

?>