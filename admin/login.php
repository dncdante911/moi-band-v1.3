<?php
/**
 * Файл: admin/login.php
 * УЛУЧШЕННАЯ ВЕРСИЯ v2.0
 * Страница входа в админ-панель с дополнительными функциями
 */

session_start();

// Если уже авторизован, перенаправляем
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    $redirect_to = $_SESSION['redirect_after_login'] ?? '/admin/index.php';
    unset($_SESSION['redirect_after_login']);
    header('Location: ' . $redirect_to);
    exit;
}

$error = $_SESSION['login_error'] ?? '';
unset($_SESSION['login_error']);

// Счетчик неудачных попыток для защиты от брутфорса
if (!isset($_SESSION['login_attempts'])) {
    $_SESSION['login_attempts'] = 0;
    $_SESSION['last_attempt_time'] = time();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Проверяем количество попыток
    if ($_SESSION['login_attempts'] >= 5) {
        $time_diff = time() - $_SESSION['last_attempt_time'];
        if ($time_diff < 300) { // 5 минут
            $wait_time = ceil((300 - $time_diff) / 60);
            $error = "Слишком много неудачных попыток. Подождите {$wait_time} минут.";
        } else {
            $_SESSION['login_attempts'] = 0;
        }
    }
    
    if (empty($error)) {
        $username = trim($_POST['username'] ?? '');
        $password = $_POST['password'] ?? '';
        
        // ⚠️ ВАЖНО: Замените эти данные на свои!
        $admin_username = 'admin';
        // Для генерации хеша используйте generate_password_hash.php
        $admin_password_hash = '$2y$10$WcJS2KvcK8UsMjGBO/q9nu0nEv2cKkF8MKs1ZhBW0N8qGsW1ZPdE2';
        
        if ($username === $admin_username && password_verify($password, $admin_password_hash)) {
            // Успешная авторизация
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_username'] = $username;
            $_SESSION['admin_login_time'] = time();
            $_SESSION['admin_last_activity'] = time();
            $_SESSION['login_attempts'] = 0;
            
            // Генерируем CSRF токен
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
            
            // Логируем вход
            if (function_exists('write_log')) {
                write_log("Админ {$username} вошел в систему", 'info');
            }
            
            // Перенаправляем
            $redirect_to = $_SESSION['redirect_after_login'] ?? '/admin/index.php';
            unset($_SESSION['redirect_after_login']);
            header('Location: ' . $redirect_to);
            exit;
        } else {
            $error = 'Неверный логин или пароль';
            $_SESSION['login_attempts']++;
            $_SESSION['last_attempt_time'] = time();
            
            // Задержка для защиты от брутфорса
            sleep(2);
        }
    }
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Вход в админ-панель - Master of Illusion</title>
    <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
            color: #e0e0e0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
            overflow: hidden;
            position: relative;
        }
        
        /* Анимированный фон */
        body::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,215,0,0.05) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
        }
        
        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .login-container {
            width: 100%;
            max-width: 420px;
            position: relative;
            z-index: 1;
        }
        
        .login-box {
            background: rgba(26, 26, 26, 0.95);
            padding: 50px 40px;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7),
                        0 0 100px rgba(255, 215, 0, 0.1);
            border: 1px solid rgba(255, 215, 0, 0.2);
            backdrop-filter: blur(10px);
        }
        
        .logo {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .logo h1 {
            color: #FFD700;
            font-size: 2rem;
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.5),
                         0 0 40px rgba(255, 215, 0, 0.3);
            margin-bottom: 10px;
            animation: glow 2s ease-in-out infinite;
        }
        
        @keyframes glow {
            0%, 100% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
            50% { text-shadow: 0 0 30px rgba(255, 215, 0, 0.8); }
        }
        
        .logo p {
            color: #999;
            font-size: 0.9rem;
        }
        
        .error {
            background: linear-gradient(135deg, #c53030 0%, #9b2c2c 100%);
            color: #fff;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 25px;
            text-align: center;
            font-size: 0.95rem;
            animation: shake 0.5s;
            box-shadow: 0 5px 15px rgba(197, 48, 48, 0.3);
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        
        .form-group {
            margin-bottom: 25px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 10px;
            color: #FFD700;
            font-weight: 600;
            font-size: 0.95rem;
        }
        
        .input-wrapper {
            position: relative;
        }
        
        .input-icon {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #666;
            font-size: 1.2rem;
        }
        
        input {
            width: 100%;
            padding: 15px 15px 15px 45px;
            background: #0a0a0a;
            border: 2px solid #333;
            border-radius: 8px;
            color: #e0e0e0;
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        
        input:focus {
            outline: none;
            border-color: #FFD700;
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
        }
        
        input::placeholder {
            color: #666;
        }
        
        .button-group {
            margin-top: 30px;
        }
        
        button {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #fff;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            position: relative;
            overflow: hidden;
        }
        
        button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }
        
        button:hover::before {
            width: 300px;
            height: 300px;
        }
        
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }
        
        button:active {
            transform: translateY(0);
        }
        
        .back-link {
            display: block;
            text-align: center;
            margin-top: 20px;
            color: #999;
            text-decoration: none;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }
        
        .back-link:hover {
            color: #FFD700;
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }
        
        .security-note {
            margin-top: 30px;
            padding: 15px;
            background: rgba(255, 193, 7, 0.1);
            border-left: 4px solid #ffc107;
            border-radius: 4px;
            font-size: 0.85rem;
            color: #ffc107;
            line-height: 1.6;
        }
        
        .login-attempts {
            text-align: center;
            margin-top: 15px;
            font-size: 0.85rem;
            color: #999;
        }
        
        @media (max-width: 480px) {
            .login-box {
                padding: 40px 30px;
            }
            
            .logo h1 {
                font-size: 1.6rem;
            }
        }
        
        /* Анимация появления формы */
        .login-box {
            animation: fadeInUp 0.6s ease;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-box">
            <div class="logo">
                <h1>🎸 MASTER OF ILLUSION</h1>
                <p>Админ-панель</p>
            </div>
            
            <?php if ($error): ?>
                <div class="error">
                    ❌ <?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?>
                </div>
            <?php endif; ?>
            
            <form method="POST" autocomplete="off">
                <div class="form-group">
                    <label for="username">👤 Логин</label>
                    <div class="input-wrapper">
                        <span class="input-icon">👤</span>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="Введите логин"
                            required 
                            autocomplete="username"
                            autofocus
                            <?= ($_SESSION['login_attempts'] >= 5 && (time() - $_SESSION['last_attempt_time']) < 300) ? 'disabled' : '' ?>
                        >
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="password">🔐 Пароль</label>
                    <div class="input-wrapper">
                        <span class="input-icon">🔐</span>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Введите пароль"
                            required 
                            autocomplete="current-password"
                            <?= ($_SESSION['login_attempts'] >= 5 && (time() - $_SESSION['last_attempt_time']) < 300) ? 'disabled' : '' ?>
                        >
                    </div>
                </div>
                
                <div class="button-group">
                    <button type="submit" <?= ($_SESSION['login_attempts'] >= 5 && (time() - $_SESSION['last_attempt_time']) < 300) ? 'disabled' : '' ?>>
                        🔓 Войти
                    </button>
                </div>
            </form>
            
            <?php if ($_SESSION['login_attempts'] > 0): ?>
                <div class="login-attempts">
                    Неудачных попыток: <?= $_SESSION['login_attempts'] ?>/5
                </div>
            <?php endif; ?>
            
            <a href="/" class="back-link">
                ← Вернуться на сайт
            </a>
            
            <div class="security-note">
                ⚠️ <strong>Внимание:</strong> После 5 неудачных попыток вход будет заблокирован на 5 минут.
                После первого входа обязательно смените пароль по умолчанию!
            </div>
        </div>
    </div>
    
    <script>
        // Предотвращение автозаполнения (дополнительная защита)
        window.addEventListener('load', function() {
            setTimeout(function() {
                const inputs = document.querySelectorAll('input');
                inputs.forEach(input => {
                    input.setAttribute('autocomplete', 'off');
                });
            }, 100);
        });
        
        // Анимация при ошибке
        const errorDiv = document.querySelector('.error');
        if (errorDiv) {
            setTimeout(() => {
                errorDiv.style.animation = 'none';
            }, 500);
        }
    </script>
</body>
</html>