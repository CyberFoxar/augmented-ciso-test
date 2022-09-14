import { defineStore } from "pinia";
import { ref } from "vue"

export const useAuthStore = defineStore("auth-store", {
    state: () => {
        return {
            authToken: '',
        }
    },

    actions: {
        initFromLocalStorage() {
            if (!storageAvailable('localStorage')) {
                console.error("No localStorage, tokens and state will not be persisted.");
                console.error(storageAvailable('localStorage'));
                return;
            }
            this.authToken = localStorage.getItem('authToken');
            if(!this.authToken){
                console.log("no auth token !")
            }
        },
        saveToLocalStorage() {
            if (!storageAvailable('localStorage')) {
                console.error("No localStorage, tokens and state will not be persisted.");
                console.error(storageAvailable('localStorage'));
                return;
            }
            localStorage.setItem('authToken', this.authToken);
        }
    }
});

/**
 * Tests for a given storage capability
 * From: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 * Returns falsy undefined if storage available or an instance of DOMException if an error occured.
 * @param {string} type 
 * @returns {undefined | DOMException}
 */
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}
