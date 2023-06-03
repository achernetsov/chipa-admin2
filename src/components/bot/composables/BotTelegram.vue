<script setup lang="ts">
import { ref } from 'vue';
import { useBotStore } from '@/stores/currentBot';
import { postHeaders } from '@/stores/keycloak';

const botStore = useBotStore()

interface Token {
    token: ''
}
const tokenRequest = ref({token: ''} as Token)
const error = ref<Error>()

function saveToken() {
    console.log('Saving telegram token...')
    error.value = undefined
    let saveTokenJson = JSON.stringify(tokenRequest.value)
    fetch(`/api/bots/${botStore.bot!.id}/telegram_token`, postHeaders(saveTokenJson))
        .then((response) => {
            // console.debug(response)
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(data => {
            console.debug(data)
            botStore.bot!.telegramTokenSaved = true
            console.info("Telegram token saved")
        })
        .catch((err: Error) => {
            console.error(err)
            error.value = err
        })
}
</script>

<template>
    <div id="telegram-token-ctr" class="space-y-6">
        <div id="telegram-token-info" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- <div class="form-control w-full max-w-xs"> -->
            <div class="form-control w-full">
                <label class="label">
                    <span v-if="!botStore.bot!.telegramTokenSaved" class="label-text">Save telegram token to bind telegram bot
                        <a href="https://core.telegram.org/bots/features#botfather" target="_blank"
                            class="link link-secondary">(instructions)</a>
                    </span>
                    <span v-if="botStore.bot!.telegramTokenSaved" class="label-text">Telegram token is saved, update it here if you changed it
                        <a href="https://core.telegram.org/bots/features#botfather" target="_blank"
                            class="link link-secondary">(telegram instructions)</a>
                    </span>
                </label>

                <input v-model="tokenRequest.token" type="text" placeholder="Copy telegram token here"
                    class="input input-bordered w-full" />
            </div>
        </div>

        <div id="form-actions" class="card-actions justify-start">
            <button class="btn btn-primary" @click="saveToken" :disabled="tokenRequest.token === ''">
                <span v-if="!botStore.bot!.telegramTokenSaved">Save telegram token</span>
                <span v-if="botStore.bot!.telegramTokenSaved">Update telegram token</span>
            </button>
            <!-- <button v-if="!botStore.bot?.telegramToken" class="btn btn-primary">Save telegram token</button>
            <button v-if="botStore.bot?.telegramToken" class="btn btn-primary">Update telegram token</button> -->
        </div>

        <div v-if="error" class="alert alert-error justify-start lg:w-1/2 ">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg> -->
            <span>Telegram token saving failed: {{ error.message }}</span>
        </div>
    </div>
</template>