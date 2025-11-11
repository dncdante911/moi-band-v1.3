-- Миграция: Добавление системы лайков/дизлайков
-- Дата: 2025-11-11

-- 1. Добавляем поля likes и dislikes в таблицу Track
ALTER TABLE `Track`
ADD COLUMN `likes` INT DEFAULT 0 COMMENT 'Количество лайков',
ADD COLUMN `dislikes` INT DEFAULT 0 COMMENT 'Количество дизлайков';

-- 2. Создаем таблицу для реакций пользователей
CREATE TABLE IF NOT EXISTS `TrackReactions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `track_id` INT NOT NULL,
  `user_id` INT NULL COMMENT 'ID зарегистрированного пользователя',
  `session_id` VARCHAR(128) NULL COMMENT 'Session ID для анонимных пользователей',
  `reaction_type` ENUM('like', 'dislike') NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- Индексы для оптимизации
  INDEX `idx_track` (`track_id`),
  INDEX `idx_user` (`user_id`),
  INDEX `idx_session` (`session_id`),

  -- Уникальный индекс: один пользователь может поставить только одну реакцию на трек
  UNIQUE KEY `unique_user_reaction` (`track_id`, `user_id`),
  UNIQUE KEY `unique_session_reaction` (`track_id`, `session_id`),

  -- Внешние ключи
  FOREIGN KEY (`track_id`) REFERENCES `Track`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Таблица для хранения реакций пользователей на треки (лайки/дизлайки)';
