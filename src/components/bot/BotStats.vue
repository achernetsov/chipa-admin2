<script setup lang="ts">
import InteractionDetails from '@/components/stats/InteractionDetails.vue';
import Pages from '@/components/Pages.vue';

import { type Interaction, type Page } from '@/model/interactions';
import { dateTimeFormatted } from '@/utils';
import { useBotStore } from '@/stores/currentBot';
import { authHeaders } from '@/stores/keycloak';
import { onMounted, ref } from 'vue';

const interactions = ref<Interaction[]>()
const loading = ref(true)

const page = ref({
    from: 0,
    to: 0,
    overallPages: 0,
    overallInteractions: 0,
    currentPage: 0
} as Page)


interface Pages {
    amount: number,
    interactions: number,
    pageSize: number
}

function fetchBotRespondedEvents() {
    console.info(`fetching BotResponded events for page number ${page.value.currentPage + 1}...`)
    fetch('/api/stats/' + useBotStore().bot!.id + '/interactions?page=' + page.value.currentPage, { headers: authHeaders() })
        .then((response) => {
            // console.debug(response)
            if (response.ok) {
                return response.json();
            }
            throw new Error(`Error loading interactions: ${response.statusText}`);
        })
        .then((data: Interaction[]) => {
            interactions.value = data
            console.info('Stats page loaded.')

            page.value.from = page.value.currentPage * page.value.pageSize + 1
            page.value.to = page.value.from + page.value.pageSize - 1

            loading.value = false
        })
        .catch((err) => {
            interactions.value = []
            console.error(err)
            // TODO show error
        })
}

function fetchPages() {
    console.info("Loading pages...")
    fetch(`/api/stats/${useBotStore().bot!.id}/interactions/pages`)
        .then((response) => {
            // console.debug(response)
            if (response.ok) {
                return response.json()
            }
            throw new Error(response.statusText);
        })
        .then((data: Pages) => {
            page.value.overallPages = data.amount
            page.value.overallInteractions = data.interactions
            page.value.pageSize = data.pageSize
            console.info("Pages loaded: " + JSON.stringify(data))

            // fetching first page
            page.value.currentPage = 0
            fetchBotRespondedEvents()
        })
        .catch((err) => {
            interactions.value = []
            console.error(err)
            // TODO show error
        })
}

onMounted(() => {
    fetchPages()
})

function toggleInteractionDetails(interaction: Interaction) {
    for (var i of interactions.value!) {
        if (i != interaction) {
            i.showingDetails = false
        }
    }
    interaction.showingDetails = !interaction.showingDetails
}
</script>

<template>
    <div id="bot-stats-tab" class="overflow-x-auto">
        <button v-if="loading" class="btn loading mt-6">loading</button>
        <div v-if="!loading">
            <table class="table w-full">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Info</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="interaction in interactions">
                        <tr :class="interaction.showingDetails ? 'active' : ''">
                            <td>
                                <!-- https://www.geeksforgeeks.org/how-to-implement-datetime-localization-in-vue-js/ -->
                                {{ dateTimeFormatted(interaction.requestTimestamp) }}
                            </td>
                            <td>{{ interaction.requestText }}</td>
                            <td>{{ interaction.responseText }}</td>
                            <th>
                                <button @click="toggleInteractionDetails(interaction)"
                                    class="btn btn-ghost btn-xs">details</button>
                            </th>
                        </tr>
                        <tr v-if="interaction.showingDetails">
                            <td colSpan="4">
                                <InteractionDetails :interaction="interaction" />
                            </td>
                        </tr>
                    </template>

                </tbody>
            </table>
            <Pages class="text-right pr-4 pt-4" :page="page" @pageChanged="fetchBotRespondedEvents"/>
        </div>
    </div>
</template>