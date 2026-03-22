<?php
/**
 * admin/hero_settings.php — Редактор героя-баннера главной страницы
 */

require_once __DIR__ . '/auth_check.php';
require_once '../include_config/config.php';
require_once '../include_config/db_connect.php';

$message = '';
$error   = '';

// ── Вспомогательная функция: получить настройку ───────────────────
function getSetting(PDO $pdo, string $key, string $default = ''): string {
    try {
        $stmt = $pdo->prepare("SELECT setting_value FROM SiteSettings WHERE setting_key = ?");
        $stmt->execute([$key]);
        $row = $stmt->fetch();
        return $row ? (string)$row['setting_value'] : $default;
    } catch (Exception $e) {
        return $default;
    }
}

// ── Вспомогательная функция: сохранить настройку ─────────────────
function setSetting(PDO $pdo, string $key, string $value): void {
    $pdo->prepare(
        "INSERT INTO SiteSettings (setting_key, setting_value)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)"
    )->execute([$key, $value]);
}

// ── Обработка POST ────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $fields = [
            'hero_title', 'hero_subtitle', 'hero_description',
            'hero_btn1_text', 'hero_btn1_url',
            'hero_btn2_text', 'hero_btn2_url',
        ];
        foreach ($fields as $field) {
            $val = trim($_POST[$field] ?? '');
            setSetting($pdo, $field, $val);
        }
        $message = '✅ Настройки сохранены!';
    } catch (Exception $e) {
        $error = '❌ Ошибка сохранения: ' . htmlspecialchars($e->getMessage());
    }
}

