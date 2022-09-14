import { defineStore } from "pinia";
import { getItem, setItem } from "../lib/localstorageUtils";

export const useAuthStore = defineStore("auth-store", {
    state: () => {
        return {
            authToken: '',
        }
    },

    actions: {
        initFromLocalStorage() {
            this.authToken = getItem('authToken');
            if(!this.authToken){
                console.log("no auth token !")
            }
        },
        saveToLocalStorage() {
            setItem('authToken', this.authToken);
        }
    }
});

