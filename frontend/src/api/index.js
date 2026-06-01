import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

// Добавляем JWT токен к каждому запросу
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Обрабатываем 401 (сессия истекла)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('jwt_token')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export const authApi = {
  login: (data) => api.post('/api/user/login.php', data),
  register: (data) => api.post('/api/user/register.php', data),
  logout: () => api.post('/api/user/logout.php'),
  getProfile: () => api.get('/api/user/profile.php'),
  updateProfile: (data) => api.post('/api/user/profile.php', data),
  getOnlineStatus: () => api.get('/api/user/online-v2.php'),
}

export const albumsApi = {
  getAll: () => api.get('/api/albums.php'),
  getById: (id) => api.get(`/api/albums.php?id=${id}`),
  getTracks: (albumId) => api.get(`/api/albums.php?album_id=${albumId}&tracks=1`),
}

export const playerApi = {
  getQueue: () => api.get('/api/player/queue.php'),
  addToQueue: (trackId) => api.post('/api/player/queue.php', { track_id: trackId }),
  clearQueue: () => api.delete('/api/player/queue.php'),
  streamUrl: (trackId) => `/api/player/stream.php?id=${trackId}`,
  getLyrics: (trackId) => api.get(`/api/player/lyrics.php?track_id=${trackId}`),
  reaction: (trackId, type) => api.post('/api/player/track-reaction.php', { track_id: trackId, type }),
  getStats: (trackId) => api.get(`/api/player/track-stats.php?track_id=${trackId}`),
  logView: (trackId) => api.post('/api/player/track-view.php', { track_id: trackId }),
  getPlaylists: () => api.get('/api/player/playlists.php'),
  managePlaylists: (data) => api.post('/api/player/playlist-manage.php', data),
  addToPlaylist: (data) => api.post('/api/player/add-to-playlist.php', data),
}

export const newsApi = {
  getAll: (limit = 10, offset = 0) => api.get(`/api/news.php?limit=${limit}&offset=${offset}`),
  getById: (id) => api.get(`/api/news.php?id=${id}`),
}

export const chatApi = {
  getRooms: () => api.get('/api/chat/rooms-v2.php'),
  createRoom: (data) => api.post('/api/chat/rooms-v2.php', data),
  getMessages: (roomId) => api.get(`/api/chat/messages-v2.php?room_id=${roomId}`),
  sendMessage: (data) => api.post('/api/chat/send-v2.php', data),
  editMessage: (data) => api.put('/api/chat/edit-v2.php', data),
  deleteMessage: (id) => api.delete(`/api/chat/delete-v2.php?id=${id}`),
  sendTyping: (roomId) => api.post('/api/chat/typing-v2.php', { room_id: roomId }),
}

export const galleryApi = {
  getAll: () => api.get('/api/gallery.php'),
}

export const heroApi = {
  getSettings: () => api.get('/api/hero-settings.php'),
}

export default api
