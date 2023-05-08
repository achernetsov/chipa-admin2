<script setup lang="ts">
import BotCardParrot from '@/assets/BotCardParrot.vue'

import { type Bot } from '@/model/bots';
import { type PropType } from 'vue';
import { lang } from '@/i18n/i18'

defineProps({
    bot: { type: Object as PropType<Bot>, required: true }
})
</script>

<template>
    <div class="card w-fulllg:w-96 bg-primary text-primary-content">
        <div class="card-body items-center text-center">
            <div class="flex gap-4 flex-wrap overflow-x-auto">
                <BotCardParrot/>
                <h2 class="card-title max-w-xs whitespace-nowrap">{{ bot.name }}</h2>
            </div>
            <p>We are using cookies for no reason. We are using cookies for no reason.</p>
            <div class="card-actions justify-end">
                <button class="btn btn-secondary">Accept</button>
                <button class="btn btn-ghost">Deny</button>
            </div>
        </div>
    </div>
    <!-- <div class="card card-side bg-base-100 shadow-xl">
        <figure class="ml-2"><BotCardParrot/></figure>
        <div class="card-body">
            <h2 class="card-title">New movie is released!</h2>
            <p>Click the button to watch on Jetflix app.</p>
            <div class="card-actions justify-start">
                <button class="btn btn-primary">Watch</button>
            </div>
        </div>
    </div> -->
</template>