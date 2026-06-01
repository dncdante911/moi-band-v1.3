<template>
  <div class="container page-content">
    <div class="section-header">
      <h2 class="section-title">💿 Дискография</h2>
      <div class="title-underline"></div>
    </div>

    <p v-if="loading" class="empty-state">Загружаем альбомы...</p>
    <p v-else-if="error" class="empty-state">❌ Ошибка загрузки. Попробуйте обновить страницу.</p>

    <div v-else class="albums-grid">
      <RouterLink
        v-for="album in albums"
        :key="album.id"
        :to="`/albums/${album.id}`"
        class="album-card"
      >
        <div class="album-card-cover">
          <img :src="album.coverImagePath" :alt="album.title" loading="lazy" />
          <div class="album-card-overlay">
            <span class="play-hint">Открыть →</span>
          </div>
        </div>
        <div class="album-card-body">
          <h3 class="album-card-title">{{ album.title }}</h3>
          <p v-if="album.releaseDate" class="album-card-year">
            📅 {{ new Date(album.releaseDate).getFullYear() }}
          </p>
          <p v-if="album.description" class="album-card-desc">
            {{ album.description?.substring(0, 80) }}...
          </p>
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
