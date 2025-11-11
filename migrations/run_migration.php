<?php
/**
 * Скрипт для выполнения миграции БД
 */

// Прямое подключение к БД для миграции (без проверки пароля)
$db_host = '127.0.0.1';
$db_port = 3306;
$db_name = 'moi-band';
$db_user = 'root';
$db_pass = '';
$db_charset = 'utf8mb4';

$dsn = "mysql:host={$db_host};port={$db_port};dbname={$db_name};charset={$db_charset}";

try {
    $pdo = new PDO($dsn, $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    echo "✓ Подключение к БД установлено\n\n";
} catch (PDOException $e) {
    die("ОШИБКА: Не удалось подключиться к БД: " . $e->getMessage() . "\n");
}

try {
    echo "Начало миграции...\n\n";

    // 1. Проверяем, существуют ли уже поля likes и dislikes
    $stmt = $pdo->query("SHOW COLUMNS FROM Track LIKE 'likes'");
    if ($stmt->rowCount() == 0) {
        echo "Добавление полей likes и dislikes в таблицу Track...\n";
        $pdo->exec("ALTER TABLE `Track`
                    ADD COLUMN `likes` INT DEFAULT 0 COMMENT 'Количество лайков',
                    ADD COLUMN `dislikes` INT DEFAULT 0 COMMENT 'Количество дизлайков'");
        echo "✓ Поля добавлены\n\n";
    } else {
        echo "✓ Поля likes и dislikes уже существуют\n\n";
    }

    // 2. Проверяем, существует ли таблица TrackReactions
    $stmt = $pdo->query("SHOW TABLES LIKE 'TrackReactions'");
    if ($stmt->rowCount() == 0) {
        echo "Создание таблицы TrackReactions...\n";
        $pdo->exec("CREATE TABLE `TrackReactions` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `track_id` INT NOT NULL,
          `user_id` INT NULL COMMENT 'ID зарегистрированного пользователя',
          `session_id` VARCHAR(128) NULL COMMENT 'Session ID для анонимных пользователей',
          `reaction_type` ENUM('like', 'dislike') NOT NULL,
          `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
          `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

          INDEX `idx_track` (`track_id`),
          INDEX `idx_user` (`user_id`),
          INDEX `idx_session` (`session_id`),

          UNIQUE KEY `unique_user_reaction` (`track_id`, `user_id`),
          UNIQUE KEY `unique_session_reaction` (`track_id`, `session_id`),

          FOREIGN KEY (`track_id`) REFERENCES `Track`(`id`) ON DELETE CASCADE,
          FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        COMMENT='Таблица для хранения реакций пользователей на треки (лайки/дизлайки)'");
        echo "✓ Таблица TrackReactions создана\n\n";
    } else {
        echo "✓ Таблица TrackReactions уже существует\n\n";
    }

    echo "Миграция успешно завершена!\n";

} catch (PDOException $e) {
    echo "ОШИБКА: " . $e->getMessage() . "\n";
    exit(1);
}
