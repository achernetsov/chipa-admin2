<script setup lang="ts">
import HeroParrot from '@/assets/HeroParrot.vue';

import { RouterLink } from 'vue-router'
</script>

<!-- https://daisyui.com/components/hero/ -->
<template>
    <div class="hero h-4/5">
        <!-- <div class="hero-content flex-col lg:flex-row"> -->
        <div class="hero-content w-screen">
            <!-- <img src="/images/stock/photo-1635805737707-575885ab0820.jpg" class="max-w-sm rounded-lg shadow-2xl" /> -->
            <HeroParrot />
            <div>
                <h1 class="text-5xl font-bold">Welcome to Chipa bots!</h1>
                <p class="py-6">You have no bots yet.<br />Let's create one!</p>
                <RouterLink :to="{ name: 'newBotHome' }">
                    <button class="btn btn-primary">Create first bot</button>
                </RouterLink>
            </div>
        </div>

    </div>
</template>