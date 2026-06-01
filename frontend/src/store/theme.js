import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const THEMES = ['power-metal', 'gothic-metal', 'literary-dark', 'punk-rock']

export const useThemeStore = defineStore('theme', () => {
  const current = ref(localStorage.getItem('site_bg_theme') || 'power-metal')
  let styleEl = null

  function applyTheme(name) {
    if (styleEl) styleEl.remove()
    styleEl = document.createElement('link')
    styleEl.rel = 'stylesheet'
    styleEl.href = `/assets/css/themes/${name}/main.css`
    document.head.appendChild(styleEl)
    document.body.setAttribute('data-theme', name)
  }

  function setTheme(name) {
    if (!THEMES.includes(name)) return
    current.value = name
    localStorage.setItem('site_bg_theme', name)
    applyTheme(name)
  }

  function nextTheme() {
    const idx = THEMES.indexOf(current.value)
    setTheme(THEMES[(idx + 1) % THEMES.length])
  }

  function init() {
    applyTheme(current.value)
  }

  return { current, themes: THEMES, setTheme, nextTheme, init }
})
