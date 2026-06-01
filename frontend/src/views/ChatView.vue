<template>
  <div class="container page-content">
    <div class="chat-layout">
      <!-- Список комнат -->
      <aside class="chat-rooms">
        <h3>💬 Комнаты</h3>
        <ul class="room-list">
          <li
            v-for="room in rooms"
            :key="room.id"
            class="room-item"
            :class="{ active: currentRoom?.id === room.id }"
            @click="selectRoom(room)"
          >
            <span class="room-name">{{ room.name }}</span>
            <span class="room-count" v-if="room.user_count">{{ room.user_count }}</span>
          </li>
        </ul>
        <button class="btn btn-sm" @click="showCreateRoom = true">+ Создать комнату</button>
      </aside>

      <!-- Сообщения -->
      <section class="chat-messages-area">
        <div v-if="!currentRoom" class="chat-empty">
          Выберите комнату для общения
        </div>
        <template v-else>
          <div class="chat-header">
            <h3>{{ currentRoom.name }}</h3>
          </div>
          <div class="messages-scroll" ref="messagesEl">
            <div
              v-for="msg in messages"
              :key="msg.id"
              class="message"
              :class="{ own: msg.user_id === authStore.user?.id }"
            >
              <div class="message-meta">
                <span class="message-author">{{ msg.username }}</span>
                <span class="message-time">{{ formatTime(msg.created_at) }}</span>
              </div>
              <div class="message-body">{{ msg.message }}</div>
            </div>
            <div v-if="typingUsers.length" class="typing-indicator">
              {{ typingUsers.join(', ') }} печатает...
            </div>
          </div>
          <form class="chat-input-form" @submit.prevent="sendMessage">
            <input
              v-model="newMessage"
              type="text"
              placeholder="Ваше сообщение..."
              maxlength="500"
              @input="onTyping"
            />
            <button type="submit" :disabled="!newMessage.trim()">Отправить ➤</button>
          </form>
        </template>
      </section>
    </div>

    <!-- Модал создания комнаты -->
    <div v-if="showCreateRoom" class="modal-overlay" @click.self="showCreateRoom = false">
      <div class="modal">
        <h3>Новая комната</h3>
        <input v-model="newRoomName" type="text" placeholder="Название комнаты" />
        <div class="modal-actions">
          <button class="btn" @click="createRoom">Создать</button>
          <button class="btn btn-ghost" @click="showCreateRoom = false">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { chatApi } from '@/api/index.js'
import { useAuthStore } from '@/store/auth.js'
import { useToastStore } from '@/store/toast.js'

const authStore = useAuthStore()
const toast = useToastStore()

const rooms = ref([])
const currentRoom = ref(null)
const messages = ref([])
const newMessage = ref('')
const newRoomName = ref('')
const showCreateRoom = ref(false)
const messagesEl = ref(null)
const typingUsers = ref([])
let pollInterval = null
let typingTimeout = null

function formatTime(str) {
  if (!str) return ''
  return new Date(str).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}

async function loadRooms() {
  try {
    const res = await chatApi.getRooms()
    rooms.value = res.data?.data || []
  } catch {
    toast.error('Не удалось загрузить комнаты')
  }
}

async function selectRoom(room) {
  currentRoom.value = room
  messages.value = []
  await loadMessages()
}

async function loadMessages() {
  if (!currentRoom.value) return
  try {
    const res = await chatApi.getMessages(currentRoom.value.id)
    messages.value = res.data?.data || []
    await nextTick()
    scrollToBottom()
  } catch {}
}

function scrollToBottom() {
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
}

async function sendMessage() {
  const text = newMessage.value.trim()
  if (!text) return
  newMessage.value = ''
  try {
    await chatApi.sendMessage({ room_id: currentRoom.value.id, message: text })
    await loadMessages()
  } catch {
    toast.error('Ошибка отправки сообщения')
    newMessage.value = text
  }
}

function onTyping() {
  if (!currentRoom.value) return
  chatApi.sendTyping(currentRoom.value.id).catch(() => {})
  clearTimeout(typingTimeout)
  typingTimeout = setTimeout(() => {}, 3000)
}

async function createRoom() {
  if (!newRoomName.value.trim()) return
  try {
    await chatApi.createRoom({ name: newRoomName.value.trim() })
    newRoomName.value = ''
    showCreateRoom.value = false
    await loadRooms()
    toast.success('Комната создана!')
  } catch {
    toast.error('Ошибка создания комнаты')
  }
}

onMounted(async () => {
  await loadRooms()
  pollInterval = setInterval(loadMessages, 3000)
})

onUnmounted(() => {
  clearInterval(pollInterval)
  clearTimeout(typingTimeout)
})
</script>
