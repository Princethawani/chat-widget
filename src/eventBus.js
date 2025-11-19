import {reactive} from 'vue'

export const chatWidgetBus = reactive({
    startChatRequested: false,

    openChat(){
        this.startChatRequested = true
    }
})