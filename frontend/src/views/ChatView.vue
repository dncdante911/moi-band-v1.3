<template>
  <div class="container page-content">
    <div class="chat-container">
      <div class="chat-wrapper">
        <!-- Rooms sidebar -->
        <aside class="chat-sidebar">
          <h3>💬 Комнаты</h3>
          <ul class="rooms-list">
            <li v-for="room in rooms" :key="room.id">
              <a href="#" class="room-link" :class="{ active: currentRoom?.id === room.id }" @click.prevent="selectRoom(room)">
                <span class="room-icon">{{ room.icon || '💬' }}</span>
                <span class="room-name">{{ room.name }}</span>
                <span v-if="room.user_count" class="room-badge">{{ room.user_count }}</span>
              </a>
            </li>
          </ul>
          <button class="btn btn-sm create-room-btn" @click="showCreateRoom = true">+ Создать</button>
        </aside>

        <!-- Main messages area -->
        <section class="chat-main">
          <div v-if="!currentRoom" class="empty-messages">
            <p>💬</p>
            <p>Выберите комнату для общения</p>
          </div>
          <template v-else>
            <div class="chat-header">
              <h2>
                <span class="room-icon">{{ currentRoom.icon || '💬' }}</span>
                {{ currentRoom.name }}
              </h2>
              <p v-if="currentRoom.description" class="room-description">{{ currentRoom.description }}</p>
            </div>

            <div class="chat-messages" ref="messagesEl">
              <div v-for="msg in messages" :key="msg.id" class="message">
                <div class="message-avatar">
                  <img v-if="msg.avatar_path" :src="msg.avatar_path" :alt="msg.username" />
                  <div v-else class="avatar-placeholder">{{ (msg.username || '?')[0].toUpperCase() }}</div>
                </div>
                <div class="message-content">
                  <div class="message-header">
                    <span class="username">
                      {{ msg.display_name || msg.username }}
                      <span v-if="msg.is_admin" class="badge-admin">ADM</span>
                      <span v-if="msg.is_verified" class="badge-verified">✓</span>
                    </span>
                    <span v-if="msg.is_edited" class="edited">(ред.)</span>
                    <span class="timestamp">{{ msg.timestamp }}</span>
                  </div>

                  <!-- Reply context -->
                  <div v-if="msg.reply_to" class="reply-context">
                    <span class="reply-author">{{ msg.reply_to.username }}</span>:
                    <span class="reply-text">{{ truncate(msg.reply_to.message, 80) }}</span>
                  </div>

                  <!-- Message text with clickable links -->
                  <p class="message-text" v-html="formatMessage(msg.message)"></p>

                  <!-- Sticker / image attachment -->
                  <div v-if="msg.attachment" class="msg-attachment">
                    <img
                      v-if="['sticker', 'image'].includes(msg.attachment.type)"
                      :src="msg.attachment.url"
                      :class="msg.attachment.type === 'sticker' ? 'msg-sticker' : 'msg-image'"
                      alt=""
                      loading="lazy"
                      @error="$event.target.classList.add('img-error')"
                    />
                    <a v-else-if="msg.attachment.type === 'file'" :href="msg.attachment.url" target="_blank" rel="noopener noreferrer" class="msg-file">
                      📎 {{ fileBaseName(msg.attachment.url) }}
                    </a>
                  </div>

                  <!-- Link preview (only if no image attachment) -->
                  <LinkPreview
                    v-if="!msg.attachment && extractUrl(msg.message)"
                    :url="extractUrl(msg.message)"
                  />
                </div>
              </div>

              <div v-if="typingUsers.length" class="typing-indicator">
                <span>{{ typingUsers.join(', ') }} печатает...</span>
              </div>
            </div>

            <div class="chat-input-area">
              <!-- Link preview while composing -->
              <LinkPreview v-if="draftUrl" :url="draftUrl" class="draft-preview" />

              <form class="message-form" @submit.prevent="sendMessage">
                <textarea
                  v-model="newMessage"
                  class="message-input"
                  placeholder="Ваше сообщение... (Enter — отправить)"
                  rows="1"
                  maxlength="5000"
                  @input="onTyping"
                  @keydown.enter.exact.prevent="sendMessage"
                  @keydown.enter.shift.exact.prevent="newMessage += '\n'"
                ></textarea>
                <button type="submit" class="send-button" :disabled="!newMessage.trim()">➤</button>
              </form>
            </div>
          </template>
        </section>

        <!-- Online users panel -->
        <aside class="chat-users">
          <h3>Онлайн <span class="online-count">{{ onlineUsers.length }}</span></h3>
          <div class="users-list">
            <div v-for="user in onlineUsers" :key="user.id" class="user-item" :title="user.last_seen_text">
              <span class="user-status" :class="user.status"></span>
              <span class="user-name">{{ user.display_name || user.username }}</span>
            </div>
            <div v-if="!onlineUsers.length" class="no-online">Нет пользователей онлайн</div>
          </div>
        </aside>
      </div>
    </div>

    <!-- Create room modal -->
    <div v-if="showCreateRoom" class="modal-overlay" @click.self="showCreateRoom = false">
      <div class="modal">
        <h3>Новая комната</h3>
        <input v-model="newRoomName" type="text" placeholder="Название комнаты" maxlength="50" @keydown.enter="createRoom" />
        <div class="modal-actions">
          <button class="btn" @click="createRoom" :disabled="!newRoomName.trim()">Создать</button>
          <button class="btn btn-ghost" @click="showCreateRoom = false">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { chatApi, authApi } from '@/api/index.js'
