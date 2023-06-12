<script setup lang="ts">
import router from '@/router';
import { useBotStore } from '@/stores/currentBot';
import { postHeaders } from '@/stores/keycloak';
import { onBeforeMount, ref } from 'vue';

const botStore = useBotStore()
const availableLanguages = ref<String[]>()
const langNames = new Map<String,String>()
langNames.set('en-EN', 'English')
langNames.set('pl-PL', 'Polish')
langNames.set('ru-RU', 'Russian')

onBeforeMount(() => {
    console.debug('BotDescription component before mount')
    fetch('/api/property/availableLanguages')
        .then(response => {
            if (response.ok) {
                // chat.value.error = ''
                return response.json()
            }
            throw new Error(response.statusText);
        })
        .then(data => {
            console.info('Available languages: ' + data)
            availableLanguages.value = data

            if (botStore.bot!.language==''){
                botStore.bot!.language = availableLanguages.value![0].toString()
            }
        }
        )
        .catch((err: Error) => {
            console.error('Error loading available languages: ' + err)
        })
})

function save() {
    if (!valid()) {
        console.warn('Invalid bot form')
        return
    }
    console.info("Saving bot...")

    let botJson: string = JSON.stringify(botStore.bot!)

    fetch('/api/bots', postHeaders(botJson))
        .then((response) => {
            // console.debug(response)
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(data => {
            console.info("Bot saved: " + JSON.stringify(data))
            router.push({ name: 'editBot', params: { id: data.botId } })
                .then(() => botStore.bot!.id = data.botId)
        })
        // https://stackoverflow.com/a/38956175/827704
        // TODO move inside showToast https://gitlab.com/autofaqer-group/autofaqer-webapp/-/issues/1
        // .then(() => new Promise(resolve => setTimeout(resolve, 3000)))
        // .then(() => hideToast(botDescriptionNotification.value.id))
        .catch(err => console.error(err))
}

function valid() {
    return botStore.bot?.name && botStore.bot?.language != ''
}
</script>

<template>
    <div id="bot-description-ctr" class="space-y-6">
        <div id="bot-info" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- <div class="form-control w-full max-w-xs"> -->
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Name</span>
                </label>
                <input v-model="botStore.bot!.name" type="text" placeholder="Type name here"
                    class="input input-bordered w-full" />
            </div>
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Language</span>
                </label>
                <select v-if="availableLanguages" id="language-selector" v-model="botStore.bot!.language"
                    class="select select-bordered">
                    <!-- <option value="en-EN" selected>English</option>
                    <option value="pl-PL">Polish</option>
                    <option value="ru-RU">Russian</option> -->
                    <option v-for="l in availableLanguages" :value="l">{{ langNames.get(l) }}</option>
                </select>
            </div>
            <div class="form-control md:col-span-2">
                <label class="label">
                    <span class="label-text">Description</span>
                </label>
                <textarea v-model="botStore.bot!.description" class="textarea textarea-bordered h-24"
                    placeholder="Item description"></textarea>
            </div>
        </div>

        <div id="form-actions" class="card-actions justify-start">
            <button @click="save" class="btn btn-primary">Save</button>
        </div>
    </div>
</template>