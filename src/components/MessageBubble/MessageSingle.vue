// src/components/MessageBubble/MessageSingle.vue 
<template>
  <div class="msg" :class="roleClass">
    <div class="bubble">{{ content }}</div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({ role: {type:String, default:'assistant'}, content: {type:String, default:''} })
const roleClass = computed(()=> props.role === 'user' ? 'right' : 'left')
</script>
<style scoped>
.msg{display:flex;margin:8px 0;}
.msg.left{justify-content:flex-start;}
.msg.right{justify-content:flex-end;}
.bubble{max-width:80%;padding:10px 12px;border-radius:12px;white-space:pre-wrap;word-break:break-word;line-height:1.35;box-shadow:0 2px 6px rgba(0,0,0,.06);}
.left .bubble{background:#f3f3f3;}
.right .bubble{background:var(--gold);color:#fff;}
</style>
