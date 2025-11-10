<template>
  <div class="chat-container">
    <!-- Header -->
    <header class="chat-header">
      <button class="back-btn" @click="$emit('logout')">←</button>
      <h3 class="chat-title">RyuAI/Support</h3>
    </header>

    <!-- Messages -->
    <div class="messages" ref="messageContainer">
      <div
        v-for="(msg, i) in messages"
        :key="i"
        :class="['message-wrapper', msg.from === 'user' ? 'user-wrapper' : 'bot-wrapper']"
      >
        <img
          v-if="msg.from === 'bot'"
          class="bot-avatar"
          :src="botAvatar"
          alt="RyuAI"
        />
        <div
          :class="['message', msg.from === 'user' ? 'from-user' : 'from-bot']"
        >
          <p>{{ msg.text }}</p>
        </div>
      </div>
    </div>

    <!-- Message Input -->
    <form class="chat-input" @submit.prevent="sendMessage">
      <input
        type="text"
        v-model="input"
        placeholder="Type your message..."
        required
        ref="chatInput"
        autocomplete="off"
      />
      <button type="button" class="emoji-btn" @click="toggleEmojiPicker">😊</button>
      <button type="submit" :disabled="!input.trim()">Send</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'
import { EmojiButton } from '@joeattardi/emoji-button'
import botAvatar from '@/assets/icons/bot.png'

const API_URL = 'https://ryu.futuremultiverse.com/chatbot_backend/api/test'

const messages = ref([])
const input = ref('')
const messageContainer = ref(null)
const chatInput = ref(null)
let picker = null

// Load initial greeting
onMounted(() => {
  const user = JSON.parse(localStorage.getItem('userInfo'))
  if (user) {
    messages.value.push({
      text: `Hello ${user.name}! 👋 I'm RyuAI. How can I assist you today?`,
      from: 'bot'
    })
  } else {
    messages.value.push({
      text: "Hello there 👋! I'm RyuAI. How can I help you today?",
      from: 'bot'
    })
  }

  // Initialize emoji picker
  picker = new EmojiButton({
    position: 'top-start', // appear above input
    autoHide: true,
    theme: 'light',
    zIndex: 9999 // ensures it shows on top of chat UI
  })

  // Fix for [object Object] issue
  picker.on('emoji', selection => {
    const emojiChar = typeof selection === 'string' ? selection : selection.emoji || selection.unicode || ''
    input.value += emojiChar
    chatInput.value.focus()
  })
})

// Toggle emoji picker
function toggleEmojiPicker() {
  if (picker) picker.togglePicker(chatInput.value)
}

// Send user message
async function sendMessage() {
  const text = input.value.trim()
  if (!text) return

  // Add user message to UI
  messages.value.push({ text, from: 'user' })
  input.value = ''
  await nextTick()
  scrollToBottom()

  try {
    const { data } = await axios.post(API_URL, { question: text })
    const botReply = data.reply || 'Hmm... I did not quite get that 🤔'
    messages.value.push({ text: botReply, from: 'bot' })
  } catch (error) {
    console.error('Chat API error:', error)
    messages.value.push({
      text: 'Unable to reach the chat server. Please try again later.',
      from: 'bot'
    })
  }

  scrollToBottom()
}

// Auto-scroll to bottom
function scrollToBottom() {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
  })
}
</script>

<style scoped lang="scss">
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(180deg, #fffdf5 0%, #f8f4eb 100%);
  font-family: 'Bai Jamjuree', sans-serif;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  position: relative;
}

/* Header */
.chat-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.6rem;
  background: linear-gradient(135deg, #d4ae69, #f5d693);
  color: #fff;
  padding: 0.9rem 1.2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  position: relative;

  .chat-title {
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.3px;
    margin: 0;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  }

  .back-btn {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    font-weight: bold;
    padding: 0.35rem 0.6rem;
    border-radius: 10px;
    transition: all 0.2s ease;
    &:hover {
      background: rgba(255, 255, 255, 0.35);
    }
  }
}

/* Messages */
.messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  background: url('https://www.transparenttextures.com/patterns/paper-fibers.png');
  background-size: cover;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #d4ae69;
    border-radius: 6px;
  }
}

.message-wrapper {
  display: flex;
  align-items: flex-end;
}

.bot-wrapper {
  justify-content: flex-start;
  animation: fadeInLeft 0.3s ease;
}

.user-wrapper {
  justify-content: flex-end;
  animation: fadeInRight 0.3s ease;
}

.bot-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transform: translateY(2px);
}

/* Message Bubbles */
.message {
  max-width: 75%;
  padding: 0.7rem 0.9rem;
  border-radius: 16px;
  line-height: 1.4;
  font-size: 0.9rem;
  word-wrap: break-word;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
}

.from-user {
  background: linear-gradient(135deg, #d4ae69, #e6c980);
  color: #fff;
  border-bottom-right-radius: 6px;
  transform: translateY(2px);
}

.from-bot {
  background: #fff;
  color: #333;
  border-bottom-left-radius: 6px;
  border: 1px solid #eee;
  backdrop-filter: blur(4px);
}

/* Input Section */
.chat-input {
  display: flex;
  align-items: center;
  padding: 0.6rem 0.8rem;
  border-top: 1px solid #eee;
  background: #fffaf2;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  position: relative;

  input {
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 25px;
    padding: 0.7rem 1rem;
    font-size: 0.92rem;
    outline: none;
    transition: all 0.2s ease;
    &:focus {
      border-color: #d4ae69;
      box-shadow: 0 0 0 3px rgba(212, 174, 105, 0.2);
    }
  }

  .emoji-btn {
    background: transparent;
    border: none;
    font-size: 1.4rem;
    margin-left: 0.5rem;
    cursor: pointer;
    color: #c49a4d;
    transition: all 0.2s ease;
    &:hover {
      transform: scale(1.15);
    }
  }

  button[type='submit'] {
    margin-left: 0.5rem;
    background: linear-gradient(135deg, #d4ae69, #c49a4d);
    color: #fff;
    border: none;
    border-radius: 25px;
    padding: 0.6rem 1.1rem;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.25s ease;
    box-shadow: 0 3px 10px rgba(212, 174, 105, 0.4);

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #c49a4d, #b08538);
      transform: translateY(-1px);
      box-shadow: 0 5px 12px rgba(212, 174, 105, 0.5);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}

/* Animations */
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-12px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(12px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>

