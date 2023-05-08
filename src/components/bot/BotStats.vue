<script setup lang="ts">
import { useBotStore } from '@/stores/currentBot'

const botStore = useBotStore()
</script>

<template>
    stats
    <!-- <div id="item-proprs-tab" class="overflow-x-auto">
        <table class="table w-full">
            <thead>
                <tr>
                    <th></th>
                    <th>Property</th>
                    <th>Value</th>
                    <th>Comment</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(prop, index) in itemStore.item?.props">
                    <th>{{ index + 1 }}</th>
                    <td>{{ prop.name }}</td>
                    <td>{{ prop.value }}</td>
                    <td>{{ prop.comment }}</td>
                </tr>
            </tbody>
        </table>
    </div> -->
</template>