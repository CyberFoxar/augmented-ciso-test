import { defineStore } from "pinia";
import { getItem, setItem } from "../lib/localstorageUtils";

export const useAuthStore = defineStore("auth-store", {
    state: () => {
        return {
            authToken: '',
            email: '',
        }
    },

    actions: {
        initFromLocalStorage() {
            this.authToken = getItem('authToken');
            this.email = getItem('email');
            if (!this.authToken) {
                console.log("no auth token !")
            }
        },
        saveToLocalStorage() {
            setItem('authToken', this.authToken);
            setItem('email', this.email);
        },
        /**
         * try to register a user.
         * @param {() => any} onSuccess called when user properly authenticated
         * @param {(e: any)} onFailure called if there was an error in the process
         */
        authUser(email, name, onSuccess, onFailure) {
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
                    name: name,
                    email: email
                })
            }).then(async (response) => {
                const body = await response.json();
                if (!body) {
                    console.error("No body !", response);
                }
                const token = body.token;
                this.authToken = token;
                this.email = email;
                this.saveToLocalStorage();
                if (typeof onSuccess === 'function') {
                    onSuccess();
                }
            }).catch((e) => {
                if (typeof onFailure === 'function') {
                    onFailure(e);
                }
            });
        },
        logout() {
            this.authToken = '';
            this.email = '';
            this.saveToLocalStorage();
        }
    }
});

