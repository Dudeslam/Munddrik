import { createRouter, createWebHistory } from 'vue-router'
import GameBar from './components/GameBar.vue'
import HomeView from './components/HomeView.vue'
import Editor from './components/Editor.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: HomeView
    },
    {
      path: '/game',
      name: 'game',
      component: GameBar
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor
    }
  ]
})

export default router
