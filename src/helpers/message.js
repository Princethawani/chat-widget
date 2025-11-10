// src/helpers/message.js
import axios from 'axios'

export const messageService = {
  async createMessage(text) {
    try {
      const apiUrl = import.meta.env.VITE_GRACEFLOW_API_URL
      console.info('[GraceFlow] Using API URL:', apiUrl)
      console.info('[GraceFlow] Sending message to server:', text)

      const res = await axios.post(apiUrl, { question: text })

      console.debug('[GraceFlow] Server response:', res.data)

      const reply =
        res.data?.answer?.choices?.[0]?.message?.content?.trim() ||
        'Hmm... I didn’t quite get that. Could you try again?'

      return {
        type: 'text',
        text: reply,
        disableInput: false
      }
    } catch (error) {
      console.error('[GraceFlow] Connection error:', error.message)
      if (error.response) {
        console.error('[GraceFlow] Server response:', error.response.data)
      }

      return {
        type: 'text',
        text: 'I’m having trouble reaching the server right now. Please try again in a moment.',
        disableInput: false
      }
    }
  }
}
