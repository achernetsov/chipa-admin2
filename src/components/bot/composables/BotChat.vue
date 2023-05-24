<script setup lang="ts">
import { ref } from 'vue'
import { useBotStore } from '@/stores/currentBot';

const botStore = useBotStore()
const question = ref('')
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
            <button class="btn btn-primary">Ask</button>
        </div>
    </div>
</template>