import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// https://daisyui.com/docs/themes/
const dark = 'dark'
const light = 'winter'

// TODO get it from styles
const darkPrimaryColor = '#661ae6'
const darkAccentColor = '#1fb2a5'
const darkPrimaryContentColor = '#ffffff'

const lightPrimaryColor = '#047aff'
const lightAccentColor = '#c148ac'
const lightPrimaryContentColor = '#cde4ff'

export const useThemeStore = defineStore('themeStore', () => {
  const theme = ref<String>()
  const accentColor = computed(() => theme.value == dark? darkAccentColor: lightAccentColor)
  const primaryColor = computed(() => theme.value == dark? darkPrimaryColor: lightPrimaryColor)
  const primaryContentColor = computed(() => theme.value == dark? darkPrimaryContentColor: lightPrimaryContentColor)
  return { theme, primaryColor, primaryContentColor, accentColor }
})

export function findCurrentTheme() {
  return document.querySelector("html")!.attributes.getNamedItem('data-theme')!.nodeValue
}