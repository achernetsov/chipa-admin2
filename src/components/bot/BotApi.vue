<script setup lang="ts">
import { useBotStore } from '@/stores/currentBot';

const botStore = useBotStore()

const questionExample = new Map<string, string>([
    ["en-EN", "Some question"],
    ["ru-RU", "Текст вопроса"],
    ["pl-PL", "Tekst pytania"]
]);

const answerExample = new Map<string, string>([
    ["en-EN", "Some answer"],
    ["ru-RU", "Ответ"],
    ["pl-PL", "Odpowiadać"]
]);

function getQuestionExample(): string {
    return questionExample.get(botStore.bot!.language) as string
}

function getAnswerExample(): string {
    return answerExample.get(botStore.bot!.language) as string
}

function getApiLocation(): string {
    return window.location.origin + '/api/chat/' + botStore.bot!.id
}
</script>

<template>
    <div id="bot-api-ctr" class="m-6 space-y-6">
        <article class="prose lg:prose-xl max-w-xl mx-auto md:max-w-4xl">
            <h3>Request / Response</h3>
            <p>
                HTTP Method: POST<br>
                URL: {{ getApiLocation() }}<br>
                Content-Type: application/json<br>
                Body: {'text':'{{ getQuestionExample() }}'}
            </p>
            <p>Response example:<br>
                Body: {'text': '{{ getAnswerExample() }}'}
            </p>
            <h3>
                Curl example
            </h3>
            <div class="bg-secondary-content">
                <span>
                    curl -X 'POST' \<br>
                    '{{ getApiLocation() }}' \<br>
                    -H 'accept: application/json' \<br>
                    -H 'Content-Type: application/json' \<br>
                    -d '{<br>
                    "text": "{{ getQuestionExample() }}"<br>
                    }'

                </span>
            </div>
        </article>
    </div>
</template>