// ── Текущие значения ──────────────────────────────────────────────
$hero_title       = getSetting($pdo, 'hero_title',       '🎸 Перекрестки Времен');
$hero_subtitle    = getSetting($pdo, 'hero_subtitle',    'Historycal Heavy Metal');
$hero_description = getSetting($pdo, 'hero_description', 'Новый альбом. Окунитесь в перекрестки истории, которые мир не забыл');
$hero_btn1_text   = getSetting($pdo, 'hero_btn1_text',   '▶️ Слушать альбом');
$hero_btn1_url    = getSetting($pdo, 'hero_btn1_url',    '#albums');
$hero_btn2_text   = getSetting($pdo, 'hero_btn2_text',   '📖 О проекте');
$hero_btn2_url    = getSetting($pdo, 'hero_btn2_url',    '/pages/about.php');
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Редактор шапки — <?= htmlspecialchars(SITE_NAME) ?></title>
    <link rel="stylesheet" href="../assets/css/admin_style.css">
    <style>
        .settings-form { max-width: 720px; margin: 0 auto; }
        .form-group { margin-bottom: 24px; }
        .form-group label { display: block; font-weight: 600; margin-bottom: 6px; color: #ccc; }
        .form-group input[type="text"],
        .form-group textarea {
            width: 100%; padding: 10px 14px; border-radius: 6px;
            background: #1a1a2e; border: 1px solid #444; color: #fff;
            font-size: 15px; box-sizing: border-box;
        }
        .form-group textarea { min-height: 80px; resize: vertical; }
        .form-group small { color: #777; font-size: 12px; margin-top: 4px; display: block; }
        .btn-save {
            background: #FFD700; color: #000; border: none; padding: 12px 32px;
            font-size: 16px; font-weight: 700; border-radius: 6px; cursor: pointer;
        }
        .btn-save:hover { background: #ffe340; }
        .alert-success { background: #1a4a1a; border: 1px solid #2d7a2d; color: #7dce7d; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px; }
        .alert-error   { background: #4a1a1a; border: 1px solid #7a2d2d; color: #ce7d7d; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px; }
        .section-divider { border-top: 1px solid #333; margin: 24px 0; }
        .preview-box {
            background: linear-gradient(160deg, #060608, #0d0d1a);
            border: 1px solid #333; border-radius: 8px; padding: 32px;
            text-align: center; margin-bottom: 32px;
        }
        .preview-box h1 { color: #FFD700; font-size: 2rem; margin: 0 0 8px; }
        .preview-box p  { color: #aaa; margin: 4px 0; }
        .preview-box .preview-btns { margin-top: 16px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .preview-box .pbtn { padding: 8px 20px; border-radius: 6px; font-weight: 600; text-decoration: none; }
        .preview-box .pbtn-primary { background: #FFD700; color: #000; }
        .preview-box .pbtn-secondary { background: transparent; border: 2px solid #FFD700; color: #FFD700; }
    </style>
</head>
<body>
<div class="admin-container">
    <header class="admin-header">
        <h1>🎸 Master of Illusion — Редактор шапки</h1>
        <nav class="admin-nav">
            <a href="index.php">Треки</a>
            <a href="albums_list.php">Альбомы</a>
            <a href="news_list.php">Новости</a>
            <a href="gallery_list.php">Галерея</a>
            <a href="hero_settings.php" class="active">Шапка</a>
        </nav>
    </header>

    <main class="admin-main">
        <h2>Настройки герой-баннера</h2>

        <?php if ($message): ?>
            <div class="alert-success"><?= htmlspecialchars($message) ?></div>
        <?php endif; ?>
        <?php if ($error): ?>
            <div class="alert-error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <!-- Предпросмотр -->
        <div class="preview-box" id="preview-box">
            <h1 id="prev-title"><?= htmlspecialchars($hero_title) ?></h1>
            <p id="prev-subtitle" style="color:#FFD700; font-size:1.1rem;"><?= htmlspecialchars($hero_subtitle) ?></p>
            <p id="prev-desc"><?= htmlspecialchars($hero_description) ?></p>
            <div class="preview-btns">
                <a id="prev-btn1" href="#" class="pbtn pbtn-primary"><?= htmlspecialchars($hero_btn1_text) ?></a>
                <a id="prev-btn2" href="#" class="pbtn pbtn-secondary"><?= htmlspecialchars($hero_btn2_text) ?></a>
            </div>
        </div>

        <form method="POST" class="settings-form" id="settings-form">
            <div class="form-group">
                <label for="hero_title">Заголовок баннера</label>
                <input type="text" id="hero_title" name="hero_title"
                       value="<?= htmlspecialchars($hero_title) ?>"
                       placeholder="🎸 Перекрестки Времен">
                <small>Можно использовать эмодзи. Это главный заголовок на главной странице.</small>
            </div>

            <div class="form-group">
                <label for="hero_subtitle">Подзаголовок / жанр</label>
                <input type="text" id="hero_subtitle" name="hero_subtitle"
                       value="<?= htmlspecialchars($hero_subtitle) ?>"
                       placeholder="Historycal Heavy Metal">
            </div>

            <div class="form-group">
                <label for="hero_description">Описание</label>
                <textarea id="hero_description" name="hero_description"
                          placeholder="Краткое описание альбома или группы"><?= htmlspecialchars($hero_description) ?></textarea>
            </div>

            <div class="section-divider"></div>
            <h3 style="color:#FFD700; margin-bottom:16px;">Кнопки</h3>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
                <div class="form-group">
                    <label for="hero_btn1_text">Кнопка 1: Текст</label>
                    <input type="text" id="hero_btn1_text" name="hero_btn1_text"
                           value="<?= htmlspecialchars($hero_btn1_text) ?>">
                </div>
                <div class="form-group">
                    <label for="hero_btn1_url">Кнопка 1: Ссылка</label>
                    <input type="text" id="hero_btn1_url" name="hero_btn1_url"
                           value="<?= htmlspecialchars($hero_btn1_url) ?>"
                           placeholder="#albums или /pages/player.php?album=1">
                </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
                <div class="form-group">
                    <label for="hero_btn2_text">Кнопка 2: Текст</label>
                    <input type="text" id="hero_btn2_text" name="hero_btn2_text"
                           value="<?= htmlspecialchars($hero_btn2_text) ?>">
                </div>
                <div class="form-group">
                    <label for="hero_btn2_url">Кнопка 2: Ссылка</label>
                    <input type="text" id="hero_btn2_url" name="hero_btn2_url"
                           value="<?= htmlspecialchars($hero_btn2_url) ?>"
                           placeholder="/pages/about.php">
                </div>
            </div>

            <button type="submit" class="btn-save">💾 Сохранить</button>
            <a href="/" target="_blank" style="margin-left:16px; color:#FFD700;">Просмотреть сайт →</a>
        </form>
    </main>
</div>

<script>
// Живой предпросмотр
const map = {
    hero_title:       'prev-title',
    hero_subtitle:    'prev-subtitle',
    hero_description: 'prev-desc',
    hero_btn1_text:   'prev-btn1',
    hero_btn2_text:   'prev-btn2',
};
Object.entries(map).forEach(([fieldId, prevId]) => {
    const field = document.getElementById(fieldId);
    const prev  = document.getElementById(prevId);
    if (field && prev) {
        field.addEventListener('input', () => { prev.textContent = field.value; });
    }
});
</script>
</body>
</html>
