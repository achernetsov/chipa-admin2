<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { RouterView } from 'vue-router';
</script>

<!-- https://daisyui.com/components/drawer/ -->
<template>
    <div class="drawer">
        <div class="drawer-content flex flex-col bg-base-200">
            <Navbar />
            <!-- Page content here -->
            <RouterView />
            <!-- <Footer/> -->
        </div>
    </div>
</template>