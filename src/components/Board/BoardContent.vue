// src/components/Board/BoardContent.vue
<template>
  <main class="content">
    <!-- Home Section -->
    <OuterHomeSection
      v-if="view === 'home'"
      @goToRegistration="goToRegister"
    />

    <!-- Registration Form -->
    <RegistrationForm
      v-else-if="view === 'register'"
      @registrationComplete="toChat"
    />

    <!-- Chat Section -->
    <BoardAction
      v-else-if="view === 'chat'"
      @logout="logout"
    />
  </main>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import RegistrationForm from '../RegistrationForm.vue'
import OuterHomeSection from '../Outer/OuterHomeSection.vue'
import BoardAction from './BoardAction.vue'

defineProps({ view: String })
const emit = defineEmits(['navigate'])

// Navigate to registration
function goToRegister() {
  emit('navigate', 'register')
}

// Navigate to chat after registration
function toChat(user) {
  localStorage.setItem('userInfo', JSON.stringify(user))
  emit('navigate', 'chat')
}

// Logout user
function logout() {
  localStorage.removeItem('userInfo')
  emit('navigate', 'home')
}
</script>

<style scoped>
.content {
  height: 100%;
  overflow: auto;
  background: #f7f7f7;
}
</style>
