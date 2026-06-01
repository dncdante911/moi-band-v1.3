import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '@/api/index.js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('jwt_token'))

  const isLoggedIn = computed(() => !!token.value && !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  async function login(credentials) {
    const res = await authApi.login(credentials)
    token.value = res.data.token
    user.value = res.data.user
    localStorage.setItem('jwt_token', token.value)
    return res.data
  }

  async function register(data) {
    const res = await authApi.register(data)
    token.value = res.data.token
    user.value = res.data.user
    localStorage.setItem('jwt_token', token.value)
    return res.data
  }

  async function logout() {
    try { await authApi.logout() } catch {}
    token.value = null
    user.value = null
    localStorage.removeItem('jwt_token')
  }

  async function fetchProfile() {
    if (!token.value) return
    try {
      const res = await authApi.getProfile()
      user.value = res.data.user
    } catch {
      token.value = null
      localStorage.removeItem('jwt_token')
    }
  }

  return { user, token, isLoggedIn, isAdmin, login, register, logout, fetchProfile }
})
