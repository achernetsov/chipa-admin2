<script setup lang="ts">
import SomethingWrongError from '@/components/errors/SomethingWrongError.vue'
import PageContentLayout from '@/containers/PageContentLayout.vue'

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
            throw new Error(`status: ${response.status}; message: ${response.statusText}`);
        })
        .then((data) => {
            bots.value = data
            console.info('Loaded ' + bots!.value!.length + ' bots')
            if (bots.value!.length == 0){
                console.log('Redirecting to first bot page')
                router.push('/welcome')
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
        <button v-if="!error" class="btn loading">loading</button>
        
        <SomethingWrongError v-if="error" />
    </PageContentLayout>
</template>