// // src/index.js
// // Import styles so consumers don't have to
// // import './styles/style.scss'

// // Import your main components
// import OuterBotUi from './components/Outer/BotUi.vue'
// import OuterAppStyle from './components/Outer/AppStyle.vue'

// const VueChatWidget = {
//   install(app, options = {}) {
//     // Provide configuration for theming
//     app.provide('chatWidgetConfig', options)

//     // Register main components
//     app.component('OuterBotUi', OuterBotUi)
//     app.component('OuterAppStyle', OuterAppStyle)
//   }
// }

// // Export default and named exports
// export default VueChatWidget
// export { OuterBotUi, OuterAppStyle }
// src/index.js

import OuterBotUi from './components/Outer/BotUi.vue'
import OuterAppStyle from './components/Outer/AppStyle.vue'
import { reactive } from 'vue'

const chatWidgetState = reactive({
  openChatFlag: false
})

const VueChatWidget = {
  install(app, options = {}) {
    app.provide('chatWidgetConfig', options)

    // expose openChat globally
    app.config.globalProperties.$chatWidget = {
      openChat() {
        chatWidgetState.openChatFlag = true
      }
    }

    // provide state so wrapper can react
    app.provide('chatWidgetState', chatWidgetState)

    app.component('OuterBotUi', OuterBotUi)
    app.component('OuterAppStyle', OuterAppStyle)
  }
}

export default VueChatWidget
export { OuterBotUi, OuterAppStyle }
