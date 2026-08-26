import { createApp } from 'vue'
import { RenderUI } from '../src'
import './styles.css'
import App from './App.vue'

createApp(App).use(RenderUI).mount('#app')