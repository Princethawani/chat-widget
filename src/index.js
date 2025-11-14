// src/index.js
// Import styles so consumers don't have to
// import './styles/style.scss'

// Import your main components
import OuterBotUi from './components/Outer/BotUi.vue'
import OuterAppStyle from './components/Outer/AppStyle.vue'

const VueChatWidget = {
  install(app, options = {}) {
    // Provide configuration for theming
    app.provide('chatWidgetConfig', options)

    // Register main components
    app.component('OuterBotUi', OuterBotUi)
    app.component('OuterAppStyle', OuterAppStyle)
  }
}

// Export default and named exports
export default VueChatWidget
export { OuterBotUi, OuterAppStyle }
