<template>
  <!-- Floating Chat Button -->
  <button class="ga-fab" @click="togglePanel" aria-label="Open chat"></button>

  <!-- Chat Panel -->
  <div v-if="open" class="ga-panel">
    <Board-Header @close="togglePanel(false)" />
    <Board-Content :view="view" @navigate="handleNavigate" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BoardContent from '../Board/BoardContent.vue'

const open = ref(false)
const view = ref('home')

// Toggle chat visibility
function togglePanel(force) {
  open.value = typeof force === 'boolean' ? force : !open.value
}

// Handle navigation event from BoardContent
function handleNavigate(newView) {
  view.value = newView
  localStorage.setItem('chatView', newView)
}

onMounted(() => {
  const savedUser = localStorage.getItem('userInfo')
  const savedView = localStorage.getItem('chatView')

  if (savedView) view.value = savedView
  else if (savedUser) view.value = 'chat'
  else view.value = 'home'
})
</script>

<style scoped lang="scss">
.ga-fab {
  position: fixed; bottom: 1.5rem; right: 1.5rem;
  width: 60px; height: 60px; border-radius: 50%;
  background: url('../../assets/img/header-bg.jpeg') center/cover no-repeat;
  border: none; cursor: pointer; z-index: 1001;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transition: all 0.2s ease;
}
.ga-fab:hover { transform: scale(1.05); box-shadow: 0 6px 16px rgba(0,0,0,0.3); }

.ga-panel {
  position: fixed; bottom: 90px; right: 1.5rem;
  width: 380px; max-width: calc(100vw - 2rem); height: calc(100vh - 120px);
  max-height: 600px; display: flex; flex-direction: column;
  background: #fff; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  overflow: hidden; z-index: 1000;
}
</style>
