<template>
  <div class="container page-content">
    <p v-if="loading" class="empty-state">Загружаем альбом...</p>
    <template v-else-if="album">
      <div class="album-detail-header">
        <div class="album-detail-cover">
          <img :src="album.coverImagePath" :alt="album.title" />
        </div>
        <div class="album-detail-meta">
          <h1>{{ album.title }}</h1>
          <p v-if="album.releaseDate" class="album-year">
            📅 {{ new Date(album.releaseDate).getFullYear() }}
          </p>
          <p v-if="album.description" class="album-description">{{ album.description }}</p>
          <button class="btn btn-primary" @click="playAll">▶️ Слушать всё</button>
        </div>
      </div>

      <section class="tracklist-section">
        <h2>🎵 Треклист</h2>
        <p v-if="tracksLoading" class="empty-state">Загружаем треки...</p>
        <p v-else-if="!tracks.length" class="empty-state">Треки ещё не добавлены</p>
        <ul v-else class="tracklist">
          <li
            v-for="(track, i) in tracks"
            :key="track.id"
            class="track-item"
            :class="{ playing: playerStore.currentTrack?.id === track.id && playerStore.isPlaying }"
          >
            <span class="track-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="track-info">
              <span class="track-title">{{ track.title }}</span>
              <span class="track-artist" v-if="track.artist">{{ track.artist }}</span>
            </div>
            <span class="track-dur">{{ formatTime(track.duration) }}</span>
            <div class="track-actions">
              <button class="track-play-btn" @click="playTrack(track, i)" title="Играть">
                {{ playerStore.currentTrack?.id === track.id && playerStore.isPlaying ? '⏸' : '▶️' }}
              </button>
              <button class="track-queue-btn" @click="addToQueue(track)" title="В очередь">➕</button>
            </div>
          </li>
        </ul>
      </section>
    </template>
    <p v-else class="empty-state">Альбом не найден</p>
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
    const [albumRes, tracksRes] = await Promise.all([
      albumsApi.getById(id),
      albumsApi.getTracks(id),
    ])
    album.value = albumRes.data?.data || albumRes.data
    tracks.value = tracksRes.data?.data || tracksRes.data || []
  } catch {
    toast.error('Ошибка загрузки альбома')
  } finally {
    loading.value = false
    tracksLoading.value = false
  }
})
</script>
