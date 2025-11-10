// src/components/MessageBubble/MessageMain.vue
<template>
  <div class="wrap">
    <div class="messages" ref="scrollArea">
      <MessageBubble-Single v-for="(m,i) in messages" :key="i" :role="m.role" :content="m.content" />
      <MessageBubble-Typing v-if="typing" />
    </div>

    <form class="input-row" @submit.prevent="send">
      <input v-model="draft" type="text" placeholder="Type a message…" :disabled="busy" @keydown.enter.exact.prevent="send" />
      <button class="send" :disabled="!draft.trim() || busy">Send</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Single from './MessageSingle.vue'
import Typing from './MessageTyping.vue'
import api from '../../helpers/http'

const messages = ref([{ role:'assistant', content:'Hi! I am GraceAI. How can I help you today?' }])
const draft = ref('')
const busy = ref(false)
const typing = ref(false)
const scrollArea = ref(null)

function scrollBottom(){
  if (scrollArea.value) scrollArea.value.scrollTop = scrollArea.value.scrollHeight
}

onMounted(()=> nextTick(scrollBottom))

async function send(){
  const text = draft.value.trim()
  if (!text) return
  messages.value.push({ role:'user', content:text })
  draft.value = ''
  busy.value = true
  typing.value = true
  await nextTick(); scrollBottom()

  try{
    // const { data } = await api.post('/api/chat', { message: text })
    // messages.value.push({ role:'assistant', content: data.reply })
    await new Promise(r=>setTimeout(r, 400))
    messages.value.push({ role:'assistant', content:"Got it! (stubbed reply). Replace with /api/chat."})
  }catch(e){
    messages.value.push({ role:'assistant', content:"Server seems unreachable."})
  }finally{
    busy.value = false
    typing.value = false
    await nextTick(); scrollBottom()
  }
}
</script>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
}

.messages {
  flex: 1;
  overflow: auto;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
}

.input-row {
  display: flex;
  gap: 8px;
  background: #fff;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
}

.input-row input {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px 12px;
  outline: none;
}

.input-row input:focus {
  border-color: var(--gold);
  box-shadow: 0 0 0 2px rgba(212, 174, 105, 0.25);
}

.send {
  background: var(--gold);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 14px;
  cursor: pointer;
  font-weight: 600;
}

.send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

