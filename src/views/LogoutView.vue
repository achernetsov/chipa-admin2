<script setup lang="ts">
import PageContentLayout from '@/containers/PageContentLayout.vue'
import { useKeycloakStore } from '@/stores/keycloak';

function logout() {
    console.info('Logging out...')
    useKeycloakStore().keycloak?.logout()
}
</script>

<template>
    <PageContentLayout>
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body items-center space-y-2">
                <h2 class="card-title">Logging out</h2>
                <p>Do you want to logout?</p>
                <div class="card-actions justify-center">
                    <button @click="logout" class="btn btn-primary">Logout</button>
                </div>
            </div>
        </div>
    </PageContentLayout>
</template>