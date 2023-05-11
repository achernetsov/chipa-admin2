<script setup lang="ts">
import { type Page } from '@/model/interactions';
import { type PropType } from 'vue';

const props = defineProps({
    page: { type: Object as PropType<Page>, required: true }
})

function changePage(pageNumber: number) {
    console.info(`Changing page to ${pageNumber}`)
    props.page.currentPage = pageNumber
}
</script>

<template>
    <div>
        <button @click="changePage(pageNumber - 1)" class="btn btn-ghost btn-sm"
            :class="pageNumber == page!.currentPage + 1 ? 'btn-active' : ''" v-for="pageNumber in page!.overallPages"
            :key="pageNumber">{{ pageNumber }}</button>
    </div>
</template>