<script setup lang="ts">
import BotDescription from './composables/BotDescription.vue';
import CsvUpload from './composables/CsvUpload.vue'
import CsvReupload from './composables/CsvReupload.vue'

import { useBotStore } from '@/stores/currentBot';

const botStore = useBotStore()
</script>

<template>
    <div id="edit-bot-ctr" class="mt-6 space-y-6">
        <BotDescription />
        <div v-if="botStore.bot!.id">
            <CsvUpload v-if="!botStore.bot!.csvSaved" />
            <CsvReupload v-if="botStore.bot!.csvSaved" />
        </div>
    </div>
</template>