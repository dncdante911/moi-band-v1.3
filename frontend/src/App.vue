<template>
  <div id="particles-js"></div>
  <video autoplay muted loop id="background-video">
    <source src="/assets/videos/background_video.mp4" type="video/mp4" />
  </video>

  <TheHeader />

  <main class="main-content">
    <RouterView />
  </main>

  <TheFooter />
  <ToastContainer />
</template>

<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from '@/store/theme.js'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import ToastContainer from '@/components/ui/ToastContainer.vue'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.init()
  if (window.particlesJS) {
    window.particlesJS.load('particles-js', '/assets/js/particles-config.json', () => {})
  }
})
</script>
