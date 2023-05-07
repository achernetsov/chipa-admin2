import { defineStore } from 'pinia'
import { ref } from 'vue'

// Store for editing bot from several components
export const useThemeStore = defineStore('themeStore', () => {
  const theme = ref<String>()

  return { theme }
})