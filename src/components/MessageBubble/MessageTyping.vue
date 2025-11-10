<template>
  <div class="msg left">
    <div class="bubble">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
    </div>
  </div>
</template>
<script setup>
</script>
<style scoped>
.msg{display:flex;margin:8px 0;}
.left{justify-content:flex-start;}
.bubble{display:inline-flex;gap:6px;align-items:center;background:#f3f3f3;padding:8px 10px;border-radius:12px;}
.dot{width:6px;height:6px;border-radius:50%;background:#999;animation:bl 1s infinite ease-in-out;}
.dot:nth-child(2){animation-delay:.2s;}
.dot:nth-child(3){animation-delay:.4s;}
@keyframes bl{0%,80%,100%{opacity:.2;transform:translateY(0)}40%{opacity:1;transform:translateY(-2px)}}
</style>
