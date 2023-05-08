<script setup lang="ts">
import BotCard from './BotCard.vue';

import { type PropType } from 'vue';
import { type Bot } from '@/model/bots';

defineProps({
    bots: {type: Object as PropType<Bot[]>, required: true}
})
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BotCard v-for="bot in bots" :id="bot.id!" :name="bot.name" :description="bot.description" :csv-saved="bot.csvSaved"
            :language="bot.language">
        </BotCard>
    </div>
</template>