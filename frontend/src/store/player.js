import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { playerApi } from '@/api/index.js'

export const usePlayerStore = defineStore('player', () => {
  const queue = ref([])
  const currentIndex = ref(0)
  const isPlaying = ref(false)
  const volume = ref(parseFloat(localStorage.getItem('player_volume') || '0.8'))
  const isMuted = ref(false)
  const isShuffle = ref(false)
  const repeatMode = ref('none') // 'none' | 'one' | 'all'
  const currentTime = ref(0)
  const duration = ref(0)

  const currentTrack = computed(() => queue.value[currentIndex.value] || null)

  function setQueue(tracks, startIndex = 0) {
    queue.value = tracks
    currentIndex.value = startIndex
  }

  function playTrack(track) {
    const idx = queue.value.findIndex((t) => t.id === track.id)
    if (idx >= 0) {
      currentIndex.value = idx
    } else {
      queue.value.push(track)
      currentIndex.value = queue.value.length - 1
    }
    isPlaying.value = true
  }

  function next() {
    if (repeatMode.value === 'one') return
    if (isShuffle.value) {
      currentIndex.value = Math.floor(Math.random() * queue.value.length)
    } else if (currentIndex.value < queue.value.length - 1) {
      currentIndex.value++
    } else if (repeatMode.value === 'all') {
      currentIndex.value = 0
    } else {
      isPlaying.value = false
    }
  }

  function prev() {
    if (currentTime.value > 3) {
      currentTime.value = 0
      return
    }
    if (currentIndex.value > 0) {
      currentIndex.value--
    } else if (repeatMode.value === 'all') {
      currentIndex.value = queue.value.length - 1
    }
  }

  function togglePlay() {
    isPlaying.value = !isPlaying.value
  }

  function toggleMute() {
    isMuted.value = !isMuted.value
  }

  function toggleShuffle() {
    isShuffle.value = !isShuffle.value
  }

  function cycleRepeat() {
    const modes = ['none', 'all', 'one']
    const idx = modes.indexOf(repeatMode.value)
    repeatMode.value = modes[(idx + 1) % modes.length]
  }

  function setVolume(val) {
    volume.value = Math.max(0, Math.min(1, val))
    localStorage.setItem('player_volume', volume.value)
    isMuted.value = false
  }

  async function addToQueue(track) {
    try {
      await playerApi.addToQueue(track.id)
      queue.value.push(track)
    } catch {
      queue.value.push(track)
    }
  }

  return {
    queue, currentIndex, isPlaying, volume, isMuted, isShuffle, repeatMode,
    currentTime, duration, currentTrack,
    setQueue, playTrack, next, prev, togglePlay, toggleMute, toggleShuffle,
    cycleRepeat, setVolume, addToQueue,
  }
})
