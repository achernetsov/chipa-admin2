<script setup lang="ts">
import InteractionDetails from '../stats/InteractionDetails.vue';

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

function fetchBotRespondedEvents(newPage: number) {
    page.value.currentPage = newPage
    console.info('fetching BotResponded events...')
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

            // footer info
            page.value.from = page.value.currentPage * page.value.pageSize + 1
            page.value.to = page.value.from + page.value.pageSize - 1

            loading.value = false
            // pageSwitching.value = false
        })
        .catch((err) => {
            interactions.value = []
            console.error(err)
            // TODO show error
        })
}

onMounted(() => {
    fetchBotRespondedEvents(page.value.currentPage)
})

function toggleInteractionDetails(interaction: Interaction){
    for (var i of interactions.value!){
        if (i!=interaction){
            i.showingDetails=false
        }
    }
    interaction.showingDetails = !interaction.showingDetails
}
</script>

<template>
    <div id="bot-stats-tab" class="overflow-x-auto">
        <button v-if="loading" class="btn loading mt-6">loading</button>
        <table v-if="!loading" class="table w-full">
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
                    <tr :class="interaction.showingDetails? 'active': ''">
                        <td>
                            <!-- https://www.geeksforgeeks.org/how-to-implement-datetime-localization-in-vue-js/ -->
                            {{ dateTimeFormatted(interaction.requestTimestamp) }}
                        </td>
                        <td>{{ interaction.requestText }}</td>
                        <td>{{ interaction.responseText }}</td>
                        <th>
                            <button @click="toggleInteractionDetails(interaction)" class="btn btn-ghost btn-xs">details</button>
                        </th>
                    </tr>
                    <tr v-if="interaction.showingDetails">
                        <td colSpan="4">
                            <InteractionDetails :interaction="interaction"/>
                        </td>
                    </tr>
                </template>

            </tbody>
        </table>
    </div>
</template>