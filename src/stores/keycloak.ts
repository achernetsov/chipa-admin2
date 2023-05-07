// import type Keycloak from "keycloak-js";
import { defineStore } from 'pinia';
import { ref } from 'vue';

// export const useKeycloakStore = defineStore('keycloakStore', () => {
//     const keycloak = ref<Keycloak>()

//     return { keycloak }
// })

export function authHeaders(): Headers {
    var myHeaders = new Headers()
    // myHeaders.append('Authorization', `Bearer ${useKeycloakStore().keycloak!.token}`)
    return myHeaders
}