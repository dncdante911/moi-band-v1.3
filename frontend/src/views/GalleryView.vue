<template>
  <div class="container page-content">
    <div class="section-header">
      <h2 class="section-title">🖼️ Галерея</h2>
      <div class="title-underline"></div>
    </div>

    <p v-if="loading" class="empty-state">Загружаем галерею...</p>
    <div v-else-if="items.length" class="gallery-grid">
      <div
        v-for="item in items"
        :key="item.id"
        class="gallery-item"
        @click="openLightbox(item)"
      >
        <img :src="item.image_path || item.imagePath" :alt="item.title || ''" loading="lazy" />
        <div class="gallery-overlay">
          <span>🔍 {{ item.title }}</span>
        </div>
      </div>
    </div>
    <p v-else class="empty-state">Галерея пуста</p>

    <!-- Лайтбокс -->
    <Teleport to="body">
      <div v-if="lightboxItem" class="lightbox" @click.self="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox">✕</button>
        <img :src="lightboxItem.image_path || lightboxItem.imagePath" :alt="lightboxItem.title" />
        <p v-if="lightboxItem.title" class="lightbox-caption">{{ lightboxItem.title }}</p>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { galleryApi } from '@/api/index.js'

const items = ref([])
const loading = ref(true)
const lightboxItem = ref(null)

function openLightbox(item) { lightboxItem.value = item }
function closeLightbox() { lightboxItem.value = null }

onMounted(async () => {
  try {
    const res = await galleryApi.getAll()
    items.value = res.data?.data || res.data || []
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.lightbox {
  position: fixed; inset: 0; z-index: 9000;
  background: rgba(0,0,0,0.92);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
}
.lightbox img { max-width: 90vw; max-height: 80vh; border-radius: 8px; }
.lightbox-close {
  position: absolute; top: 20px; right: 30px;
  background: none; border: none; color: #fff; font-size: 2rem; cursor: pointer;
}
.lightbox-caption { color: #ccc; margin-top: 12px; }
</style>
