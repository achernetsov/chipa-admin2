<script setup lang="ts">
import BotCard from './BotCard.vue';

import { type PropType } from 'vue';
import { type Bot } from '@/model/bots';

defineProps({
    bots: {type: Object as PropType<Bot[]>, required: true}
})
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <BotCard v-for="bot in bots" :bot="bot">
        </BotCard>
    </div>
</template>