import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VuePapaParse from 'vue-papa-parse'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VuePapaParse)
app.provide('$papa', app.config.globalProperties.$papa)
app.mount('#app')
