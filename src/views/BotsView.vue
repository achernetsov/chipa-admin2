<script setup lang="ts">
import SomethingWrongError from '@/components/errors/SomethingWrongError.vue'
import PageContentLayout from '@/containers/PageContentLayout.vue'
import Bots from '@/components//bots/Bots.vue'

import { type Bot } from '@/model/bots'
import { authHeaders } from '@/stores/keycloak'
import { onMounted, ref } from 'vue'
import router from '@/router';

const error = ref(false)

const bots = ref<Bot[]>()

onMounted(() => {
    console.info("Loading bots...")

    fetch('/api/bots', { headers: authHeaders() })
        // fetch('/api/bots')
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(`Status: ${response.status}; message: ${response.statusText}`);
        })
        .then((data) => {
            console.info(`Loaded ${data?.length} bots`)
            if (data?.length == 0){
                console.info('Redirecting to first bot page')
                router.push('/welcome')
            } else if (data?.length>0){
                bots.value = data
            }
        })
        .catch((err) => {
            console.error(`Error on loading bots: ${err}`)
            error.value = true
        })
})
</script>

<template>
    <PageContentLayout>
        <button v-if="!error && !bots" class="btn loading">loading</button>
        <Bots v-if="bots" :bots="bots"></Bots>
        <SomethingWrongError v-if="error" />
    </PageContentLayout>
</template>