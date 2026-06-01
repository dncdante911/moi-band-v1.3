<template>
  <header class="site-header">
    <div class="container header-container">
      <div class="logo">
        <RouterLink to="/">{{ siteName }}</RouterLink>
      </div>

      <button
        class="hamburger-menu"
        :aria-expanded="menuOpen"
        aria-label="Открыть меню"
        @click="toggleMenu"
      >
        {{ menuOpen ? '✕' : '☰' }}
      </button>

      <nav class="main-nav" :class="{ active: menuOpen }" aria-label="Главная навигация">
        <ul>
          <li><RouterLink to="/" class="nav-link" @click="closeMenu">🏠 Главная</RouterLink></li>
          <li><RouterLink to="/albums" class="nav-link" @click="closeMenu">💿 Альбомы</RouterLink></li>
          <li><RouterLink to="/player" class="nav-link" @click="closeMenu">🎵 Плеер</RouterLink></li>
          <li><RouterLink to="/about" class="nav-link" @click="closeMenu">ℹ️ О проекте</RouterLink></li>
          <li><RouterLink to="/news" class="nav-link" @click="closeMenu">📰 Новости</RouterLink></li>
          <li><RouterLink to="/gallery" class="nav-link" @click="closeMenu">🖼️ Галерея</RouterLink></li>
          <template v-if="authStore.isLoggedIn">
            <li><RouterLink to="/chat" class="nav-link" @click="closeMenu">💬 Чат</RouterLink></li>
            <li><RouterLink to="/profile" class="nav-link" @click="closeMenu">👤 Профиль</RouterLink></li>
            <li>
              <button class="nav-link nav-btn" @click="handleLogout">🚪 Выход</button>
            </li>
          </template>
          <template v-else>
            <li><RouterLink to="/login" class="nav-link" @click="closeMenu">🔐 Вход</RouterLink></li>
            <li><RouterLink to="/register" class="nav-link" @click="closeMenu">✍️ Регистрация</RouterLink></li>
          </template>
          <li>
            <button class="nav-link nav-btn theme-btn" :title="`Тема: ${themeStore.current}`" @click="themeStore.nextTheme()">
              🎨
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth.js'
import { useThemeStore } from '@/store/theme.js'

const authStore = useAuthStore()
const themeStore = useThemeStore()
const router = useRouter()
const menuOpen = ref(false)
const siteName = 'Master of Illusion'

function toggleMenu() { menuOpen.value = !menuOpen.value }
function closeMenu() { menuOpen.value = false }

async function handleLogout() {
  closeMenu()
  await authStore.logout()
  router.push('/')
}

function handleOutsideClick(e) {
  if (!e.target.closest('.site-header')) closeMenu()
}

onMounted(() => document.addEventListener('click', handleOutsideClick))
onUnmounted(() => document.removeEventListener('click', handleOutsideClick))
</script>
