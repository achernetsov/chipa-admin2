<script setup lang="ts">
import { PlusCircleIcon } from '@heroicons/vue/24/solid';
import BotCard from './BotCard.vue';

import { type Bot } from '@/model/bots';
import { type PropType } from 'vue';
import { RouterLink } from 'vue-router';

defineProps({
    bots: { type: Object as PropType<Bot[]>, required: true }
})
</script>

<template>
    <!-- <div class="grid grid-cols-1 gap-6 lg:gap-8" :class="bots.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : ''">
        <BotCard class="" v-for="bot in bots" :bot="bot">
        </BotCard>
    </div> -->
    <div class="flex flex-col space-y-4 md:space-y-6">
        <div class="grid grid-cols-1 gap-6 lg:gap-8" :class="bots.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : ''">
            <BotCard class="" v-for="bot in bots" :bot="bot">
            </BotCard>
        </div>
        <div id="buttons" class="flex md:col-span-2 lg:col-span-3 justify-center">
            <RouterLink :to="{ name: 'newBotHome' }">
                <button class="btn btn-secondary btn-outline gap-2">
                    <PlusCircleIcon class="w-6 h-6" />
                    Create bot
                </button>
            </RouterLink>
        </div>
    </div>
</template>