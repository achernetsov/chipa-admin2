<script setup lang="ts">
import LogoBtn from './LogoBtn.vue'
import ThemeToggle from '@/components/theme/ThemeToggle.vue'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { RouterLink } from 'vue-router'
</script>

 <!-- https://daisyui.com/components/navbar/ -->
<template>
    <header>
        <div class="navbar bg-base-100">
            <div class="flex-1 gap-1">
                <RouterLink :to="{ name: 'home' }">
                    <LogoBtn />
                </RouterLink>
            </div>
            <div class="flex-none">
                <ul class="menu menu-horizontal px-1">
                    <li>
                        <ThemeToggle />
                    </li>
                    <li>
                        <RouterLink class="flex-1 w-14" :to="{ name: 'logout' }">
                            <XMarkIcon></XMarkIcon>
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>