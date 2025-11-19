// src/components/Outer/BotUi.vue
<template>
  <button
    class="ga-fab"
    @click="togglePanel"
    :style="{ backgroundImage: `url(${fabImage})` }"
    aria-label="Open chat"
  ></button>

  <div v-if="open" class="ga-panel" :style="{ width: panelWidth, height: panelHeight }">
    <BoardHeader :icon="headerIcon" @close="togglePanel(false)" />
    <BoardContent :view="view" @navigate="handleNavigate" />
  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed, watch } from 'vue'
import BoardContent from '../Board/BoardContent.vue'
// import BoardHeader from '../Board/BoardHeader.vue'

import defaultFab from '../../assets/img/header-bg.jpeg'
import defaultHeader from '../../assets/icons/bot.png'
// import { inject,  } from 'vue'

const widgetState = inject('chatWidgetState')

// Watch for the openChat trigger
watch(() => widgetState.openChatFlag, (value) => {
  if (value) {
    goToRegisterPage()     
    widgetState.openChatFlag = false
  }
})

const open = ref(false)
const view = ref('home')

const config = inject('chatWidgetConfig', {})

const fabImage = computed(() => config.fabImage || defaultFab)
const headerIcon = computed(() => config.headerIcon || defaultHeader)
const panelWidth = computed(() => config.panelWidth || '380px')
const panelHeight = computed(() => config.panelHeight || 'calc(100vh - 120px)')

function togglePanel(force) {
  open.value = typeof force === 'boolean' ? force : !open.value
}

function handleNavigate(newView) {
  view.value = newView
  localStorage.setItem('chatView', newView)
}

function goToRegisterPage() {
  togglePanel(true)
  view.value = 'register'      // <-- go to registration view
  localStorage.setItem('chatView', 'register')
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
  position: fixed;
  bottom: 3.0rem;
  right: 1.5rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: url('../../assets/img/header-bg.jpeg') center/cover no-repeat;
  border: none;
  cursor: pointer;
  z-index: 1001;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }
}

.ga-panel {
  position: fixed;
  bottom: 120px;
  right: 1.5rem;
  width: 380px;
  max-width: calc(100vw - 2rem);
  height: calc(100vh - 120px);
  max-height: 600px;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  z-index: 1000;
}
</style>
