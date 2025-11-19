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

        <!-- NAME -->
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

        <!-- EMAIL -->
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

        <!-- COMPANY -->
        <div class="form-group">
          <label for="company">Company Name (Optional)</label>
          <input
            id="company"
            type="text"
            v-model="form.company"
            placeholder="Enter your company name"
          />
        </div>

        <!-- TERMS CHECKBOX -->
        <div class="form-group terms-box">
          <label class="checkbox-container">
            <input type="checkbox" v-model="agreeToTerms" />
            <span class="checkmark"></span>
            <span class="terms-text">
              I agree to the
              <a href="#" target="_blank">Terms &amp; Conditions</a> *
            </span>
          </label>
        </div>

        

        <!-- SUBMIT BUTTON -->
        <button class="submit-btn" type="submit" :disabled="loading || !recaptchaReady">
          <span v-if="loading">Registering...</span>
          <span v-else>
            <template v-if="!recaptchaReady">Loading...</template>
            <template v-else>Start Chat</template>
          </span>
        </button>

      </form>
    </div>
  </div>
</template>

<script setup>

/* global grecaptcha */
import { ref, onMounted, inject } from 'vue'
import axios from 'axios'
import defaultLogo from '@/assets/img/bot.png'

const config = inject('chatWidgetConfig', {}) // optional overrides
const emit = defineEmits(['registrationComplete'])

const form = ref({ name: '', email: '', company: '' })
const agreeToTerms = ref(false)
const loading = ref(false)
const logo = ref(config.logo || defaultLogo)

// reCAPTCHA
const recaptchaSiteKey = config.recaptchaSiteKey || '6LfiLw8sAAAAANizVK9iW1cRardK1PmPScu7yDIL'
const recaptchaReady = ref(false)

function loadRecaptcha(siteKey) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('No window'))
    if (window.grecaptcha && typeof window.grecaptcha.execute === 'function') {
      recaptchaReady.value = true
      return resolve()
    }
    if (document.getElementById('recaptcha-script')) {
      // Wait until grecaptcha is available
      const check = setInterval(() => {
        if (window.grecaptcha && typeof window.grecaptcha.execute === 'function') {
          clearInterval(check)
          recaptchaReady.value = true
          resolve()
        }
      }, 200)
      // timeout fallback
      setTimeout(() => {
        clearInterval(check)
        if (!recaptchaReady.value) reject(new Error('reCAPTCHA load timeout'))
      }, 8000)
      return
    }

    const script = document.createElement('script')
    script.id = 'recaptcha-script'
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.defer = true
    script.onload = () => {
      // grecaptcha may not be immediately available; wait briefly
      const check = setInterval(() => {
        if (window.grecaptcha && typeof window.grecaptcha.execute === 'function') {
          clearInterval(check)
          recaptchaReady.value = true
          resolve()
        }
      }, 200)
      // timeout fallback
      setTimeout(() => {
        clearInterval(check)
        if (!recaptchaReady.value) reject(new Error('reCAPTCHA init timeout'))
      }, 8000)
    }
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA script'))
    document.head.appendChild(script)
  })
}

// Auto login using saved user (skip registration if present)
onMounted(async () => {
  try {
    await loadRecaptcha(recaptchaSiteKey)
  } catch (err) {
    console.warn('reCAPTCHA failed to load:', err)
    // Let recaptchaReady remain false — button will show Loading... and disabled
  }

  const savedUser = localStorage.getItem('userInfo')
  if (savedUser) {
    try {
      const parsed = JSON.parse(savedUser)
      // Basic sanity check
      if (parsed?.name && parsed?.email) {
        emit('registrationComplete', parsed)
        return
      }
    } catch (e) {
      console.warn('Invalid userInfo in localStorage, clearing.')
      localStorage.removeItem('userInfo')
    }
  }
})

// Handle registration
async function handleSubmit() {
  if (!form.value.name || !form.value.email) {
    alert('Please enter your name and email to continue.')
    return
  }

  if (!agreeToTerms.value) {
    alert('You must agree to the Terms & Conditions before continuing.')
    return
  }

  if (!recaptchaReady.value) {
    alert('Captcha is not ready yet. Please wait a moment and try again.')
    return
  }

  loading.value = true

  // obtain reCAPTCHA token (v3)
  let recaptchaToken = ''
  try {
    // eslint-disable-next-line no-undef
    recaptchaToken = await grecaptcha.execute(recaptchaSiteKey, { action: 'register' })
  } catch (err) {
    console.error('grecaptcha.execute error:', err)
    alert('Captcha verification failed. Please try again.')
    loading.value = false
    return
  }

  try {
    const payload = {
      name: form.value.name,
      email: form.value.email,
      company_name: form.value.company,
      recaptcha_token: recaptchaToken
    }

    const response = await axios.post(
      config.registerApi || 'https://ryu.futuremultiverse.com/chatbot_backend/api/register',
      payload
    )

    if (response.data && response.data.success && response.data.user) {
      const user = {
        ...response.data.user,
        token: response.data.token || btoa(form.value.email),
        initialMessage: `Hi, I'm ${response.data.user.name || form.value.name}!`
      }
      localStorage.setItem('userInfo', JSON.stringify(user))
      emit('registrationComplete', user)
    } else {
      alert(response.data?.message || 'Registration failed. Please try again.')
    }
  } catch (error) {
    console.error('Registration error:', error?.response || error)
    alert(error?.response?.data?.message || 'Server error during registration.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* base layout (unchanged) */
.home-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f5f5f5;
  font-family: 'Bai Jamjuree', sans-serif;

}

.header {
  background: #D4AE69;
  color: #fff;
  padding: 22px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 200px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-family: 'Bai Jamjuree', sans-serif;

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
  margin-top: 3px;
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
  border-color: #D4AE69;
  box-shadow: 0 0 0 2px rgba(212, 174, 105, 0.25);
}

.submit-btn {
  margin-top: 10px;
  background: #D4AE69;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  padding: 1.2rem;
  font-weight: 1000;
  cursor: pointer;
}

.submit-btn[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

.powered {
  text-align: center;
  color: #888;
  margin-top: 8px;
}

.powered strong {
  color: #D4AE69;
}

/* --- TERMS CHECKBOX --- */
.checkbox-container {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  position: relative;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  width: 20px;
  height: 20px;
  background-color: #eee;
  border-radius: 4px;
  border: 1px solid #ccc;
  display: inline-block;
  transition: 0.2s;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #D4AE69;
  border-color: #D4AE69;
}

.checkmark:after {
  content: "";
  position: relative;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.terms-text {
  font-size: 0.9rem;
  font-weight: 600;
}

.terms-text a {
  color: #D4AE69;
  font-weight: bold;
  text-decoration: none;
}
</style>