import { useAuthStore } from '@/store/auth.js'
import { useToastStore } from '@/store/toast.js'
import LinkPreview from '@/components/chat/LinkPreview.vue'

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
const onlineUsers = ref([])
let pollInterval = null
let typingTimeout = null

const URL_RE = /https?:\/\/[^\s<>"]+[^\s<>".,;:!?)/]/

function extractUrl(text) {
  if (!text) return null
  const m = text.match(URL_RE)
  return m ? m[0] : null
}

const draftUrl = computed(() => extractUrl(newMessage.value))

function formatMessage(text) {
  if (!text) return ''
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  return escaped.replace(
    /https?:\/\/[^\s<>"]+[^\s<>".,;:!?)/]/g,
    url => `<a href="${url}" target="_blank" rel="noopener noreferrer" class="chat-link">${url}</a>`
  )
}

function truncate(text, max) {
  if (!text) return ''
  return text.length > max ? text.slice(0, max) + '…' : text
}

function fileBaseName(url) {
  try { return decodeURIComponent(url.split('/').pop().split('?')[0]) } catch { return url }
}

function isNearBottom() {
  if (!messagesEl.value) return true
  const el = messagesEl.value
  return el.scrollHeight - el.scrollTop - el.clientHeight < 120
}

async function scrollToBottom(force = false) {
  await nextTick()
  if (messagesEl.value && (force || isNearBottom())) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
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
  await loadMessages(true)
}

async function loadMessages(isInitial = false) {
  if (!currentRoom.value) return
  try {
    const res = await chatApi.getMessages(currentRoom.value.id)
    const incoming = res.data?.data || []

    const lastId = messages.value.at(-1)?.id
    const newLastId = incoming.at(-1)?.id
    const hasNew = incoming.length !== messages.value.length || newLastId !== lastId

    messages.value = incoming
    if (isInitial || hasNew) {
      await scrollToBottom(isInitial)
    }
  } catch {}
}

async function loadOnlineUsers() {
  try {
    const res = await authApi.getOnlineStatus()
    onlineUsers.value = res.data?.users || []
  } catch {}
}

async function sendMessage() {
  const text = newMessage.value.trim()
  if (!text) return
  newMessage.value = ''
  try {
    await chatApi.sendMessage({ room_id: currentRoom.value.id, message: text })
    await loadMessages()
    await scrollToBottom(true)
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
  await loadOnlineUsers()
  pollInterval = setInterval(async () => {
    await loadMessages()
    await loadOnlineUsers()
  }, 3000)
})

onUnmounted(() => {
  clearInterval(pollInterval)
  clearTimeout(typingTimeout)
})
</script>
