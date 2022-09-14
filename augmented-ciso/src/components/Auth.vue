<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/userAuth'

let nameValue = ref('string');
let emailValue = ref('user@example.com');

const authStore = useAuthStore();

console.log(authStore.authToken)

/**
 * Submit form to try to register a user.
 * Need tidy up
 * @param {() => any} onSuccess called when user properly authenticated
 * @param {(e: any)} onFailure called if there was an error in the process
 */
function submit(onSuccess, onFailure) {
    console.log(nameValue.value, emailValue.value);
    const url = "https://tt.augmentedciso.com/register";
    // const url = "https://example.com/register"
    fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
            name: nameValue.value,
            email: emailValue.value
        })
    }).then(async (response) => {
        const body = await response.json();
        if(!body){
            console.error("No body !", response);
        }
        const token = body.token;
        authStore.authToken = token;
        authStore.saveToLocalStorage();
        if(typeof onSuccess === 'function'){
            onSuccess();
        }
    }).catch((e) => {
        if(typeof onFailure === 'function'){
            onFailure(e);
        }
    });
}

</script>

<template>
    <form>
        <input type="email" placeholder="email@example.com" v-model="emailValue">
        <input type="text" placeholder="Player Name" v-model="nameValue">
        <button type="submit" @click.prevent="submit()">Register</button>
    </form>
    <p>{{`email is ${emailValue} and name is ${nameValue}`}}</p>
</template>