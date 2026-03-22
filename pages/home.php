<?php
/**
 * pages/home.php - ПРАВИЛЬНАЯ ВЕРСИЯ
 */

$page_css = '/assets/css/home.css';
require_once __DIR__ . '/../include_config/db_connect.php';

// ✅ Правильная таблица
$stmt = $pdo->query('SELECT id, title, content, created_at FROM news ORDER BY created_at DESC LIMIT 3');
$posts = $stmt->fetchAll();

$stmt = $pdo->query('SELECT * FROM Albums ORDER BY releaseDate DESC');
$albums = $stmt->fetchAll();

// Загружаем настройки героя из БД (с фолбэком на дефолты)
function getHeroSetting(PDO $pdo, string $key, string $default): string {
    try {
        $s = $pdo->prepare("SELECT setting_value FROM SiteSettings WHERE setting_key = ?");
        $s->execute([$key]);
        $row = $s->fetch();
        return ($row && $row['setting_value'] !== '') ? $row['setting_value'] : $default;
    } catch (Exception $e) {
        return $default;
    }
}
$heroTitle       = getHeroSetting($pdo, 'hero_title',       '🎸 Перекрестки Времен');
$heroSubtitle    = getHeroSetting($pdo, 'hero_subtitle',    'Historycal Heavy Metal');
$heroDescription = getHeroSetting($pdo, 'hero_description', 'Новый альбом. Окунитесь в перекрестки истории, которые мир не забыл');
$heroBtn1Text    = getHeroSetting($pdo, 'hero_btn1_text',   '▶️ Слушать альбом');
$heroBtn1Url     = getHeroSetting($pdo, 'hero_btn1_url',    '#albums');
$heroBtn2Text    = getHeroSetting($pdo, 'hero_btn2_text',   '📖 О проекте');
$heroBtn2Url     = getHeroSetting($pdo, 'hero_btn2_url',    '/pages/about.php');

require_once __DIR__ . '/../include_config/header.php';
?>

<div class="hero-banner">
    <div class="hero-overlay"></div>
    <div class="hero-glow hero-glow-1"></div>
    <div class="hero-glow hero-glow-2"></div>
    
    <div class="hero-content">
        <h1 class="hero-title"><?= htmlspecialchars($heroTitle) ?></h1>
        <p class="hero-subtitle"><?= htmlspecialchars($heroSubtitle) ?></p>
        <p class="hero-description"><?= htmlspecialchars($heroDescription) ?></p>

        <div class="hero-buttons">
            <a href="<?= htmlspecialchars($heroBtn1Url) ?>" class="hero-button primary"><?= htmlspecialchars($heroBtn1Text) ?></a>
            <a href="<?= htmlspecialchars($heroBtn2Url) ?>" class="hero-button secondary"><?= htmlspecialchars($heroBtn2Text) ?></a>
        </div>
    </div>
    
    <div class="particles-container">
        <div class="particle particle-1"></div>
        <div class="particle particle-2"></div>
        <div class="particle particle-3"></div>
    </div>
</div>

<div class="container page-content">
    
    <section class="news-section">
        <div class="section-header">
            <h2 class="section-title">📰 Последние Новости</h2>
            <div class="title-underline"></div>
        </div>
        
        <?php if (empty($posts)): ?>
            <p class="empty-state">🤔 Пока нет новостей, но они скоро появятся...</p>
        <?php else: ?>
            <div class="news-grid">
                <?php foreach ($posts as $post): ?>
                    <article class="news-card">
                        <div class="news-card-header">
                            <div class="news-date">
                                📅 <?= date('d.m.Y', strtotime($post['created_at'])) ?>
                            </div>
                        </div>
                        
                        <h3 class="news-title">
                            <?= htmlspecialchars($post['title']) ?>
                        </h3>
                        
                        <p class="news-excerpt">
                            <?= htmlspecialchars(mb_substr($post['content'], 0, 150)) ?>...
                        </p>
                        
                        <a href="/pages/post.php?id=<?= (int)$post['id'] ?>" class="news-link">
                            Читать далее →
                        </a>
                    </article>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </section>
    
    <!-- === СЕКЦИЯ АЛЬБОМОВ === -->
    <section class="albums-section" id="albums">
        <div class="section-header">
            <h2 class="section-title">💿 Дискография</h2>
            <div class="title-underline"></div>
            <p class="section-subtitle">Все альбомы проекта Master of Illusion</p>
        </div>
        
        <?php if (empty($albums)): ?>
            <p class="empty-state">🎵 Альбомы скоро будут добавлены...</p>
        <?php else: ?>
            <div class="album-showcase-grid">
                <?php $index = 0; foreach ($albums as $album): $index++; ?>
                    <a href="/pages/albums.php?id=<?= (int)$album['id'] ?>" class="album-showcase-card" style="--delay: <?= $index * 0.1 ?>s">
                        <div class="album-showcase-inner">
                            <!-- Номер альбома -->
                            <div class="album-number"><?= sprintf('%02d', $index) ?></div>
                            
                            <!-- Изображение с рамкой -->
                            <div class="album-frame-wrapper">
                                <div class="album-frame-outer">
                                    <div class="album-frame-inner">
                                        <img src="/<?= htmlspecialchars(ltrim($album['coverImagePath'], '/')) ?>" 
                                             alt="<?= htmlspecialchars($album['title']) ?>"
                                             loading="lazy"
                                             class="album-image">
                                    </div>
                                </div>
                                
                                <!-- Эффект света -->
                                <div class="album-light-effect"></div>
                                
                                <!-- Декоративные углы -->
                                <div class="album-corner album-corner-tl"></div>
                                <div class="album-corner album-corner-tr"></div>
                                <div class="album-corner album-corner-bl"></div>
                                <div class="album-corner album-corner-br"></div>
                            </div>
                            
                            <!-- Информация об альбоме -->
                            <div class="album-info">
                                <h3 class="album-title">
                                    <?= htmlspecialchars($album['title']) ?>
                                </h3>
                                
                                <?php if ($album['releaseDate']): ?>
                                    <div class="album-year">
                                        📅 <?= date('Y', strtotime($album['releaseDate'])) ?>
                                    </div>
                                <?php endif; ?>
                                
                                <div class="album-hover-overlay">
                                    <div class="overlay-content">
                                        <span class="overlay-text">Посмотреть альбом</span>
                                        <span class="overlay-arrow">→</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </section>
    
    <!-- === КОЛА ДЛЯ ДЕЙСТВИЙ === -->
    <section class="cta-section">
        <div class="cta-content">
            <h2>🎶 Присоединяйтесь к нашему сообществу</h2>
            <p>Общайтесь с фанатами, делитесь впечатлениями и слушайте эпические треки</p>
            
            <div class="cta-buttons">
                <a href="/pages/chat.php" class="cta-button primary">💬 Перейти в Чат</a>
                <a href="/pages/about.php" class="cta-button secondary">📖 Узнать больше</a>
            </div>
        </div>
    </section>
    
</div>

<?php require_once __DIR__ . '/../include_config/footer.php'; ?>