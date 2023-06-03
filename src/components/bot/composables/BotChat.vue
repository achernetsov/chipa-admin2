<script setup lang="ts">
import { ref } from 'vue'
import { useBotStore } from '@/stores/currentBot';

const botStore = useBotStore()
const question = ref('')
const answer = ref<string>()

const error = ref<String>()

function ask() {
    error.value = undefined
    answer.value = undefined

    console.info(`Asking "${question.value}"...`)
    let request = { text: question.value }
    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const response = fetch('/api/chat/' + useBotStore().bot!.id, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(request)
    })
        .then(response => {
            if (response.ok) {
                // chat.value.error = ''
                return response.json()
            }
            throw new Error(response.statusText);
        })
        .then(data => {
            console.info('Bot response: ' + data.text)
            answer.value = data.text
        }
        )
        .catch((err: Error) => {
            console.error('Error while asking: ' + err)
            if (err.message == "Error: Payment Required") {
                // error.value = {alert: 'Account is suspended', description: 'please, make a subscription payment'}
                error.value = 'Account is suspended, please, make a subscription payment.'
            } else {
                error.value = err.message
            }
        })
}
</script>

<template>
    <div id="bot-chat-ctr" class="space-y-6">
        <div id="bot-chat" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-control md:col-span-2">
                <label class="label">
                    <span class="label-text">Ask something</span>
                </label>
                <textarea v-model="question" class="textarea textarea-bordered h-24"
                    placeholder="Type question here"></textarea>
            </div>
        </div>

        <div id="form-actions" class="card-actions justify-start">
            <button @click="ask" class="btn btn-primary">Ask</button>
        </div>

        <div v-if="answer" id="answer">
            <label class="label">
                    <span class="label-text">Bot response</span>
                </label>
            <textarea disabled v-model="answer" class="textarea textarea-bordered h-24 w-full"></textarea>
        </div>

        <div v-if="error" class="alert alert-error justify-start lg:w-1/2 ">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg> -->
            <span>Bot failed to answer! {{ error }}</span>
        </div>
    </div>
</template>