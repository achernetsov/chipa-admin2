import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// https://daisyui.com/docs/themes/
const dark = 'dark'
const light = 'winter'

// TODO get it from styles
const darkPrimaryColor = '#661ae6'
const darkSecondaryColor = '#d926aa'
const darkAccentColor = '#1fb2a5'
const darkPrimaryContentColor = '#ffffff'
const darkNeutralColor = '#191d24'
const darkNeutralContentColor = '#a6adbb'

const lightPrimaryColor = '#047aff'
const lightSecondaryColor = '#463aa2'
const lightAccentColor = '#c148ac'
const lightPrimaryContentColor = '#cde4ff'
const lightNeutralColor = '#021431'
const lightNeutralContentColor = '#a3c6ff'

export const useThemeStore = defineStore('themeStore', () => {
  const theme = ref<String>()
  const accentColor = computed(() => theme.value == dark? darkAccentColor: lightAccentColor)
  const primaryColor = computed(() => theme.value == dark? darkPrimaryColor: lightPrimaryColor)
  const secondaryColor = computed(() => theme.value == dark? darkSecondaryColor: lightSecondaryColor)
  const primaryContentColor = computed(() => theme.value == dark? darkPrimaryContentColor: lightPrimaryContentColor)
  const neutralColor = computed(() => theme.value == dark? darkNeutralColor: lightNeutralColor)
  const neutralContentColor = computed(() => theme.value == dark? darkNeutralContentColor: lightNeutralContentColor)
  return { theme, primaryColor, secondaryColor, primaryContentColor, accentColor, neutralColor, neutralContentColor }
})

export function findCurrentTheme() {
  return document.querySelector("html")!.attributes.getNamedItem('data-theme')!.nodeValue
}