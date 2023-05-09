<script setup lang="ts">
import EditBot from './bot/EditBot.vue';

import { useBotStore } from '@/stores/currentBot';
import { onMounted } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';

const route = useRoute()
const botStore = useBotStore()
</script>

<template>
    <div id="form-card" class="card w-full lg:w-2/3 bg-base-100 shadow-xl p-6 space-y-6">
        <h2 class="card-title">Bot</h2>

        <!-- tab border full width: https://stackoverflow.com/a/76161483/827704 -->
        <div id="tabs" v-if="botStore.bot!.id">
            <div
                class="tabs bg-[linear-gradient(theme(colors.base-300),theme(colors.base-300))] bg-bottom bg-no-repeat bg-[length:100%_1px]">
                <RouterLink :to="{ name: 'editBot' }" class="tab tab-lifted"
                    :class="route.name?.toString() == 'editBot' ? 'tab-active' : ''">Edit bot</RouterLink>
                <RouterLink v-if="botStore.bot!.csvSaved" :to="{ name: 'botStats' }" class="tab tab-lifted"
                    :class="route.name?.toString() == 'botStats' ? 'tab-active' : ''">Stats</RouterLink>
            </div>
            <RouterView />
        </div>
        <div id="newBotInfo" v-else>
            <EditBot />
        </div>
    </div>
</template>