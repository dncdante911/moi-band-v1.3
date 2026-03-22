<?php
/**
 * Файл: pages/albums.php
 * ИСПРАВЛЕННАЯ ВЕРСИЯ - без бесконечного редиректа
 */

$page_css = '/assets/css/albums.css';
require_once __DIR__ . '/../include_config/db_connect.php';


// Проверяем, что ID альбома передан и является числом
if (!isset($_GET['id']) || !filter_var($_GET['id'], FILTER_VALIDATE_INT)) {
    // Если ID не передан, показываем список всех альбомов
    require_once __DIR__ . '/../include_config/header.php';
    
    // Получаем все альбомы
    $stmt = $pdo->query('SELECT * FROM Albums ORDER BY releaseDate DESC');
    $albums = $stmt->fetchAll();
    ?>
    
    <div class="container page-content">
        <h1>💿 Все альбомы</h1>
        
        <?php if (empty($albums)): ?>
            <p>🎵 Альбомов пока нет</p>
        <?php else: ?>
            <div class="album-showcase-grid">
                <?php $index = 0; foreach ($albums as $album): $index++; ?>
                    <a href="?id=<?= (int)$album['id'] ?>" class="album-showcase-card">
                        <div class="album-showcase-inner">
                            <div class="album-number"><?= sprintf('%02d', $index) ?></div>
                            
                            <div class="album-frame-wrapper">
                                <div class="album-frame-outer">
                                    <div class="album-frame-inner">
                                        <img src="/<?= htmlspecialchars(ltrim($album['coverImagePath'], '/')) ?>" 
                                             alt="<?= htmlspecialchars($album['title']) ?>"
                                             loading="lazy"
                                             class="album-image">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="album-info">
                                <h3 class="album-title">
                                    <?= htmlspecialchars($album['title']) ?>
                                </h3>
                                
                                <?php if ($album['releaseDate']): ?>
                                    <div class="album-year">
                                        📅 <?= date('Y', strtotime($album['releaseDate'])) ?>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </div>
                    </a>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
    
    <?php
    require_once __DIR__ . '/../include_config/footer.php';
    exit;
}

// Если ID передан - показываем конкретный альбом
$albumId = (int)$_GET['id'];

// Получаем информацию об альбоме
$stmt = $pdo->prepare("SELECT * FROM Albums WHERE id = ?");
$stmt->execute([$albumId]);
$album = $stmt->fetch();

// Если альбома нет - показываем список
if (!$album) {
    header('Location: /pages/albums.php');
    exit;
}

// Получаем все треки альбома
$stmt = $pdo->prepare("SELECT * FROM Track WHERE albumId = ? ORDER BY id ASC");
$stmt->execute([$albumId]);
$tracks = $stmt->fetchAll();

require_once __DIR__ . '/../include_config/header.php';
?>

<!-- === БАННЕР АЛЬБОМА === -->
<div class="album-page-banner">
    <div class="banner-overlay"></div>
    <div class="banner-glow"></div>
    
    <div class="banner-content">
        <h1 class="banner-title">💿 <?= htmlspecialchars($album['title']) ?></h1>
        <p class="banner-subtitle">
            <?php if ($album['releaseDate']): ?>
                📅 <?= date('Y', strtotime($album['releaseDate'])) ?>
            <?php endif; ?>
            • 🎵 <?= count($tracks) ?> треков
        </p>
    </div>
</div>

<div class="container page-content album-page">
    
    <!-- === ИНФОРМАЦИЯ АЛЬБОМА === -->
    <section class="album-header">
        <div class="album-cover">
            <img src="/<?= htmlspecialchars(ltrim($album['coverImagePath'], '/')) ?>" 
                 alt="<?= htmlspecialchars($album['title']) ?>"
                 class="album-cover-image">
        </div>
        
        <div class="album-info-section">
            <h2 class="album-title-main">
                <?= htmlspecialchars($album['title']) ?>
            </h2>
            
            <?php if ($album['releaseDate']): ?>
                <p class="album-release-date">
                    📅 Дата релиза: <?= date('d.m.Y', strtotime($album['releaseDate'])) ?>
                </p>
            <?php endif; ?>
            
            <div class="album-stats">
                <span class="stat">🎵 <?= count($tracks) ?> треков</span>
            </div>
            
            <?php if ($album['description']): ?>
                <div class="album-description">
                    <h3>Описание</h3>
                    <p><?= nl2br(htmlspecialchars($album['description'])) ?></p>
                </div>
            <?php endif; ?>
            
            <a href="/pages/albums.php" class="back-link">← Вернуться в каталог</a>
        </div>
    </section>
