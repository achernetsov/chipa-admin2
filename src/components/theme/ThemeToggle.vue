<script setup lang="ts">
import { MoonIcon } from '@heroicons/vue/24/solid'
import { SunIcon } from '@heroicons/vue/24/solid'
import { themeChange } from 'theme-change'
import { onMounted, ref } from 'vue'
import { findCurrentTheme } from './theme'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

onMounted(()=>{
    themeChange(false)

    themeStore.theme = findCurrentTheme()!
    console.info(`Theme: ${themeStore.theme}`)
})

function onThemeToggle(){
    const previousTheme = findCurrentTheme()
    console.info(`Changing theme from: ${previousTheme}`)

    useThemeStore().theme = previousTheme == 'dark'? 'winter': 'dark'
}
</script>

<!-- https://github.com/saadeghi/theme-change -->
<template>
    <button @click="onThemeToggle()" class="btn gap-2 btn-ghost" data-toggle-theme="dark,winter" data-act-class="ACTIVECLASS">
        <MoonIcon v-if="themeStore.theme=='winter'" class="flex-1 w-5" />
        <SunIcon v-if="themeStore.theme=='dark'" class="flex-1 w-5" />
    </button>
</template>