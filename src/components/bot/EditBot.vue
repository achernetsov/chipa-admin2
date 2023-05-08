<script setup lang="ts">
import { useBotStore } from '@/stores/currentBot'

const botStore = useBotStore()
</script>

<template>
    <div id="item-info-tab" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- <div class="form-control w-full max-w-xs"> -->
        <div class="form-control w-full">
            <label class="label">
                <span class="label-text">Name</span>
            </label>
            <input v-model="botStore.bot!.name"  type="text" placeholder="Type name here" class="input input-bordered w-full" />
        </div>
        <div class="form-control w-full">
            <label class="label">
                <span class="label-text">Language</span>
            </label>
            <select v-model="botStore.bot!.language" class="select select-bordered">
                <option value="en-EN" selected>English</option>
                <option value="pl-PL">Polish</option>
                <option value="ru-RU">Russian</option>
            </select>
        </div>
        <div class="form-control md:col-span-2">
            <label class="label">
                <span class="label-text">Description</span>
            </label>
            <textarea v-model="botStore.bot!.description" class="textarea textarea-bordered h-24" placeholder="Item description"></textarea>
        </div>
    </div>

    <div id="form-actions" class="card-actions justify-start">
        <button class="btn btn-primary">Save</button>
    </div>
</template>