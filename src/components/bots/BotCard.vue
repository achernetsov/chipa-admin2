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
    <div class="card bg-primary text-primary-content">
        <div class="card-body items-center text-center">
            <div class="flex gap-4 flex-wrap overflow-x-auto">
                <BotCardParrot/>
                <h2 class="card-title max-w-xs whitespace-nowrap">{{ bot.name }}</h2>
            </div>
            <div class="badge badge-secondary">{{ lang(bot.language) }}</div>
            <p class="">{{ bot.description }}</p>
            <div class="card-actions justify-end">
                <button class="btn btn-info">Edit</button>
                <button v-if="bot.csvSaved" class="btn btn-info">Stats</button>
            </div>
        </div>
    </div>
</template>