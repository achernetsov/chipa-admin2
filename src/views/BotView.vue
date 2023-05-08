<script setup lang="ts">
import BotForm from '@/components/BotForm.vue';
import PageContentLayout from '@/containers/PageContentLayout.vue';

import { onBeforeMount } from 'vue';
import { type Bot } from '@/model/bots';
import { useBotStore, initNewBot } from '@/stores/currentBot';
import { useRoute } from 'vue-router';
import { authHeaders } from '@/stores/keycloak'
import router from '@/router';

const route = useRoute()
const botStore = useBotStore()
const botId: string = route.params.id as string

function isNewBot() {
    return botId == undefined
}

onBeforeMount(() => {
    botStore.bot = undefined
    if (isNewBot()) {
        console.info("Initializing new bot...")
        initNewBot()
        console.info("New bot initialized")
    } else {
        console.info(`Loading bot; id=${botId}...`)

        // TODO active tab
        // activeTab.value = Tabs.EditBot

        fetch('/api/bots/' + botId, {headers: authHeaders()})
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then((data: Bot) => {
                botStore.bot = data
                console.info(`Bot loaded {id: ${data.id}, name: ${data.name}}`)
            })
            .catch((err) => {
                console.error(err)
                router.go(0)
            })
    }
})
</script>
<template>
    <button v-if="!botStore.bot" class="btn loading">loading</button>
    <PageContentLayout v-else>
        <BotForm />
    </PageContentLayout>
</template>