<?php
require_once __DIR__ . '/../pages/player.php';
?>
    <!-- === ТРЕКЛИСТ === -->
    <section class="album-tracklist">
        <h2 class="tracklist-title">📋 Треклист</h2>
        
        <?php if (empty($tracks)): ?>
            <div class="empty-tracklist">
                <p>🎵 В этом альбоме пока нет треков</p>
            </div>
        <?php else: ?>
            <div class="tracks-container">
                <?php foreach ($tracks as $index => $track): ?>
                    <div class="track-item track-playable"
                         data-track-id="<?= (int)$track['id'] ?>"
                         data-track-title="<?= htmlspecialchars($track['title']) ?>"
                         data-track-url="/<?= htmlspecialchars(ltrim($track['fullAudioPath'], '/')) ?>"
                         data-track-cover="/<?= htmlspecialchars(ltrim($track['coverImagePath'], '/')) ?>"
                         data-track-views="<?= (int)($track['views'] ?? 0) ?>"
                         data-track-album="<?= htmlspecialchars($album['title']) ?>"
                    >
                        <div class="track-number">
                            <?= sprintf('%02d', $index + 1) ?>
                        </div>

                        <div class="track-cover">
                            <img src="/<?= htmlspecialchars(ltrim($track['coverImagePath'], '/')) ?>"
                                 alt="<?= htmlspecialchars($track['title']) ?>"
                                 loading="lazy">
                        </div>

                        <div class="track-info">
                            <h3 class="track-title">
                                <?= htmlspecialchars($track['title']) ?>
                            </h3>
                            <?php if ($track['description']): ?>
                                <p class="track-description">
                                    <?= htmlspecialchars(mb_substr($track['description'], 0, 100)) ?>
                                    <?php if (mb_strlen($track['description']) > 100): ?>...<?php endif; ?>
                                </p>
                            <?php endif; ?>

                            <div class="track-meta">
                                <span class="track-views" title="Прослушиваний">
                                    👁️ <span class="track-views-num"><?= (int)($track['views'] ?? 0) ?></span>
                                </span>

                                <!-- Кнопка «Поделиться треком» -->
                                <button class="track-share-btn"
                                        data-share-url="<?= htmlspecialchars(SITE_URL . '/pages/albums.php?id=' . $albumId . '&track=' . (int)$track['id']) ?>"
                                        data-share-title="<?= htmlspecialchars($track['title'] . ' — ' . $album['title']) ?>"
                                        title="Поделиться треком"
                                        onclick="event.stopPropagation();">
                                    🔗 Поделиться
                                </button>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </section>
    
    <!-- === КНОПКА НАЗАД === -->
    <div class="album-footer">
        <a href="/pages/albums.php" class="footer-link">← Вернуться в каталог альбомов</a>
    </div>

</div>

<style>
/* ── Мета-строка трека (просмотры + поделиться) ── */
.track-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 6px;
    flex-wrap: wrap;
}
.track-views {
    font-size: 0.82rem;
    color: #a0aec0;
}
.track-share-btn {
    background: none;
    border: 1px solid rgba(255,215,0,0.35);
    color: #FFD700;
    border-radius: 20px;
    padding: 3px 12px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    white-space: nowrap;
}
.track-share-btn:hover {
    background: rgba(255,215,0,0.12);
    transform: scale(1.04);
}
/* Всплывающая подсказка при копировании */
.share-toast {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background: #1a1a1a;
    border: 1px solid #FFD700;
    color: #FFD700;
    padding: 10px 22px;
    border-radius: 8px;
    font-size: 0.9rem;
    z-index: 9999;
    pointer-events: none;
    animation: shareToastIn 0.3s ease, shareToastOut 0.4s ease 2s forwards;
}
@keyframes shareToastIn  { from { opacity:0; bottom:10px } to { opacity:1; bottom:24px } }
@keyframes shareToastOut { from { opacity:1 }              to { opacity:0 } }
</style>

<script>
(function () {
    // ── Кнопки «Поделиться треком» ───────────────────────────────────
    function initShareButtons() {
        document.querySelectorAll('.track-share-btn').forEach(btn => {
            if (btn._shareInited) return;
            btn._shareInited = true;

            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const url   = btn.dataset.shareUrl;
                const title = btn.dataset.shareTitle;

                // Нативный Web Share API (мобильные браузеры)
                if (navigator.share) {
                    try {
                        await navigator.share({ title, url });
                        return;
                    } catch (_) { /* отмена — не страшно */ }
                }

                // Fallback: копируем в буфер
                try {
                    await navigator.clipboard.writeText(url);
                    showShareToast('✅ Ссылка на трек скопирована!');
                } catch (_) {
                    // Старый браузер
                    const ta = document.createElement('textarea');
                    ta.value = url;
                    ta.style.position = 'fixed';
                    ta.style.opacity  = '0';
                    document.body.appendChild(ta);
                    ta.focus(); ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                    showShareToast('✅ Ссылка на трек скопирована!');
                }
            });
        });
    }

    function showShareToast(msg) {
        const old = document.querySelector('.share-toast');
        if (old) old.remove();
        const el = document.createElement('div');
        el.className   = 'share-toast';
        el.textContent = msg;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 2700);
    }

    // ── Автоплей конкретного трека из URL (?track=ID) ────────────────
    function autoPlayFromUrl() {
        const params  = new URLSearchParams(window.location.search);
        const trackId = params.get('track');
        if (!trackId) return;

        const target = document.querySelector(`.track-playable[data-track-id="${trackId}"]`);
        if (!target) return;

        // Прокручиваем к треку и выделяем его
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.classList.add('is-autoplay');

        // Даём плееру время инициализироваться, затем запускаем
        const tryPlay = (attempts) => {
            if (window.epicPlayer) {
                target.click();
            } else if (attempts > 0) {
                setTimeout(() => tryPlay(attempts - 1), 300);
            }
        };
        setTimeout(() => tryPlay(10), 400);
    }

    // Запуск при обычной загрузке
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => { initShareButtons(); autoPlayFromUrl(); });
    } else {
        initShareButtons();
        autoPlayFromUrl();
    }

    // Повторный запуск при AJAX-обновлении контента
    window.addEventListener('ajaxContentLoaded', () => { initShareButtons(); autoPlayFromUrl(); });
})();
</script>

<?php require_once __DIR__ . '/../include_config/footer.php'; ?>