import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'VueChatWidget',
      fileName: (format) => `vue-chat-widget.${format}.js`
    },
    rollupOptions: {  
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    },
    cssCodeSplit: true // <- this will generate a separate style file automatically
  }
})
