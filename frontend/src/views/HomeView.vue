<template>
  <div>
    <!-- === ГЕРОЙ === -->
    <section class="hero-banner">
      <div class="hero-overlay"></div>
      <div class="hero-glow hero-glow-1"></div>
      <div class="hero-glow hero-glow-2"></div>
      <div class="hero-content" v-if="hero">
        <h1 class="hero-title">{{ hero.title }}</h1>
        <p class="hero-subtitle">{{ hero.subtitle }}</p>
        <p class="hero-description">{{ hero.description }}</p>
        <div class="hero-buttons">
          <RouterLink :to="hero.btn1_url || '/player'" class="hero-button primary">
            {{ hero.btn1_text || '▶️ Слушать альбом' }}
          </RouterLink>
          <RouterLink :to="hero.btn2_url || '/about'" class="hero-button secondary">
            {{ hero.btn2_text || '📖 О проекте' }}
          </RouterLink>
        </div>
      </div>
      <div class="particles-container">
        <div class="particle particle-1"></div>
        <div class="particle particle-2"></div>
        <div class="particle particle-3"></div>
      </div>
    </section>

    <div class="container page-content">
      <!-- === НОВОСТИ === -->
      <section class="news-section">
        <div class="section-header">
          <h2 class="section-title">📰 Последние Новости</h2>
          <div class="title-underline"></div>
        </div>
        <p v-if="newsLoading" class="empty-state">Загружаем новости...</p>
        <p v-else-if="!news.length" class="empty-state">🤔 Пока нет новостей, но они скоро появятся...</p>
        <div v-else class="news-grid">
          <article v-for="post in news" :key="post.id" class="news-card">
            <div class="news-card-header">
              <div class="news-date">📅 {{ formatDate(post.created_at) }}</div>
            </div>
            <h3 class="news-title">{{ post.title }}</h3>
            <p class="news-excerpt">{{ post.content?.substring(0, 150) }}...</p>
            <RouterLink :to="`/news/${post.id}`" class="news-link">Читать далее →</RouterLink>
          </article>
        </div>
      </section>

      <!-- === АЛЬБОМЫ === -->
      <section class="albums-section" id="albums">
        <div class="section-header">
          <h2 class="section-title">💿 Дискография</h2>
          <div class="title-underline"></div>
          <p class="section-subtitle">Все альбомы проекта Master of Illusion</p>
        </div>
        <p v-if="albumsLoading" class="empty-state">Загружаем альбомы...</p>
        <p v-else-if="!albums.length" class="empty-state">🎵 Альбомы скоро будут добавлены...</p>
        <div v-else class="album-showcase-grid">
          <RouterLink
            v-for="(album, i) in albums"
            :key="album.id"
            :to="`/albums/${album.id}`"
            class="album-showcase-card"
            :style="`--delay: ${i * 0.1}s`"
          >
            <div class="album-showcase-inner">
              <div class="album-number">{{ String(i + 1).padStart(2, '0') }}</div>
              <div class="album-frame-wrapper">
                <div class="album-frame-outer">
                  <div class="album-frame-inner">
                    <img
                      :src="album.coverImagePath"
                      :alt="album.title"
                      loading="lazy"
                      class="album-image"
                    />
                  </div>
                </div>
                <div class="album-light-effect"></div>
                <div class="album-corner album-corner-tl"></div>
                <div class="album-corner album-corner-tr"></div>
                <div class="album-corner album-corner-bl"></div>
                <div class="album-corner album-corner-br"></div>
              </div>
              <div class="album-info">
                <h3 class="album-title">{{ album.title }}</h3>
                <div v-if="album.releaseDate" class="album-year">
                  📅 {{ new Date(album.releaseDate).getFullYear() }}
                </div>
                <div class="album-hover-overlay">
                  <div class="overlay-content">
                    <span class="overlay-text">Посмотреть альбом</span>
                    <span class="overlay-arrow">→</span>
                  </div>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
      </section>

      <!-- === CTA === -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>🎶 Присоединяйтесь к нашему сообществу</h2>
          <p>Общайтесь с фанатами, делитесь впечатлениями и слушайте эпические треки</p>
          <div class="cta-buttons">
            <RouterLink to="/chat" class="cta-button primary">💬 Перейти в Чат</RouterLink>
            <RouterLink to="/about" class="cta-button secondary">📖 Узнать больше</RouterLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { albumsApi, newsApi, heroApi } from '@/api/index.js'

const hero = ref(null)
const news = ref([])
const albums = ref([])
const newsLoading = ref(true)
const albumsLoading = ref(true)

function formatDate(str) {
  if (!str) return ''
  return new Date(str).toLocaleDateString('ru-RU')
}

onMounted(async () => {
  try {
    const [heroRes, newsRes, albumsRes] = await Promise.all([
      heroApi.getSettings().catch(() => ({ data: {} })),
      newsApi.getAll(3),
      albumsApi.getAll(),
    ])
    hero.value = heroRes.data?.data || {
      title: '🎸 Перекрестки Времен',
      subtitle: 'Historical Heavy Metal',
      description: 'Новый альбом. Окунитесь в перекрестки истории, которые мир не забыл',
    }
    news.value = newsRes.data?.data || newsRes.data || []
    albums.value = albumsRes.data?.data || albumsRes.data || []
  } finally {
    newsLoading.value = false
    albumsLoading.value = false
  }
})
</script>
