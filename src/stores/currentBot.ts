import { type Bot } from '@/model/bots'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// Store for editing bot from several components
export const useBotStore = defineStore('bot', () => {
  const bot = ref<Bot>()

  return { bot }
})

export function initNewBot() {
  useBotStore().bot = {
    id: null,
    name: '',
    description: '',
    language: ''
  } as Bot
}