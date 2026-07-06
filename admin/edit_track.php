<?php
/**
 * Файл: admin/edit_track.php
 * ИСПРАВЛЕННАЯ ВЕРСИЯ v2.1 - С РАСЧЁТОМ ДЛИТЕЛЬНОСТИ
 * * Исправления:
 * ✅ Вычисляет и сохраняет длительность трека в БД
 * ✅ Поддерживает MP3 и WAV парсинг
 * ✅ Использует ffprobe если доступен
 * ✅ Исправлена загрузка видео
 */

require_once __DIR__ . '/auth_check.php';
require_once '../include_config/config.php';
require_once '../include_config/db_connect.php';
require_once '../include_config/file_validator.php';
require_once '../include_config/AudioDuration.php';

// Функция для сохранения загруженного файла
function saveFile($file, $subfolder) {
    if (empty($file['name']) || $file['error'] !== UPLOAD_ERR_OK) {
        return null;
    }

    $uploadDir = '../public/uploads/' . $subfolder . '/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $fileName = uniqid() . '.' . $fileExtension;
    $uploadPath = $uploadDir . $fileName;

    if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
        return '/public/uploads/' . $subfolder . '/' . $fileName;
    }
    return false;
}

// Получаем список альбомов
$stmt_albums = $pdo->query("SELECT id, title FROM Albums ORDER BY title ASC");
$albums = $stmt_albums->fetchAll();

// Проверяем ID трека
if (!isset($_GET['id']) || !filter_var($_GET['id'], FILTER_VALIDATE_INT)) {
    header('Location: index.php');
    exit;
}
$trackId = (int)$_GET['id'];

