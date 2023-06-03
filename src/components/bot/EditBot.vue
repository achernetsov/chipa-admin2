<script setup lang="ts">
import BotDescription from './composables/BotDescription.vue';
import CsvUpload from './composables/CsvUpload.vue'
import BotChat from './composables/BotChat.vue'
import BotTelegram from './composables/BotTelegram.vue';

import { onBeforeMount } from 'vue';
import { useBotStore } from '@/stores/currentBot';

const botStore = useBotStore()

onBeforeMount(()=>{
    console.debug('EditBot component before mount')
})
</script>

<template>
    <div id="edit-bot-ctr" class="mt-6 space-y-6">
        <BotDescription />
        <div v-if="botStore.bot!.id">
            <div class="divider">csv</div> 
            <!-- <CsvUpload v-if="!botStore.bot!.csvSaved" /> -->
            <CsvUpload />
            <div v-if="botStore.bot!.csvSaved">
                <!-- <CsvReupload/> -->
                <div class="divider">testing (chat)</div>
                <BotChat/>
                <div class="divider">telegram integration</div>
                <BotTelegram/>
            </div>
        </div>
    </div>
</template>