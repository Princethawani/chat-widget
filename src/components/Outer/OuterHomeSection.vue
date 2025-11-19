<template>
  <div class="chat-home-page">
    <!-- Home content -->
    <div v-if="!showRegistration">
      <!-- Header -->
      <div class="chat-header">
        <img class="chat-future-logo" :src="botLogo" alt="Bot Logo" />
        <h2 class="chat-h2">Hi, I‘m Ryu! 👋</h2>
        <p class="chat-p">How can we help you?</p>
      </div>

      <!-- Options list -->
      <div class="chat-content-container">
      <div class="chat-options-container">
        <div
          class="chat-option"
          v-for="(item, index) in options"
          :key="index"
          @click="item.text.includes('Chat') ? goToRegistration() : handleOption(item)"
        >
          <span class="option-text">{{ item.text }}</span>
          <AngleRight class="option-arrow" />
          <!-- <span class="option-arrow">></span> -->
        </div>
      </div>

      </div>

      <!-- Chat section -->
      <div class="chat-section" @click="goToRegistration">
        <div class="chat-info">
          <strong>Chat with RyuAI / Support</strong>
          <p>Have questions? RyuAI is here to assist you</p>
        </div>
        <img :src="SendIcon" alt="Send Icon" class="chat-icon" />
      </div>
    </div>

    <!-- Registration Form -->
    <div v-else>
      <RegistrationForm @registrationComplete="closeRegistration" />
    </div>

    <!-- Footer nav -->
    <div >
    <div class="chat-footer-nav"> 
      <div
        class="chat-nav-item"
        :class="{ active: activeTab === 'home' }"
        @click="setTab('home')"
      >
        <div class="chat-icon-wrapper">
          <HomeIcon class="chat-icon" />
        </div>
        <span>Home</span>
      </div>

      <div
        class="chat-nav-item"
        :class="{ active: activeTab === 'chat' }"
        @click="goToRegistration"
      >
        <div class="chat-icon-wrapper">
          <ChatIcon class="chat-icon" />
        </div>
        <span>Chat</span>
      </div>
    </div>

    <div class="chat-powered">
      <span>Powered by </span><strong>GraceAI</strong>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import botLogo from '@/assets/icons/bot.png'

// Import SVG as image
import SendIcon from '../../assets/icons/send.svg'

// Icons
import HomeIcon from '@/assets/icons/homeIcon.vue'
import ChatIcon from '@/assets/icons/chatIcon.vue'
import AngleRight from '@/assets/icons/angleRight.vue'; 

// Registration form
import RegistrationForm from '@/components/RegistrationForm.vue'

const emit = defineEmits(['goToRegistration'])

const showRegistration = ref(false)
const activeTab = ref('home')
const options = ref([
  { text: 'Explore FMV Offers'}, 
  { text: 'Order FMV Packages'},
  { text: 'Explore GuideBook' },
])



function handleOption(item) {
  emit('goToRegistration', item.text)
  if (item.link) {
    window.open(item.link, '_blank'); 
  } else {
    console.log('No link available for', item.text);
  }
}

function setTab(tab) {
  activeTab.value = tab
  showRegistration.value = tab === 'chat'
}

function goToRegistration() {
  activeTab.value = 'chat'
  showRegistration.value = true
  emit('goToRegistration')
}

function closeRegistration() {
  showRegistration.value = false
  activeTab.value = 'home'
}
</script>

<style scoped lang="scss">
.chat-home-page {
  display: flex;
  flex-direction: column;
  // height: 100%;
  background: #fff;
  overflow: hidden;
  font-family: 'Bai Jamjuree', sans-serif;

  .chat-header {
    background: linear-gradient(to bottom, #d4ae69 0%, #e5c785 100%);
    color: #fff;
    padding: 1.5rem;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    position: relative;
    height: 50%; /** window screen */
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  }

    .chat-h2 { margin: 20%; font-size: 1.4rem; font-weight: 600; }
    .chat-p { margin: 0.4rem 0 0; font-size: 0.95rem; opacity: 0.9; margin-bottom: 2rem; }

    .chat-future-logo {
      width: 48px;
      height: 48px;
      position: absolute;
      top: 1rem;
      left: 1rem;
    }

  .chat-content-container {
    position: relative;
    top: -3rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0 1rem -1rem;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    z-index: 10;

   .chat-options-container {
    flex: 1;
    overflow-y: auto;
    max-height: calc(3 * (3rem + 1rem)); /* adjust based on your option height + margin */

    .chat-option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem 1.2rem;
      margin: 0.5rem 1rem; 
      cursor: pointer;
      transition: background 0.2s ease;

      &:hover { background: #f9f9f9; }

      .option-text { font-weight: 500; color: #333; }
      // .option-arrow { font-weight: bold; color: #999; }
      .option-arrow {
        width: 1rem;
        height: 1rem;
        color: #999; /* adjust if your icon inherits color */
      }
    }
  }
  }

  .chat-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: -0.5rem 1rem 1.5rem;
    padding: 1rem 1.2rem;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    z-index: 15;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
    }

    .chat-info {
      flex: 1;
      margin-right: 10px;

      strong {
        display: block;
        font-size: 1rem;
        color: #d4ae69;
      }
      p {
        margin: 0.2rem 0 0;
        font-size: 0.85rem;
        color: #666;
      }
    }

    .chat-icon {
      width: 26px;
      height: 26px;
    }
  }

  .chat-footer-nav {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    background-color: #fff;
    border-top: 1px solid #ddd;
  }

  .chat-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    color: #555;
  }

  .nav-item.active { color: #d4ae69; }
  .icon-wrapper { margin-bottom: 4px; }
  .icon { width: 24px; height: 24px; }

  .chat-powered {
    text-align: center;
    font-size: 0.8rem;
    color: #aaa;
    margin-bottom: 0.5rem;

    strong { color: #d4ae69; font-weight: 600; }
  }
}
</style>
