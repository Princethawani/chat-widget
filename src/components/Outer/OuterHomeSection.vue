<template>
  <div class="grace-home">
    <div class="home-page">
      <!-- Home content -->
      <div v-if="!showRegistration">
        <!-- Header -->
        <div class="header">
          <img class="future-logo" :src="botLogo" alt="Bot Logo" />
          <h2>Hi, I‘m Ryu! 👋</h2>
          <p>How can we help you?</p>
        </div>

        <!-- Options list -->
        <div class="content-container">
          <div class="options-container">
            <div
              class="option"
              v-for="(item, index) in options"
              :key="index"
              @click="item.text.includes('Chat') ? goToRegistration() : handleOption(item)"
            >
              <span class="option-text">{{ item.text }}</span>
              <AngleRight class="option-arrow" />
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
      <div class="footer-nav">
        <div
          class="nav-item"
          :class="{ active: activeTab === 'home' }"
          @click="setTab('home')"
        >
          <div class="icon-wrapper">
            <HomeIcon class="icon" />
          </div>
          <span>Home</span>
        </div>

        <div
          class="nav-item"
          :class="{ active: activeTab === 'chat' }"
          @click="goToRegistration"
        >
          <div class="icon-wrapper">
            <ChatIcon class="icon" />
          </div>
          <span>Chat</span>
        </div>
      </div>

      <div class="powered">
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
.grace-home {
  .home-page {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fff;
    overflow: hidden;
    font-family: 'Bai Jamjuree', sans-serif !important;

    /* --- HEADER --- */
    .header {
      background: linear-gradient(to bottom, #d4ae69 0%, #e5c785 100%);
      color: #fff !important;
      padding: 1.5rem;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-start;
      position: relative;
      height: 20vh;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);

      h2 {
        margin: 0;
        font-size: 1.4rem;
        font-weight: 600;
      }
      p {
        margin: 0.4rem 0 0;
        font-size: 0.95rem;
        opacity: 0.9;
        margin-bottom: 2rem;
      }

      .future-logo {
        width: 48px !important;
        height: 48px !important;
        position: absolute;
        top: 1rem;
        left: 1rem;
      }
    }

    /* --- CONTENT CONTAINER --- */
    .content-container {
      position: relative;
      top: -3rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      margin: 0 1rem -1rem;
      border-radius: 12px;
      background: #fff !important;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      z-index: 10;

      .options-container {
        flex: 1;
        overflow-y: auto;
        max-height: calc(3 * (3rem + 1rem));

        .option {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1rem 1.2rem;
          margin: 0.5rem 1rem;
          cursor: pointer;
          transition: background 0.2s ease;

          &:hover {
            background: #f9f9f9 !important;
          }

          .option-text {
            font-weight: 500 !important;
            color: #333 !important;
          }

          .option-arrow {
            width: 1rem !important;
            height: 1rem !important;
            color: #999 !important;
          }
        }
      }
    }

    /* --- CHAT SECTION --- */
    .chat-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: -0.5rem 1rem 1.5rem;
      padding: 1rem 1.2rem;
      border-radius: 12px;
      background: #fff !important;
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
          font-size: 1rem !important;
          color: #d4ae69 !important;
        }
        p {
          margin: 0.2rem 0 0;
          font-size: 0.85rem !important;
          color: #666 !important;
        }
      }

      .chat-icon {
        width: 26px !important;
        height: 26px !important;
      }
    }

    /* --- FOOTER NAV --- */
    .footer-nav {
      display: flex;
      justify-content: space-around;
      padding: 20px 0;
      background-color: #fff !important;
      border-top: 1px solid #ddd !important;

      .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        color: #555 !important;

        &.active {
          color: #d4ae69 !important;
        }

        .icon-wrapper {
          margin-bottom: 4px;
        }

        .icon {
          width: 24px !important;
          height: 24px !important;
          color: inherit !important;
        }
      }
    }

    /* --- POWERED BY --- */
    .powered {
      text-align: center;
      font-size: 0.8rem !important;
      color: #aaa !important;
      margin-bottom: 0.5rem;

      strong {
        color: #d4ae69 !important;
        font-weight: 600 !important;
      }
    }
  }
}
</style>

