<?php
/**
 * Файл: admin/generate_password_hash.php
 * Утилита для генерации хеша пароля
 * 
 * ИСПОЛЬЗОВАНИЕ:
 * 1. Откройте этот файл в браузере
 * 2. Введите желаемый пароль
 * 3. Скопируйте сгенерированный хеш
 * 4. Вставьте его в login.php
 * 5. УДАЛИТЕ этот файл с сервера!
 */

$generated_hash = '';
$input_password = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input_password = $_POST['password'] ?? '';
    if (!empty($input_password)) {
        $generated_hash = password_hash($input_password, PASSWORD_DEFAULT);
    }
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Генератор хеша пароля</title>
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
            padding: 40px 20px;
            min-height: 100vh;
        }
        
        .container {
            max-width: 700px;
            margin: 0 auto;
            background: rgba(26, 26, 26, 0.95);
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
            border: 1px solid rgba(255, 215, 0, 0.1);
        }
        
        h1 {
            color: #FFD700;
            margin-bottom: 10px;
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
        }
        
        .warning {
            background: linear-gradient(135deg, #c53030 0%, #9b2c2c 100%);
            color: #fff;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            font-size: 0.95rem;
            line-height: 1.6;
        }
        
        .warning strong {
            display: block;
            margin-bottom: 10px;
            font-size: 1.1rem;
        }
        
        .form-group {
            margin: 25px 0;
        }
        
        label {
            display: block;
            margin-bottom: 10px;
            color: #FFD700;
            font-weight: 600;
        }
        
        input[type="text"],
        input[type="password"] {
            width: 100%;
            padding: 15px;
            background: #0a0a0a;
            border: 2px solid #333;
            border-radius: 8px;
            color: #e0e0e0;
            font-size: 1rem;
            font-family: 'Courier New', monospace;
        }
        
        input:focus {
            outline: none;
            border-color: #FFD700;
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.2);
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
        }
        
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }
        
        .result {
            margin-top: 30px;
            padding: 20px;
            background: rgba(56, 161, 105, 0.1);
            border-left: 4px solid #38a169;
            border-radius: 8px;
        }
        
        .result h3 {
            color: #38a169;
            margin-bottom: 15px;
        }
        
        .hash-display {
            background: #0a0a0a;
            padding: 15px;
            border-radius: 6px;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            word-break: break-all;
            color: #64b5f6;
            border: 1px solid #333;
            margin: 10px 0;
        }
        
        .copy-button {
            background: #38a169;
            margin-top: 10px;
        }
        
        .copy-button:hover {
            background: #2f855a;
        }
        
        .instructions {
            margin-top: 30px;
            padding: 20px;
            background: rgba(255, 193, 7, 0.1);
            border-left: 4px solid #ffc107;
            border-radius: 8px;
            font-size: 0.9rem;
            line-height: 1.8;
        }
        
        .instructions h3 {
            color: #ffc107;
            margin-bottom: 15px;
        }
        
        .instructions ol {
            margin-left: 20px;
        }
        
        .instructions li {
            margin: 10px 0;
        }
        
        .instructions code {
            background: #0a0a0a;
            padding: 2px 8px;
            border-radius: 4px;
            color: #64b5f6;
            font-family: 'Courier New', monospace;
        }
        
        .delete-warning {
            margin-top: 30px;
            padding: 20px;
            background: rgba(197, 48, 48, 0.2);
            border: 2px solid #c53030;
            border-radius: 8px;
            text-align: center;
            font-size: 1.1rem;
            color: #ff6b6b;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔐 Генератор хеша пароля</h1>
        <p style="color: #999; margin-bottom: 20px;">Утилита для создания безопасного хеша пароля админ-панели</p>
        
        <div class="warning">
            <strong>⚠️ ВАЖНО!</strong>
            После использования ОБЯЗАТЕЛЬНО удалите этот файл с сервера!<br>
            Оставлять его в публичном доступе - серьезная угроза безопасности.
        </div>
        
        <form method="POST">
            <div class="form-group">
                <label for="password">Введите желаемый пароль:</label>
                <input 
                    type="text" 
                    id="password" 
                    name="password" 
                    placeholder="Ваш новый пароль"
                    required
                    value="<?= htmlspecialchars($input_password, ENT_QUOTES, 'UTF-8') ?>"
                >
                <small style="color: #999; display: block; margin-top: 8px;">
                    Рекомендуется использовать: минимум 12 символов, цифры, буквы разного регистра, спецсимволы
                </small>
            </div>
            
            <button type="submit">🔨 Сгенерировать хеш</button>
        </form>
        
        <?php if ($generated_hash): ?>
            <div class="result">
                <h3>✅ Хеш успешно сгенерирован!</h3>
                
                <p><strong>Ваш пароль:</strong></p>
                <div class="hash-display"><?= htmlspecialchars($input_password, ENT_QUOTES, 'UTF-8') ?></div>
                
                <p style="margin-top: 20px;"><strong>Хеш для login.php:</strong></p>
                <div class="hash-display" id="hashValue"><?= htmlspecialchars($generated_hash, ENT_QUOTES, 'UTF-8') ?></div>
                
                <button class="copy-button" onclick="copyHash()">📋 Скопировать хеш</button>
            </div>
        <?php endif; ?>
        
        <div class="instructions">
            <h3>📝 Инструкция по использованию:</h3>
            <ol>
                <li>Введите желаемый пароль в поле выше</li>
                <li>Нажмите "Сгенерировать хеш"</li>
                <li>Скопируйте полученный хеш</li>
                <li>Откройте файл <code>/admin/login.php</code></li>
                <li>Найдите строку: <code>$admin_password_hash = '...';</code></li>
                <li>Замените старый хеш на новый</li>
                <li>Сохраните файл <code>login.php</code></li>
                <li><strong>УДАЛИТЕ этот файл</strong> (<code>generate_password_hash.php</code>) с сервера!</li>
            </ol>
        </div>
        
        <div class="delete-warning">
            🚨 НЕ ЗАБУДЬТЕ УДАЛИТЬ ЭТОТ ФАЙЛ ПОСЛЕ ИСПОЛЬЗОВАНИЯ! 🚨
        </div>
    </div>
    
    <script>
        function copyHash() {
            const hashValue = document.getElementById('hashValue').textContent;
            
            // Создаем временный элемент для копирования
            const textarea = document.createElement('textarea');
            textarea.value = hashValue;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
                document.execCommand('copy');
                alert('✅ Хеш скопирован в буфер обмена!');
            } catch (err) {
                alert('❌ Ошибка копирования. Скопируйте хеш вручную.');
            }
            
            document.body.removeChild(textarea);
        }
    </script>
</body>
</html>