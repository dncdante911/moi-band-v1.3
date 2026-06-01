<template>
  <div class="container page-content">
    <div class="section-header">
      <h2 class="section-title">📰 Новости</h2>
      <div class="title-underline"></div>
    </div>

    <p v-if="loading" class="empty-state">Загружаем новости...</p>
    <div v-else-if="news.length" class="news-grid">
      <article v-for="post in news" :key="post.id" class="news-card">
        <div class="news-card-header">
          <div class="news-date">📅 {{ formatDate(post.created_at) }}</div>
        </div>
        <h3 class="news-title">{{ post.title }}</h3>
        <p class="news-excerpt">{{ post.content?.substring(0, 200) }}...</p>
        <RouterLink :to="`/news/${post.id}`" class="news-link">Читать далее →</RouterLink>
      </article>
    </div>
    <p v-else class="empty-state">Новостей пока нет</p>

    <div v-if="hasMore" class="load-more">
      <button class="btn" @click="loadMore" :disabled="loadingMore">
        {{ loadingMore ? 'Загружаем...' : 'Загрузить ещё' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { newsApi } from '@/api/index.js'

const news = ref([])
const loading = ref(true)
const loadingMore = ref(false)
const hasMore = ref(false)
const limit = 9

function formatDate(str) {
  return str ? new Date(str).toLocaleDateString('ru-RU') : ''
}

async function fetchNews(offset = 0) {
  const res = await newsApi.getAll(limit + 1, offset)
  const items = res.data?.data || res.data || []
  hasMore.value = items.length > limit
  return items.slice(0, limit)
}

async function loadMore() {
  loadingMore.value = true
  try {
    const more = await fetchNews(news.value.length)
    news.value.push(...more)
  } finally {
    loadingMore.value = false
  }
}

onMounted(async () => {
  try { news.value = await fetchNews() }
  finally { loading.value = false }
})
</script>
