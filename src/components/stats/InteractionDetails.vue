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
    <p>Distance threshold: {{ interaction!.searchThreshold }}</p>
    <div class="overflow-x-auto">
        <table class="table w-full">
            <!-- head -->
            <thead>
                <tr>
                    <th></th>
                    <th>Distance</th>
                    <th>CSV question</th>
                    <th>CSV answer</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="r in interaction!.searchResult">
                    <th>1</th>
                    <td>{{ r.distance }}</td>
                    <td>{{ r.requestInCsv }}</td>
                    <td><p class="w-96">{{ r.response }}</p></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
