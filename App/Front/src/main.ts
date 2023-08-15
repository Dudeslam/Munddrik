import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import VueCookies from 'vue3-cookies'


const app = createApp(App)
app.use(VueCookies)
app.use(createPinia())
app.use(router)
app.mount('#app')
