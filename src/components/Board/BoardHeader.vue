<template>
  <header class="topbar">
    <div class="brand">
      <img class="avatar" :src="icon" alt="Bot Icon" />
      <div>
        <strong>GraceAI</strong>
        <small>Future Multiverse</small>
      </div>
    </div>
    <button class="close" @click="$emit('close')">✕</button>
  </header>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    // default: () => require('@/assets/icons/bot.png')
      default: () => require('../../assets/icons/bot.png')

  }
})
</script>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: var(--chat-primary, #d4ae69);
  color: #fff;
}
.brand {
  display: flex;
  gap: 10px;
  align-items: center;
}
.avatar {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  object-fit: cover;
}
.close {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 8px;
}
.close:hover {
  background: rgba(0, 0, 0, 0.08);
}
</style>
