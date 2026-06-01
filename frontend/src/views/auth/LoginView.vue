<template>
  <div class="container page-content">
    <div class="auth-form-wrapper">
      <h2>🔐 Вход</h2>
      <form class="auth-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="form.email" type="email" required autocomplete="email" />
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input id="password" v-model="form.password" type="password" required autocomplete="current-password" />
        </div>
        <p v-if="error" class="form-error">{{ error }}</p>
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Входим...' : 'Войти' }}
        </button>
      </form>
      <p class="auth-switch">
        Нет аккаунта? <RouterLink to="/register">Зарегистрироваться</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth.js'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const loading = ref(false)
const error = ref('')
const form = ref({ email: '', password: '' })

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await authStore.login(form.value)
    router.push(route.query.redirect || '/')
  } catch (e) {
    error.value = e.response?.data?.error || 'Неверный email или пароль'
  } finally {
    loading.value = false
  }
}
</script>
