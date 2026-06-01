<template>
  <div class="container page-content">
    <RouterLink to="/news" class="back-link">← Назад к новостям</RouterLink>
    <p v-if="loading" class="empty-state">Загружаем...</p>
    <article v-else-if="post" class="news-full">
      <h1>{{ post.title }}</h1>
      <div class="news-meta">📅 {{ formatDate(post.created_at) }}</div>
      <div class="news-content" v-html="safeContent"></div>
    </article>
    <p v-else class="empty-state">Новость не найдена</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { newsApi } from '@/api/index.js'

const route = useRoute()
const post = ref(null)
const loading = ref(true)

function formatDate(str) {
  return str ? new Date(str).toLocaleDateString('ru-RU') : ''
}

// Простая безопасная вставка: переносы строк → <br>
const safeContent = computed(() => {
  if (!post.value?.content) return ''
  return post.value.content.replace(/\n/g, '<br />')
})

onMounted(async () => {
  try {
    const res = await newsApi.getById(route.params.id)
    post.value = res.data?.data || res.data
  } finally {
    loading.value = false
  }
})
</script>
