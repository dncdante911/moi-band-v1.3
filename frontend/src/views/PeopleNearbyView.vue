<template>
  <div class="container page-content">
    <div class="nearby-layout">
      <!-- Left: controls + user list -->
      <aside class="nearby-sidebar">
        <div class="nearby-header">
          <h2>📍 Люди рядом</h2>
          <p class="nearby-subtitle">Пользователи в радиусе {{ radiusLabel }}</p>
        </div>

        <!-- Radius selector -->
        <div class="radius-selector">
          <label>Радиус поиска</label>
          <div class="radius-options">
            <button
              v-for="opt in radiusOptions"
              :key="opt.value"
              class="radius-btn"
              :class="{ active: radius === opt.value }"
              @click="setRadius(opt.value)"
            >{{ opt.label }}</button>
          </div>
        </div>

        <!-- Geo status -->
        <div v-if="geoError" class="geo-error">
          <span class="geo-error-icon">📵</span>
          <div>
            <strong>Нет доступа к геолокации</strong>
            <p>Разрешите доступ к местоположению в настройках браузера и обновите страницу.</p>
          </div>
          <button class="btn btn-sm" @click="requestGeo">Повторить</button>
        </div>
        <div v-else-if="geoLoading" class="geo-status loading">
          <span>⏳ Определяем местоположение...</span>
        </div>
        <div v-else-if="userCoords" class="geo-status ok">
          <span>✅ Местоположение получено</span>
          <button class="btn btn-sm" @click="refresh">Обновить</button>
        </div>

        <!-- Users list -->
        <div class="nearby-users-list">
          <div v-if="loading" class="nearby-loading">Загрузка...</div>
          <template v-else-if="filteredUsers.length">
            <div
              v-for="user in filteredUsers"
              :key="user.id"
              class="nearby-user-card"
              :class="{ selected: selectedUser?.id === user.id }"
              @click="selectUser(user)"
            >
              <div class="nearby-user-avatar">
                <img v-if="user.avatar_path" :src="user.avatar_path" :alt="user.username" />
                <div v-else class="avatar-initials">{{ (user.username || '?')[0].toUpperCase() }}</div>
                <span class="status-dot" :class="user.status"></span>
              </div>
              <div class="nearby-user-info">
                <span class="nearby-user-name">
                  {{ user.display_name || user.username }}
                  <span v-if="user.is_admin" class="badge-admin">ADM</span>
                  <span v-if="user.is_verified" class="badge-verified">✓</span>
                </span>
                <span class="nearby-user-seen">{{ user.last_seen_text }}</span>
                <span v-if="user.bio" class="nearby-user-bio">{{ truncate(user.bio, 60) }}</span>
              </div>
            </div>
          </template>
          <div v-else class="nearby-empty">
            <p>😔 Никого нет рядом</p>
            <p class="hint">Попробуйте увеличить радиус поиска</p>
          </div>
        </div>
      </aside>

      <!-- Right: selected user or placeholder -->
      <section class="nearby-main">
        <div v-if="!selectedUser" class="nearby-placeholder">
          <span class="placeholder-icon">💬</span>
          <p>Выберите пользователя из списка,<br>чтобы начать общение</p>
        </div>
        <div v-else class="nearby-profile">
          <div class="profile-avatar-wrap">
            <img v-if="selectedUser.avatar_path" :src="selectedUser.avatar_path" class="profile-avatar" :alt="selectedUser.username" />
            <div v-else class="profile-avatar-placeholder">{{ (selectedUser.username || '?')[0].toUpperCase() }}</div>
            <span class="profile-status-dot" :class="selectedUser.status"></span>
          </div>
          <div class="profile-name">
            {{ selectedUser.display_name || selectedUser.username }}
            <span v-if="selectedUser.is_admin" class="badge-admin">ADM</span>
            <span v-if="selectedUser.is_verified" class="badge-verified">✓</span>
          </div>
          <div class="profile-status-text">{{ statusLabel(selectedUser.status) }}</div>
          <div v-if="selectedUser.bio" class="profile-bio">{{ selectedUser.bio }}</div>
          <div class="profile-stats">
            <div class="stat">
              <span class="stat-val">{{ selectedUser.messages_today }}</span>
              <span class="stat-lbl">сообщений сегодня</span>
            </div>
            <div class="stat">
              <span class="stat-val">{{ selectedUser.last_seen_text }}</span>
              <span class="stat-lbl">последний визит</span>
            </div>
          </div>
          <RouterLink :to="`/chat`" class="btn">Написать в чате</RouterLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { authApi } from '@/api/index.js'

const radiusOptions = [
  { label: '1 км',   value: 1 },
  { label: '5 км',   value: 5 },
  { label: '25 км',  value: 25 },
  { label: '100 км', value: 100 },
]

const radius = ref(25)
const radiusLabel = computed(() => radiusOptions.find(o => o.value === radius.value)?.label ?? '')

const allUsers = ref([])
const loading = ref(false)
const selectedUser = ref(null)

const userCoords = ref(null)
const geoLoading = ref(false)
const geoError = ref(false)

const filteredUsers = computed(() => allUsers.value)

function truncate(text, max) {
  if (!text) return ''
  return text.length > max ? text.slice(0, max) + '…' : text
}

function statusLabel(s) {
  return s === 'online' ? 'В сети' : s === 'away' ? 'Отошёл' : 'Не в сети'
}

function setRadius(val) {
  radius.value = val
  selectedUser.value = null
}

function selectUser(user) {
  selectedUser.value = selectedUser.value?.id === user.id ? null : user
}

async function loadUsers() {
  loading.value = true
  try {
    const res = await authApi.getOnlineStatus()
    allUsers.value = res.data?.users || []
  } catch {
    allUsers.value = []
  } finally {
    loading.value = false
  }
}

function requestGeo() {
  geoError.value = false
  geoLoading.value = true
  if (!navigator.geolocation) {
    geoError.value = true
    geoLoading.value = false
    return
  }
  navigator.geolocation.getCurrentPosition(
    pos => {
      userCoords.value = { lat: pos.coords.latitude, lng: pos.coords.longitude }
      geoLoading.value = false
    },
    () => {
      geoError.value = true
      geoLoading.value = false
    },
    { timeout: 8000 }
  )
}

async function refresh() {
  await loadUsers()
}

onMounted(() => {
  loadUsers()
  requestGeo()
})
</script>
