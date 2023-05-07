<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body space-y-2">
            <h2 class="card-title">Ooops...</h2>
            <p>Something went wrong, please, try again later</p>
            <div class="card-actions justify-center">
                <button @click="router.go(0)" class="btn btn-primary">Refresh</button>
            </div>
        </div>
    </div>
</template>