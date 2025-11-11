-- ============================================
-- МИГРАЦИЯ БД: Лайки, дизлайки и плейлисты
-- Дата: 2025-11-11
-- ============================================

-- Добавляем поля likes и dislikes в таблицу Track
ALTER TABLE `Track`
ADD COLUMN `likes` INT NOT NULL DEFAULT 0 COMMENT 'Количество лайков',
ADD COLUMN `dislikes` INT NOT NULL DEFAULT 0 COMMENT 'Количество дизлайков';

-- Создаем таблицу для плейлистов
CREATE TABLE IF NOT EXISTS `Playlists` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT DEFAULT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `is_public` TINYINT(1) DEFAULT 0,
  `cover_image` VARCHAR(255) DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  CONSTRAINT `Playlists_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Создаем таблицу связи треков и плейлистов (многие ко многим)
CREATE TABLE IF NOT EXISTS `PlaylistTracks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `playlist_id` INT NOT NULL,
  `track_id` INT NOT NULL,
  `position` INT NOT NULL DEFAULT 0 COMMENT 'Позиция трека в плейлисте',
  `added_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_playlist_track` (`playlist_id`, `track_id`),
  KEY `idx_playlist_id` (`playlist_id`),
  KEY `idx_track_id` (`track_id`),
  CONSTRAINT `PlaylistTracks_playlist_id_fkey` FOREIGN KEY (`playlist_id`) REFERENCES `Playlists` (`id`) ON DELETE CASCADE,
  CONSTRAINT `PlaylistTracks_track_id_fkey` FOREIGN KEY (`track_id`) REFERENCES `Track` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Создаем таблицу для отслеживания лайков/дизлайков пользователей
-- (чтобы пользователь не мог лайкнуть несколько раз)
CREATE TABLE IF NOT EXISTS `TrackReactions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `track_id` INT NOT NULL,
  `user_id` INT DEFAULT NULL,
  `session_id` VARCHAR(255) DEFAULT NULL COMMENT 'Для анонимных пользователей',
  `reaction_type` ENUM('like', 'dislike') NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_track_reaction` (`track_id`, `user_id`),
  UNIQUE KEY `unique_session_track_reaction` (`track_id`, `session_id`),
  KEY `idx_track_id` (`track_id`),
  KEY `idx_user_id` (`user_id`),
  CONSTRAINT `TrackReactions_track_id_fkey` FOREIGN KEY (`track_id`) REFERENCES `Track` (`id`) ON DELETE CASCADE,
  CONSTRAINT `TrackReactions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Создаем индексы для оптимизации запросов
CREATE INDEX `idx_track_likes` ON `Track` (`likes` DESC);
CREATE INDEX `idx_track_views` ON `Track` (`views` DESC);
CREATE INDEX `idx_playlist_public` ON `Playlists` (`is_public`, `created_at` DESC);

-- Все готово!
