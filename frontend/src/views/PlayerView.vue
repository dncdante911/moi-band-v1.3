<template>
  <div class="container page-content">
    <div id="epic-player" class="epic-player">
      <!-- === ЛЕВАЯ ПАНЕЛЬ — ОЧЕРЕДЬ === -->
      <aside class="player-sidebar">
        <h3 class="sidebar-title">🎵 Очередь воспроизведения</h3>
        <ul class="queue-list">
          <li
            v-for="(track, i) in playerStore.queue"
            :key="track.id"
            class="queue-item"
            :class="{ active: i === playerStore.currentIndex }"
            @click="playerStore.currentIndex = i"
          >
            <span class="queue-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="queue-info">
              <span class="queue-title">{{ track.title }}</span>
              <span class="queue-artist">{{ track.artist }}</span>
            </div>
            <span class="queue-dur">{{ formatTime(track.duration) }}</span>
          </li>
          <li v-if="!playerStore.queue.length" class="queue-empty">
            Очередь пуста. Добавьте треки с&nbsp;
            <RouterLink to="/albums">страницы альбомов</RouterLink>
          </li>
        </ul>
      </aside>

      <!-- === ГЛАВНАЯ ПАНЕЛЬ ПЛЕЕРА === -->
      <section class="player-main">
        <!-- Обложка и метаданные -->
        <div class="player-artwork-area">
          <div class="player-artwork-frame">
            <img
              v-if="current?.cover"
              :src="current.cover"
              :alt="current.title"
              class="player-artwork"
            />
            <div v-else class="player-artwork-placeholder">🎵</div>
          </div>
        </div>

        <div class="player-track-info">
          <h2 class="track-title">{{ current?.title || 'Нет трека' }}</h2>
          <p class="track-artist">{{ current?.artist || '—' }}</p>
          <p class="track-album" v-if="current?.album">{{ current.album }}</p>
        </div>

        <!-- Реакции -->
        <div class="player-reactions" v-if="current">
          <button
            class="reaction-btn"
            :class="{ active: reaction === 'like' }"
            @click="sendReaction('like')"
          >👍 {{ reactionCounts.likes }}</button>
          <button
            class="reaction-btn"
            :class="{ active: reaction === 'dislike' }"
            @click="sendReaction('dislike')"
          >👎 {{ reactionCounts.dislikes }}</button>
          <button class="reaction-btn" @click="showLyrics = !showLyrics">📝 Текст</button>
        </div>

        <!-- Прогресс -->
        <div class="player-progress">
          <span class="time-current">{{ formatTime(playerStore.currentTime) }}</span>
          <div class="progress-bar" @click="seek">
            <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
          </div>
          <span class="time-duration">{{ formatTime(playerStore.duration) }}</span>
        </div>

        <!-- Управление -->
        <div class="player-controls">
          <button
            class="ctrl-btn"
            :class="{ active: playerStore.isShuffle }"
            title="Перемешать"
            @click="playerStore.toggleShuffle()"
          >🔀</button>
          <button class="ctrl-btn ctrl-prev" title="Назад" @click="playerStore.prev()">⏮</button>
          <button
            class="ctrl-btn ctrl-play"
            :title="playerStore.isPlaying ? 'Пауза' : 'Играть'"
            @click="playerStore.togglePlay()"
          >
            {{ playerStore.isPlaying ? '⏸' : '▶️' }}
          </button>
          <button class="ctrl-btn ctrl-next" title="Вперёд" @click="playerStore.next()">⏭</button>
          <button
            class="ctrl-btn"
            :class="{ active: playerStore.repeatMode !== 'none' }"
            :title="`Повтор: ${playerStore.repeatMode}`"
            @click="playerStore.cycleRepeat()"
          >
            {{ playerStore.repeatMode === 'one' ? '🔂' : '🔁' }}
          </button>
        </div>

        <!-- Громкость -->
        <div class="player-volume">
          <button class="ctrl-btn" @click="playerStore.toggleMute()">
            {{ playerStore.isMuted ? '🔇' : '🔊' }}
          </button>
          <input
            type="range" min="0" max="1" step="0.01"
            :value="playerStore.isMuted ? 0 : playerStore.volume"
            class="volume-slider"
            @input="(e) => playerStore.setVolume(parseFloat(e.target.value))"
          />
        </div>

        <!-- Эквалайзер -->
        <div class="player-eq">
          <h4>🎚️ Эквалайзер</h4>
          <div class="eq-presets">
            <button
              v-for="preset in eqPresets"
              :key="preset.id"
              class="eq-preset-btn"
              :class="{ active: currentPreset === preset.id }"
              @click="applyPreset(preset)"
            >{{ preset.name }}</button>
          </div>
          <div class="eq-bands">
            <div v-for="(band, i) in eqValues" :key="i" class="eq-band">
              <label>{{ eqLabels[i] }}</label>
              <input
                type="range" min="-12" max="12" step="1"
                :value="band"
                class="eq-slider"
                @input="(e) => updateEqBand(i, parseFloat(e.target.value))"
              />
              <span>{{ band > 0 ? '+' : '' }}{{ band }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Текст песни -->
      <Transition name="lyrics">
        <div v-if="showLyrics" class="player-lyrics">
          <h3>📝 Текст песни</h3>
          <p v-if="lyricsLoading">Загружаем текст...</p>
          <pre v-else-if="lyrics" class="lyrics-text">{{ lyrics }}</pre>
          <p v-else>Текст песни недоступен</p>
        </div>
      </Transition>
    </div>

    <!-- Скрытый audio элемент -->
    <audio
      ref="audioEl"
      :src="audioSrc"
      :volume="playerStore.isMuted ? 0 : playerStore.volume"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onMetadata"
      @ended="playerStore.next()"
      @error="onError"
    ></audio>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { usePlayerStore } from '@/store/player.js'
import { playerApi } from '@/api/index.js'
import { useToastStore } from '@/store/toast.js'

const playerStore = usePlayerStore()
const toast = useToastStore()
const audioEl = ref(null)

const showLyrics = ref(false)
const lyrics = ref('')
const lyricsLoading = ref(false)
const reaction = ref(null)
const reactionCounts = ref({ likes: 0, dislikes: 0 })
const currentPreset = ref('flat')

const eqLabels = ['32Hz', '64Hz', '125Hz', '250Hz', '500Hz', '1kHz', '2kHz', '4kHz', '8kHz', '16kHz']
const eqValues = ref(new Array(10).fill(0))

const eqPresets = [
  { id: 'flat', name: 'Flat', values: [0,0,0,0,0,0,0,0,0,0] },
  { id: 'metal', name: 'Metal', values: [4,3,0,-2,-1,0,2,4,5,5] },
  { id: 'bass', name: 'Bass Boost', values: [6,5,4,2,0,0,0,0,0,0] },
  { id: 'vocal', name: 'Vocal', values: [-2,-1,0,2,4,4,3,1,0,-1] },
  { id: 'punk', name: 'Punk', values: [5,3,0,-1,0,2,3,4,4,5] },
]

const current = computed(() => playerStore.currentTrack)
const audioSrc = computed(() => current.value ? playerApi.streamUrl(current.value.id) : '')
const progressPercent = computed(() => {
  if (!playerStore.duration) return 0
  return (playerStore.currentTime / playerStore.duration) * 100
})

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${String(sec).padStart(2, '0')}`
}

function seek(e) {
  if (!audioEl.value || !playerStore.duration) return
  const rect = e.currentTarget.getBoundingClientRect()
  const ratio = (e.clientX - rect.left) / rect.width
  audioEl.value.currentTime = ratio * playerStore.duration
}

function onTimeUpdate() {
  if (audioEl.value) playerStore.currentTime = audioEl.value.currentTime
}

function onMetadata() {
  if (audioEl.value) playerStore.duration = audioEl.value.duration
}

function onError() {
  toast.error('Ошибка воспроизведения трека')
}

function applyPreset(preset) {
  currentPreset.value = preset.id
  eqValues.value = [...preset.values]
}

function updateEqBand(i, val) {
  eqValues.value[i] = val
  currentPreset.value = 'custom'
}

async function sendReaction(type) {
  if (!current.value) return
  try {
    await playerApi.reaction(current.value.id, type)
    reaction.value = reaction.value === type ? null : type
    await loadStats()
  } catch {
    toast.error('Не удалось отправить реакцию')
  }
}

async function loadStats() {
  if (!current.value) return
  try {
    const res = await playerApi.getStats(current.value.id)
    reactionCounts.value = res.data?.data || { likes: 0, dislikes: 0 }
  } catch {}
}

async function loadLyrics() {
  if (!current.value || !showLyrics.value) return
  lyricsLoading.value = true
  try {
    const res = await playerApi.getLyrics(current.value.id)
    lyrics.value = res.data?.data?.lyrics || ''
  } catch {
    lyrics.value = ''
  } finally {
    lyricsLoading.value = false
  }
}

watch(() => playerStore.isPlaying, (playing) => {
  if (!audioEl.value) return
  if (playing) audioEl.value.play().catch(() => playerStore.isPlaying = false)
  else audioEl.value.pause()
})

watch(() => playerStore.currentIndex, async () => {
  reaction.value = null
  lyrics.value = ''
  await loadStats()
  if (showLyrics.value) await loadLyrics()
  if (playerStore.isPlaying && audioEl.value) {
    audioEl.value.load()
    audioEl.value.play().catch(() => {})
  }
  if (current.value) playerApi.logView(current.value.id).catch(() => {})
})

watch(showLyrics, (val) => { if (val) loadLyrics() })

onMounted(async () => {
  if (!playerStore.queue.length) {
    try {
      const res = await playerApi.getQueue()
      const tracks = res.data?.data || []
      if (tracks.length) playerStore.setQueue(tracks)
    } catch {}
  }
  loadStats()
})
</script>
