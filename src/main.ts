import './style.css';

import { useKeycloakStore } from '@/stores/keycloak';
import Keycloak, { type KeycloakConfig, type KeycloakInitOptions } from "keycloak-js";
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

const app = createApp(App)

app.use(createPinia())
app.use(router)

let keycloakConfig: KeycloakConfig = {
    url: import.meta.env.VITE_KEYCLOAK_URL as string,
    realm: import.meta.env.VITE_KEYCLOAK_REALM as string,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT as string
}
let keycloak = new Keycloak(keycloakConfig)
const keycloakStore = useKeycloakStore()
keycloakStore.keycloak = keycloak

let initOptions: KeycloakInitOptions = {
    onLoad: 'login-required',
    redirectUri: import.meta.env.VITE_KEYCLOAK_REDIRECT_URL as string,
    enableLogging: false
}

let keycloakEnabled: boolean = JSON.parse(import.meta.env.VITE_KEYCLOAK_ENABLED)
if (keycloakEnabled) {
    console.info('Keycloak is enabled')
    keycloak.init(initOptions).then(auth => {
        if (!auth) {
            console.warn('Authentication failed')
        } else {
            console.info('Authenticated')
            app.mount('#app')
        }

        //Token Refresh
        setInterval(() => {
            keycloak.updateToken(70).then((refreshed) => {
                if (refreshed) {
                    console.debug('Token refreshed')
                } else {
                    console.warn('Token not refreshed')
                }
            }).catch(() => {
                console.error('Failed to refresh token');
            });
        }, 50000)
    }).catch(() => console.error("Authentication failed"))
} else {
    console.info('Keycloak is not enabled')
    app.mount('#app')
}


