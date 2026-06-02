<template>
  <div>
    <p v-if="loading" class="empty-state" style="padding: 80px 20px;">Загружаем альбом...</p>

    <template v-else-if="album">
      <!-- Баннер -->
      <div class="album-page-banner">
        <div class="banner-overlay"></div>
        <div class="banner-glow"></div>
        <div class="banner-content">
          <h1 class="banner-title">💿 {{ album.title }}</h1>
          <p class="banner-subtitle">
            <template v-if="album.releaseDate">📅 {{ new Date(album.releaseDate).getFullYear() }}</template>
            <template v-if="tracks.length"> • 🎵 {{ tracks.length }} треков</template>
          </p>
        </div>
      </div>

      <div class="container page-content album-page">
        <!-- Информация об альбоме -->
        <section class="album-header">
          <div class="album-cover">
            <img :src="album.coverImagePath" :alt="album.title" class="album-cover-image" />
          </div>
          <div class="album-info-section">
            <h2 class="album-title-main">{{ album.title }}</h2>
            <p v-if="album.releaseDate" class="album-release-date">
              📅 Дата релиза: {{ new Date(album.releaseDate).toLocaleDateString('ru-RU') }}
            </p>
            <div class="album-stats">
              <span class="stat">🎵 {{ tracksLoading ? '...' : tracks.length }} треков</span>
            </div>
            <div v-if="album.description" class="album-description">
              <h3>Описание</h3>
              <p>{{ album.description }}</p>
            </div>
            <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:8px;">
              <button class="btn btn-primary" @click="playAll" :disabled="!tracks.length">
                ▶️ Слушать всё
              </button>
              <RouterLink to="/albums" class="back-link">← Все альбомы</RouterLink>
            </div>
          </div>
        </section>

        <!-- Треклист -->
        <section class="album-tracklist">
          <h2 class="tracklist-title">🎵 Треклист</h2>
          <p v-if="tracksLoading" class="empty-tracklist">Загружаем треки...</p>
          <p v-else-if="!tracks.length" class="empty-tracklist">Треки ещё не добавлены</p>

          <div v-else class="tracks-container">
            <div
              v-for="(track, i) in tracks"
              :key="track.id"
              class="track-item"
              :class="{ playing: playerStore.currentTrack?.id === track.id && playerStore.isPlaying }"
            >
              <div class="track-number">{{ String(i + 1).padStart(2, '0') }}</div>

              <div class="track-cover">
                <img :src="track.coverImagePath" :alt="track.title" />
              </div>

              <div class="track-info">
                <h3 class="track-title">{{ track.title }}</h3>
                <p v-if="track.description" class="track-description">{{ track.description }}</p>
                <p v-if="track.duration" class="track-description">
                  ⏱ {{ formatTime(track.duration) }}
                </p>
              </div>

              <div class="track-actions-col">
                <button class="track-play-btn" @click="playTrack(track, i)">
                  {{ playerStore.currentTrack?.id === track.id && playerStore.isPlaying ? '⏸ Пауза' : '▶️ Слушать' }}
                </button>
                <button class="track-queue-btn" @click="addToQueue(track)">➕ В очередь</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </template>

    <p v-else class="empty-state" style="padding:80px 20px;">Альбом не найден</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { albumsApi } from '@/api/index.js'
import { usePlayerStore } from '@/store/player.js'
import { useToastStore } from '@/store/toast.js'

const route = useRoute()
const router = useRouter()
const playerStore = usePlayerStore()
const toast = useToastStore()

const album = ref(null)
const tracks = ref([])
const loading = ref(true)
const tracksLoading = ref(true)

function formatTime(s) {
  if (!s) return '—'
  const m = Math.floor(s / 60)
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

function playTrack(track, i) {
  playerStore.setQueue(tracks.value, i)
  playerStore.isPlaying = true
  router.push('/player')
}

function playAll() {
  if (!tracks.value.length) return
  playerStore.setQueue(tracks.value, 0)
  playerStore.isPlaying = true
  router.push('/player')
}

async function addToQueue(track) {
  await playerStore.addToQueue(track)
  toast.success(`«${track.title}» добавлен в очередь`)
}

onMounted(async () => {
  const id = route.params.id
  try {
    const albumRes = await albumsApi.getById(id)
    album.value = albumRes.data?.data || albumRes.data
  } catch {
    toast.error('Альбом не найден')
  } finally {
    loading.value = false
  }

  try {
    const tracksRes = await albumsApi.getTracks(id)
    tracks.value = tracksRes.data?.data || tracksRes.data || []
  } catch {
    toast.error('Не удалось загрузить треки')
  } finally {
    tracksLoading.value = false
  }
})
</script>
