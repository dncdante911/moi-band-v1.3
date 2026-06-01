<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast"
          :class="`toast--${toast.type}`"
          @click="remove(toast.id)"
        >
          {{ toast.message }}
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { useToastStore } from '@/store/toast.js'
import { storeToRefs } from 'pinia'

const store = useToastStore()
const { toasts } = storeToRefs(store)
const remove = store.remove
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.toast {
  padding: 12px 20px;
  border-radius: 8px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  min-width: 200px;
  max-width: 350px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}
.toast--success { background: #28a745; }
.toast--error   { background: #dc3545; }
.toast--info    { background: #17a2b8; }
.toast--warn    { background: #ffc107; color: #000; }
.toast-enter-active, .toast-leave-active { transition: all 0.3s; }
.toast-enter-from { opacity: 0; transform: translateX(50px); }
.toast-leave-to   { opacity: 0; transform: translateX(50px); }
</style>
