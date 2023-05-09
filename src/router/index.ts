import { createRouter, createWebHistory } from 'vue-router'
import BotsView from '@/views/BotsView.vue'
import BotView from '@/views/BotView.vue'
import EditBot from '@/components/bot/EditBot.vue'
import BotStats from '@/components/bot/BotStats.vue'
import LogoutView from '@/views/LogoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'bots' }
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('@/views/WelcomeView.vue'),
    },
    {
      path: '/bots',
      name: 'bots',
      component: BotsView,
    },
    {
      path: '/bots/:id',
      name: 'editBot',
      component: () => import('@/views/BotView.vue'),
      children: [
        {
          path: '',
          name: 'editBotHome',
          redirect: { name: 'editBot' },
        },
        {
          name: 'editBot',
          path: 'info',
          component: EditBot,
        },
        {
          name: 'botStats',
          path: 'props',
          component: BotStats,
        },
      ],
    },
    {
      path: '/bots/new',
      name: 'newBot',
      component: BotView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView
    }
  ]
})

export default router
