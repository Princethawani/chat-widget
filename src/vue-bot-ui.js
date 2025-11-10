/**
 * Minimal bootstrap to mount the widget on any page.
 * Include the compiled JS from dist and call window.GraceAI.mount().
 */
import { createApp } from 'vue'
import App from './App.vue'

(function(){
  window.GraceAI = {
    mount(elId = 'graceai-widget-root'){
      let el = document.getElementById(elId)
      if (!el){
        el = document.createElement('div')
        el.id = elId
        document.body.appendChild(el)
      }
      createApp(App).mount('#'+elId)
    }
  }
})();
