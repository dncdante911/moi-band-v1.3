import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([])
  let seq = 0

  function add(message, type = 'info', duration = 3500) {
    const id = ++seq
    toasts.value.push({ id, message, type })
    setTimeout(() => remove(id), duration)
  }

  function remove(id) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  return {
    toasts,
    remove,
    success: (msg) => add(msg, 'success'),
    error: (msg) => add(msg, 'error'),
    info: (msg) => add(msg, 'info'),
    warn: (msg) => add(msg, 'warn'),
  }
})
