<template>
  <div class="container page-content">
    <div class="profile-wrapper">
      <h2>👤 Профиль</h2>
      <div v-if="authStore.user" class="profile-info">
        <p><strong>Имя:</strong> {{ authStore.user.username }}</p>
        <p><strong>Email:</strong> {{ authStore.user.email }}</p>
        <p v-if="authStore.user.created_at">
          <strong>Регистрация:</strong> {{ new Date(authStore.user.created_at).toLocaleDateString('ru-RU') }}
        </p>
        <hr />
        <form @submit.prevent="saveProfile" class="profile-form">
          <div class="form-group">
            <label>Имя пользователя</label>
            <input v-model="form.username" type="text" />
          </div>
          <p v-if="error" class="form-error">{{ error }}</p>
          <p v-if="success" class="form-success">{{ success }}</p>
          <button type="submit" class="btn btn-primary" :disabled="saving">
            {{ saving ? 'Сохраняем...' : 'Сохранить' }}
          </button>
        </form>
        <button class="btn btn-ghost" style="margin-top:20px" @click="handleLogout">🚪 Выйти</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth.js'
import { authApi } from '@/api/index.js'

const authStore = useAuthStore()
const router = useRouter()
const saving = ref(false)
const error = ref('')
const success = ref('')
const form = ref({ username: authStore.user?.username || '' })

async function saveProfile() {
  error.value = ''
  success.value = ''
  saving.value = true
  try {
    await authApi.updateProfile(form.value)
    await authStore.fetchProfile()
    success.value = 'Профиль обновлён!'
  } catch (e) {
    error.value = e.response?.data?.error || 'Ошибка сохранения'
  } finally {
    saving.value = false
  }
}

async function handleLogout() {
  await authStore.logout()
  router.push('/')
}

onMounted(() => { authStore.fetchProfile() })
</script>
