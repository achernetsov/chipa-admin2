<script setup lang="ts">
import { type Interaction } from '@/model/interactions';
import { dateTimeFormatted } from '@/utils';
import { type PropType } from 'vue';

// https://vuejs.org/api/utility-types.html#proptype-t
defineProps({
    interaction: Object as PropType<Interaction>
})
</script>

<template>
    interaction details
</template>

<template>
    <div class="relative overflow-x-auto">
        <h3 class="mb-4 text-l font-bold text-gray-900 dark:text-white">Interaction</h3>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Time
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Question
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Answer
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="px-6 py-4">
                        <!-- https://www.geeksforgeeks.org/how-to-implement-datetime-localization-in-vue-js/ -->
                        {{ dateTimeFormatted(interaction!.requestTimestamp) }}
                    </td>
                    <td class="px-6 py-4">
                        {{ interaction!.requestText }}
                    </td>
                    <td class="px-6 py-4">
                        <!-- {{ interaction!.searchResult?.[0].response }} -->
                        {{ interaction!.responseText }}
                    </td>
                </tr>

            </tbody>
        </table>
        <h3 class="mt-8 mb-4 text-l font-bold text-gray-900 dark:text-white">Search details</h3>
        <div class="mb-4 text-xs text-gray-700 uppercase dark:text-gray-400">
            <p>Distance threshold: {{ interaction!.searchThreshold }}</p>
        </div>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Distance
                    </th>
                    <th scope="col" class="px-6 py-3">
                        CSV question
                    </th>
                    <th scope="col" class="px-6 py-3">
                        CSV answer
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="r in interaction!.searchResult"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="px-6 py-4">
                        {{ r.distance }}
                    </td>
                    <td class="px-6 py-4">
                        {{ r.requestInCsv }}
                    </td>
                    <td class="px-6 py-4">
                        {{ r.response }}
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
</template>