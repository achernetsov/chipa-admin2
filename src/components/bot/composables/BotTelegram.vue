<script setup lang="ts">
import { useBotStore } from '@/stores/currentBot';

const botStore = useBotStore()
</script>

<template>
    <div id="telegram-token-ctr" class="space-y-6">
        <div id="telegram-token-info" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- <div class="form-control w-full max-w-xs"> -->
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Telegram token 
                    <a href="https://core.telegram.org/bots/features#botfather"
                            target="_blank" class="link link-secondary">(instructions)</a>
                        </span>
                </label>

                <input v-model="botStore.bot!.telegramToken" type="text" placeholder="Copy telegram token here"
                    class="input input-bordered w-full" />
            </div>
        </div>

        <div id="form-actions" class="card-actions justify-start">
            <button v-if="!botStore.bot?.telegramToken" class="btn btn-primary">Save telegram token</button>
            <button v-if="botStore.bot?.telegramToken" class="btn btn-primary">Update telegram token</button>
        </div>
    </div>
</template>