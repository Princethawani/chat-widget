// src/components/RegistrationForm.vue
<template>
  <div class="home-page">
    <div class="header">
      <img class="future-logo" :src="logo" alt="Future Logo" />
      <div class="header-text">
        <h2>Welcome to the Future!</h2>
        <p>Please enter your details to start the chat:</p>
      </div>
    </div>

    <div class="content-container">
      <form class="user-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Full Name *</label>
          <input
            id="name"
            type="text"
            v-model="form.name"
            required
            placeholder="Enter your full name"
          />
        </div>

        <div class="form-group">
          <label for="email">Email Address *</label>
          <input
            id="email"
            type="email"
            v-model="form.email"
            required
            placeholder="Enter your email"
          />
        </div>

        <div class="form-group">
          <label for="company">Company Name (Optional)</label>
          <input
            id="company"
            type="text"
            v-model="form.company"
            placeholder="Enter your company name"
          />
        </div>

        <button class="submit-btn" type="submit" :disabled="loading">
          <span v-if="loading">Registering...</span>
          <span v-else>Start Chat</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import axios from 'axios'
// import defaultLogo from '@/assets/img/bot.png'
import defaultLogo from '../assets/img/bot.png'

// Inject config from parent (library consumer)
const config = inject('chatWidgetConfig', {})

const emit = defineEmits(['registrationComplete'])
const form = ref({ name: '', email: '', company: '' })
const loading = ref(false)

// Use configurable logo or fallback
const logo = ref(config.logo || defaultLogo)

// On page load — skip registration if user exists
onMounted(() => {
  const savedUser = localStorage.getItem('userInfo')
  if (savedUser) {
    const parsedUser = JSON.parse(savedUser)
    emit('registrationComplete', {
      ...parsedUser,
      initialMessage: `Hi, I'm ${parsedUser.name}!`
    })
  }
})

// Handle registration
async function handleSubmit() {
  if (!form.value.name || !form.value.email) {
    alert('Please enter your name and email to continue.')
    return
  }

  loading.value = true

  try {
    const payload = {
      name: form.value.name,
      email: form.value.email,
      company_name: form.value.company
    }

    const response = await axios.post(
      config.registerApi || 'https://ryu.futuremultiverse.com/chatbot_backend/api/register',
      payload
    )

    if (response.data.success && response.data.user) {
      const userData = {
        ...response.data.user,
        initialMessage: `Hi, I'm ${response.data.user.name}!`
      }

      localStorage.setItem('userInfo', JSON.stringify(userData))
      emit('registrationComplete', userData)
    } else {
      alert(response.data.message || 'Registration failed. Please try again.')
    }
  } catch (error) {
    console.error('Registration error:', error.response || error)
    alert(
      error.response?.data?.message ||
        error.message ||
        'Something went wrong while connecting to the server.'
    )
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f5f5f5;
  font-family: 'Bai Jamjuree', sans-serif;
}

.header {
  background: var(--gold, #d4ae69);
  color: #fff;
  padding: 22px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height:200px;
  display: flex;
  align-items: flex-start; /* top alignment */
  gap: 12px; /* spacing between logo and text */
}

.future-logo {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: contain;
}

.header-text {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.header h2 {
  margin: 0 0 6px;
  font-size: 1.5rem;
}

.header p {
  margin: 0;
  opacity: 0.9;
  font-size: 1rem;
}

.content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: -40px 20px 12px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
  padding: 29px 16px 45px;
}

.user-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 1000;
  margin-bottom: 6px;
}

input {
  padding: 1.0rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
}

input:focus {
  border-color: var(--gold, #d4ae69);
  box-shadow: 0 0 0 2px rgba(212, 174, 105, 0.25);
}

.submit-btn {
  margin-top: 10px;
  background: var(--gold, #d4ae69);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  padding: 1.2rem;
  font-weight: 1000;
  cursor: pointer;
}

.powered {
  text-align: center;
  color: #888;
  margin-top: 8px;
}

.powered strong {
  color: var(--gold, #d4ae69);
}
</style>
