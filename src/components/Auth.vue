<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/userAuth'

let nameValue = ref('string');
let emailValue = ref('user@example.com');

const authStore = useAuthStore();

/**
 * Submit form to try to register a user.
 * @param {() => any} onSuccess called when user properly authenticated
 * @param {(e: any)} onFailure called if there was an error in the process
 */
function submit(onSuccess, onFailure) {
    console.log(nameValue.value, emailValue.value);
    authStore.authUser(emailValue.value, nameValue.value, onSuccess, onFailure);
}

function logout() {
    authStore.logout();
}

</script>

<template>
    <form v-if="!authStore.email || !authStore.authToken">
        <input type="email" placeholder="email@example.com" v-model="emailValue">
        <input type="text" placeholder="Player Name" v-model="nameValue">
        <button type="submit" @click.prevent="submit()">Register</button>
    </form>
    <div v-else>
        Currently authenticated with email {{authStore.email}}. 
        <button @click="logout()">Logout</button>
    </div>
</template>