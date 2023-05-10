<script setup lang="ts">
import BotCardParrot from '@/assets/BotCardParrot.vue'

import { RouterLink } from 'vue-router';
import { type Bot } from '@/model/bots';
import { type PropType } from 'vue';
import { lang } from '@/i18n/i18'

defineProps({
    bot: { type: Object as PropType<Bot>, required: true }
})
</script>

<template>
    <div class="card bg-base-100">
        <div class="card-body items-center text-center">
            <div class="flex gap-4 flex-wrap overflow-x-auto">
                <BotCardParrot />
                <h2 class="card-title max-w-xs whitespace-nowrap">{{ bot.name }}</h2>
            </div>
            <div class="badge badge-secondary">{{ lang(bot.language) }}</div>
            <p class="">{{ bot.description }}</p>
            <div class="card-actions justify-end">
                <!-- named route does not work for some reason; doesn't redirect to bots/id/info tab-->
                <!-- <RouterLink :to="{name: 'editBotHome', params: {id: bot.id}}"> -->
                <RouterLink :to="`/bots/${bot.id}/info`">
                    <button class="btn btn-primary">Edit</button>
                </RouterLink>
                <RouterLink :to="`/bots/${bot.id}/stats`">
                    <button v-if="bot.csvSaved" class="btn btn-primary">Stats</button>
                </RouterLink>
            </div>
        </div>
    </div>
</template>