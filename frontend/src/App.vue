<template>
  <div id="particles-js"></div>
  <!-- Видео подключается только если файл есть на сервере -->
  <video v-if="hasVideo" autoplay muted loop id="background-video">
    <source :src="videoSrc" type="video/mp4" />
  </video>

  <TheHeader />

  <main class="main-content">
    <RouterView />
  </main>

  <TheFooter />
  <ToastContainer />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useThemeStore } from '@/store/theme.js'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import ToastContainer from '@/components/ui/ToastContainer.vue'

const themeStore = useThemeStore()

// Ищем видео в обоих возможных местах
const videoSrc = ref('/assets/videos/background_video.mp4')
const hasVideo = ref(false)

onMounted(() => {
  themeStore.init()

  // Проверяем что видео существует прежде чем рендерить тег
  fetch(videoSrc.value, { method: 'HEAD' })
    .then((r) => { if (r.ok) hasVideo.value = true })
    .catch(() => {})

  // particles.js loaded with defer — retry until available
  const tryParticles = (attempts = 0) => {
    if (window.particlesJS) {
      window.particlesJS.load('particles-js', '/particles-config.json', () => {})
    } else if (attempts < 50) {
      setTimeout(() => tryParticles(attempts + 1), 100)
    }
  }
  tryParticles()
})
</script>

