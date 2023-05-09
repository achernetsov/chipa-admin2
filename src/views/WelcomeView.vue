<script setup lang="ts">
import HeroParrot from '@/assets/HeroParrot.vue';

import { RouterLink } from 'vue-router'
</script>

<!-- https://daisyui.com/components/hero/ -->
<template>
    <div class="hero h-[75vh]">
        <div class="hero-content flex-col lg:flex-row">
        <!-- <div class="hero-content w-screen"> -->
            <!-- <img src="/images/stock/photo-1635805737707-575885ab0820.jpg" class="max-w-sm rounded-lg shadow-2xl" /> -->
            <HeroParrot class="max-w-sm"/>
            <div class="flex flex-col text-center lg:text-left">
                <h1 class="text-5xl font-bold">Welcome to Chipa bots!</h1>
                <p class="py-6">You have no bots yet,<br />Let's create one!</p>
                <RouterLink :to="{ name: 'newBot' }">
                    <button class="btn btn-secondary btn-outline">Create bot</button>
                </RouterLink>
            </div>
        </div>

    </div>
</template>