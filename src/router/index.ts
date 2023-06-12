import BotStats from '@/components/bot/BotStats.vue'
import EditBot from '@/components/bot/EditBot.vue'
import BotApi from '@/components/bot/BotApi.vue'
import BotView from '@/views/BotView.vue'
import BotsView from '@/views/BotsView.vue'
import LogoutView from '@/views/LogoutView.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
      name: 'bot',
      component: BotView,
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
          name: 'botApi',
          path: 'api',
          component: BotApi,
        },
        {
          name: 'botStats',
          path: 'stats',
          component: BotStats,
        },
      ],
    },
    {
      path: '/bots/new',
      name: 'newBot',
      component: BotView,
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView
    }
  ]
})

export default router
