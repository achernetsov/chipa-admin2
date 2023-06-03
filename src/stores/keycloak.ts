import type Keycloak from "keycloak-js";
import { defineStore } from 'pinia';
import { ref } from 'vue';

const keycloakEnabled: boolean = JSON.parse(import.meta.env.VITE_KEYCLOAK_ENABLED)

export const useKeycloakStore = defineStore('keycloakStore', () => {
    const keycloak = ref<Keycloak>()

    return { keycloak }
})

export function authHeaders(): Headers {
    var myHeaders = new Headers()
    if (keycloakEnabled) {
        myHeaders.append('Authorization', `Bearer ${useKeycloakStore().keycloak!.token}`)
    }
    return myHeaders
}

export function postHeaders(bodyJson: string) {
    var myHeaders = authHeaders()
    myHeaders.append('Content-Type', 'application/json');
    return {
        method: 'POST',
        headers: myHeaders,
        body: bodyJson
    };
}