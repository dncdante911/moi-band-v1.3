<template>
  <a v-if="preview" :href="url" target="_blank" rel="noopener noreferrer" class="link-preview-card">
    <img v-if="preview.image" :src="preview.image" class="lp-image" alt="" @error="onImgError" />
    <div class="lp-body">
      <div class="lp-title">{{ preview.title }}</div>
      <div v-if="preview.description" class="lp-desc">{{ preview.description }}</div>
      <div class="lp-domain">{{ domain }}</div>
    </div>
  </a>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({ url: { type: String, required: true } })

const preview = ref(null)
const showImage = ref(true)

const domain = computed(() => {
  try { return new URL(props.url).hostname } catch { return props.url }
})

function onImgError(e) {
  e.target.style.display = 'none'
}

watch(() => props.url, async (url) => {
  if (!url) { preview.value = null; return }
  try {
    const res = await fetch(`/api/chat/link-preview.php?url=${encodeURIComponent(url)}`)
    const data = await res.json()
    preview.value = data.success ? data : null
  } catch {
    preview.value = null
  }
}, { immediate: true })
</script>
