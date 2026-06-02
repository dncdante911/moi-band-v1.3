<template>
  <div class="container page-content">
    <div class="section-header">
      <h2 class="section-title">💿 Дискография</h2>
      <div class="title-underline"></div>
    </div>

    <p v-if="loading" class="empty-state">Загружаем альбомы...</p>
    <p v-else-if="error" class="empty-state">❌ Ошибка загрузки. Попробуйте обновить страницу.</p>

    <div v-else-if="!albums.length" class="empty-state">🎵 Альбомы скоро будут добавлены...</div>

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
                <span class="overlay-text">Открыть альбом</span>
                <span class="overlay-arrow">→</span>
              </div>
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { albumsApi } from '@/api/index.js'

const albums = ref([])
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
  try {
    const res = await albumsApi.getAll()
    albums.value = res.data?.data || res.data || []
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>
