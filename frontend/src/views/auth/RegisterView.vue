<template>
  <div class="container page-content">
    <div class="auth-form-wrapper">
      <h2>✍️ Регистрация</h2>
      <form class="auth-form" @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">Имя пользователя</label>
          <input id="username" v-model="form.username" type="text" required minlength="3" maxlength="30" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="form.email" type="email" required autocomplete="email" />
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input id="password" v-model="form.password" type="password" required minlength="8" autocomplete="new-password" />
        </div>
        <div class="form-group">
          <label for="password2">Подтвердите пароль</label>
          <input id="password2" v-model="form.password2" type="password" required autocomplete="new-password" />
        </div>
        <p v-if="error" class="form-error">{{ error }}</p>
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Регистрируем...' : 'Зарегистрироваться' }}
        </button>
      </form>
      <p class="auth-switch">
        Уже есть аккаунт? <RouterLink to="/login">Войти</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth.js'

const authStore = useAuthStore()
const router = useRouter()
const loading = ref(false)
const error = ref('')
const form = ref({ username: '', email: '', password: '', password2: '' })

async function handleRegister() {
  error.value = ''
  if (form.value.password !== form.value.password2) {
    error.value = 'Пароли не совпадают'
    return
  }
  loading.value = true
  try {
    await authStore.register(form.value)
    router.push('/')
  } catch (e) {
    error.value = e.response?.data?.error || 'Ошибка регистрации'
  } finally {
    loading.value = false
  }
}
</script>