// === ОБРАБОТКА POST ЗАПРОСА ===
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title'] ?? '');
    $description = trim($_POST['description'] ?? '');
    // --- ИЗМЕНЕНИЕ ДЛЯ ИСПРАВЛЕНИЯ ОШИБКИ 'Incorrect integer value: ''' ---
    // Если $_POST['albumId'] пустая строка (''), устанавливаем null, иначе преобразуем в int.
    $albumIdInput = trim($_POST['albumId'] ?? '');
    $albumId = ($albumIdInput === '') ? null : (int)$albumIdInput;
    // --------------------------------------------------------------------
    $lyrics = trim($_POST['lyrics'] ?? '');
    $errors = [];

    // Валидация
    if (empty($title)) {
        $errors[] = 'Название не может быть пустым';
    }

    // Серверная проверка реального типа файла (расширение в accept="" на клиенте
    // ничего не гарантирует — его легко обойти прямым запросом).
    $validator = new FileValidator(MAX_UPLOAD_SIZE);

    if (empty($errors) && !empty($_FILES['cover']['name']) && $_FILES['cover']['error'] === UPLOAD_ERR_OK) {
        $check = $validator->validate($_FILES['cover'], 'image');
        if (!$check['valid']) $errors[] = 'Обложка: ' . $check['error'];
    }

    if (empty($errors) && !empty($_FILES['fullTrack']['name']) && $_FILES['fullTrack']['error'] === UPLOAD_ERR_OK) {
        $check = $validator->validate($_FILES['fullTrack'], 'audio');
        if (!$check['valid']) $errors[] = 'Аудиофайл: ' . $check['error'];
    }

    if (empty($errors) && !empty($_FILES['video']['name']) && $_FILES['video']['error'] === UPLOAD_ERR_OK) {
        $check = $validator->validate($_FILES['video'], 'video');
        if (!$check['valid']) $errors[] = 'Видео: ' . $check['error'];
    }

    if (empty($errors)) {
        try {
            // Получаем текущие данные
            $stmt = $pdo->prepare("SELECT * FROM Track WHERE id = ?");
            $stmt->execute([$trackId]);
            $currentTrack = $stmt->fetch();
            
            if (!$currentTrack) {
                $errors[] = 'Трек не найден';
            } else {
                // Обновляем файлы если загружены
                $coverPath = $currentTrack['coverImagePath'];
                if (!empty($_FILES['cover']['name'])) {
                    $newCoverPath = saveFile($_FILES['cover'], 'covers');
                    if ($newCoverPath) {
                        if ($coverPath) @unlink('..' . $coverPath);
                        $coverPath = $newCoverPath;
                    }
                }

                $fullTrackPath = $currentTrack['fullAudioPath'];
                if (!empty($_FILES['fullTrack']['name'])) {
                    $newFullTrackPath = saveFile($_FILES['fullTrack'], 'full');
                    if ($newFullTrackPath) {
                        if ($fullTrackPath) @unlink('..' . $fullTrackPath);
                        $fullTrackPath = $newFullTrackPath;
                    }
                }
                
$videoPath = $currentTrack['videoPath'];
$videoUpdated = false;

if (!empty($_FILES['video']['name'])) {
    $newVideoPath = saveFile($_FILES['video'], 'videos');
    if ($newVideoPath) {
        // Удалить старое видео
        if ($videoPath) {
            @unlink('..' . $videoPath);
        }
        $videoPath = $newVideoPath;
        $videoUpdated = true;
        error_log("✅ Видео загружено: $videoPath");
    }
}
                
                // Обновляем основной трек
$sql = "UPDATE Track SET 
    title = :title, 
    description = :description, 
    albumId = :albumId,
    coverImagePath = :coverImagePath, 
    fullAudioPath = :fullAudioPath,
    videoPath = :videoPath
WHERE id = :id";
                
$stmt = $pdo->prepare($sql);
$result = $stmt->execute([
    ':title' => $title,
    ':description' => $description,
    ':albumId' => $albumId, // <-- ИЗМЕНЕНО: Используем уже обработанную переменную
    ':coverImagePath' => $coverPath,
    ':fullAudioPath' => $fullTrackPath,
    ':videoPath' => $videoPath,
    ':id' => $trackId
]);
                
               if (!$result) {
                    $errors[] = 'Ошибка при обновлении трека';
                } else {
                    // 1. Вычисляем и сохраняем длительность АУДИОФАЙЛА
                    // (строку $duration = calculateAudioDuration('..' . $fullTrackPath); убрал, т.к. она дублируется)
    
                    $duration = calculateAudioDuration('..' . $fullTrackPath);
    
                    if ($duration > 0) {
                        $stmt = $pdo->prepare("UPDATE Track SET duration = ? WHERE id = ?");
                        $stmt->execute([$duration, $trackId]);
                        error_log("⏱️ Длительность трека #$trackId: " . formatTime($duration));
                    }
                    
                    // 2. ОБРАБОТКА ВИДЕО: Защита от NULL и Undefined переменной
                    // Блок выполняется только, если есть путь к видеоклипу
                    if (!empty($videoPath)) {
                        
                        $videoDuration = 0; // Инициализация (Fixes Undefined variable)
                        
                        // Если видео было только что загружено, вычисляем его длительность
                        if ($videoUpdated) {
                            $videoDuration = calculateAudioDuration('..' . $videoPath); 
                        } else {
                            // Иначе берем текущую длительность из базы (если она есть)
                            $videoDuration = $currentTrack['duration'] ?? 0;
                        }
                        
                        // ✅ ВСТАВИТЬ ИЛИ ОБНОВИТЬ видео в таблицу VideoClips
                        $stmt = $pdo->prepare("
                            INSERT INTO VideoClips (track_id, videoPath, coverImagePath, title, duration)
                            VALUES (:track_id, :videoPath, :coverImagePath, :title, :duration)
                            ON DUPLICATE KEY UPDATE 
                                videoPath = VALUES(videoPath),
                                coverImagePath = VALUES(coverImagePath),
                                duration = VALUES(duration),
                                updatedAt = NOW()
                        ");
                        
                        $stmt->execute([
                            ':track_id' => $trackId,
                            ':videoPath' => $videoPath,
                            ':coverImagePath' => $coverPath,  // Использовать обложку трека
                            ':title' => $currentTrack['title'], // ИСПРАВЛЕНО: $currentTrack вместо $track
                            ':duration' => $videoDuration
                        ]);
                        
                        error_log("✅ Видео сохранено в VideoClips: длительность = $videoDuration сек");
                    } // Конец if (!empty($videoPath))
    
                    // Сохраняем текст песни отдельно (или удаляем если очищен)
                    if (!empty($lyrics)) {
                        $stmt = $pdo->prepare("
                            INSERT INTO SongLyrics (track_id, lyrics)
                            VALUES (:track_id, :lyrics)
                            ON DUPLICATE KEY UPDATE lyrics = VALUES(lyrics)
                        ");
                        $stmt->execute([
                            ':track_id' => $trackId,
                            ':lyrics' => $lyrics
                        ]);
                    } else {
                        $stmt = $pdo->prepare("DELETE FROM SongLyrics WHERE track_id = ?");
                        $stmt->execute([$trackId]);
                    }
    
                    // Успешное обновление
                    header('Location: index.php?success=1');
                    exit;
                }
            }

            }
            
        catch (Exception $e) {
            $errors[] = 'Ошибка БД: ' . $e->getMessage();
        }
    }
}

// === ЗАГРУЗКА ДАННЫХ ТРЕКА ===
$stmt = $pdo->prepare("SELECT t.*, sl.lyrics FROM Track t 
                       LEFT JOIN SongLyrics sl ON t.id = sl.track_id 
                       WHERE t.id = ?");
$stmt->execute([$trackId]);
$track = $stmt->fetch();

if (!$track) {
    header('Location: index.php');
    exit;
}

// === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===
// calculateAudioDuration() / extractMP3Duration() / extractWAVDuration()
// теперь живут в include_config/AudioDuration.php (общий модуль для
// add_track.php и edit_track.php, чтобы длительность считалась одинаково
// и сразу при загрузке, а не только при редактировании).

/**
 * Форматирование времени
 */
function formatTime($seconds) {
    if (!$seconds || $seconds < 0) return '0:00';
    
    $mins = (int)($seconds / 60);
    $secs = (int)($seconds % 60);
    $hours = (int)($mins / 60);
    $mins = $mins % 60;
    
    if ($hours > 0) {
        return sprintf("%d:%02d:%02d", $hours, $mins, $secs);
    }
    return sprintf("%d:%02d", $mins, $secs);
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Редактировать трек - <?= htmlspecialchars($track['title']) ?></title>
    <link rel="stylesheet" href="../assets/css/admin_style.css">
    <style>
        .form-container { max-width: 900px; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: bold; color: #FFD700; }
        .form-group input, .form-group textarea, .form-group select { 
            width: 100%; 
            padding: 10px; 
            background-color: #111; 
            border: 1px solid #FFD700; 
            color: #e0e0e0; 
            border-radius: 4px; 
            box-sizing: border-box;
            font-family: inherit;
        }
        .form-group textarea { resize: vertical; min-height: 100px; }
        .form-group input[type="file"] { padding: 5px; border: 2px dashed #FFD700; }
        .submit-button { 
            padding: 12px 30px; 
            background-color: #2b6cb0; 
            color: #fff; 
            border: none; 
            border-radius: 4px; 
            font-size: 1rem; 
            cursor: pointer;
            font-weight: bold;
        }
        .submit-button:hover { background-color: #3182ce; }
        .errors { 
            background-color: #c53030; 
            color: #fff; 
            padding: 15px; 
            border-radius: 4px; 
            margin-bottom: 20px;
        }
        .error-item { margin: 5px 0; }
        .current-file { 
            font-size: 0.85rem; 
            color: #a0aec0; 
            margin-top: 8px;
            padding: 10px;
            background: rgba(255,215,0,0.1);
            border-left: 3px solid #FFD700;
        }
        .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
            border-bottom: 2px solid #FFD700;
        }
        .tab-btn {
            padding: 10px 20px;
            background: transparent;
            border: none;
            color: #aaa;
            cursor: pointer;
            font-weight: bold;
            border-bottom: 3px solid transparent;
            transition: all 0.3s;
        }
        .tab-btn.active {
            color: #FFD700;
            border-bottom-color: #FFD700;
        }
        .tab-content { display: none; }
        .tab-content.active { display: block; }
    </style>
</head>
<body>
    <div class="container form-container">
        <div class="breadcrumbs">
            <a href="index.php">Управление треками</a> &raquo;
            <span>Редактировать трек</span>
        </div>
        
        <h1>✏️ Редактировать трек: <?= htmlspecialchars($track['title']) ?></h1>
        
        <?php if (!empty($errors)): ?>
            <div class="errors">
                <strong>❌ Ошибки:</strong>
                <?php foreach ($errors as $error): ?>
                    <div class="error-item">• <?= htmlspecialchars($error) ?></div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
        
        <div class="tabs">
            <button class="tab-btn active" onclick="showTab('basic', this)">📝 Основное</button>
            <button class="tab-btn" onclick="showTab('files', this)">📁 Файлы</button>
            <button class="tab-btn" onclick="showTab('lyrics', this)">📄 Текст</button>
            <button class="tab-btn" onclick="showTab('video', this)">🎬 Видео</button>
        </div>
        
        <form action="edit_track.php?id=<?= $trackId ?>" method="POST" enctype="multipart/form-data">
            
            <div id="basic" class="tab-content active">
                <div class="form-group">
                    <label for="albumId">Альбом</label>
                    <select id="albumId" name="albumId">
                        <option value="">-- Без альбома --</option>
                        <?php foreach ($albums as $album): ?>
                            <option value="<?= $album['id'] ?>" 
                                <?= ($track['albumId'] == $album['id']) ? 'selected' : '' ?>>
                                <?= htmlspecialchars($album['title']) ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="title">Название трека *</label>
                    <input type="text" id="title" name="title" 
                        value="<?= htmlspecialchars($track['title']) ?>" required>
                </div>
                
                <div class="form-group">
                    <label for="description">Описание / Краткая информация</label>
                    <textarea id="description" name="description" rows="4">
<?= htmlspecialchars($track['description'] ?? '') ?></textarea>
                </div>
            </div>
            
            <div id="files" class="tab-content">
                <div class="form-group">
                    <label for="cover">Обложка трека (JPG, PNG)</label>
                    <input type="file" id="cover" name="cover" accept="image/jpeg, image/png">
                    <div class="current-file">
                        📷 Текущая обложка:
                        <?php if (!empty($track['coverImagePath'])): ?>
                            <br><img src="/<?= htmlspecialchars(ltrim($track['coverImagePath'], '/')) ?>"
                                alt="Обложка" style="max-width: 100px; margin-top: 5px; border-radius: 4px;">
                        <?php else: ?>
                            <span style="color:#e53e3e;">❌ Не загружена</span>
                        <?php endif; ?>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="fullTrack">Аудиофайл трека (MP3, WAV)</label>
                    <input type="file" id="fullTrack" name="fullTrack" accept=".mp3, .wav">
                    <div class="current-file">
                        🎵 Текущий файл: <?= !empty($track['fullAudioPath']) ? htmlspecialchars(basename($track['fullAudioPath'])) : '<span style="color:#e53e3e;">❌ Не загружен</span>' ?>
                        <?php if ($track['duration'] > 0): ?>
                            <br>⏱️ Длительность: <?= formatTime($track['duration']) ?>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
            
            <div id="lyrics" class="tab-content">
                <div class="form-group">
                    <label for="lyrics">Текст песни</label>
                    <textarea id="lyrics" name="lyrics" rows="15" 
                        placeholder="Введите текст песни построчно...">
<?= htmlspecialchars($track['lyrics'] ?? '') ?></textarea>
                    <div class="current-file" style="margin-top: 15px;">
                        💡 Совет: Каждая строка на новой строке. 
                        Опционально добавьте время синхронизации: [00:12.00]Текст
                    </div>
                </div>
            </div>
            
            <div id="video" class="tab-content">
                <div class="form-group">
                    <label for="video">Видеоклип (MP4, WebM)</label>
                    <input type="file" id="video" name="video" accept=".mp4, .webm">
                    <div class="current-file">
                        🎬 <?php if ($track['videoPath']): ?>
                            Текущее видео: <?= htmlspecialchars(basename($track['videoPath'])) ?>
                        <?php else: ?>
                            ❌ Видео не загружено
                        <?php endif; ?>
                    </div>
                </div>
                
                <div class="current-file" style="margin-top: 15px; background: rgba(100,200,255,0.1); border-left-color: #4169E1;">
                    📝 Для чего: 
                    <ul style="margin: 10px 0 0 20px; color: #a0aec0;">
                        <li>🎵 Клипы (музыкальные видео)</li>
                        <li>🎤 Минусовки для караоке</li>
                        <li>🎬 Концертные записи</li>
                    </ul>
                </div>
            </div>
            
            <button type="submit" class="submit-button">💾 Сохранить изменения</button>
        </form>
    </div>
    
    <script>
    function showTab(tabName, btn) {
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(tabName).classList.add('active');
        btn.classList.add('active');
    }
    </script>
</body>
</html>