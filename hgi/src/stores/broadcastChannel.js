export const bc = new BroadcastChannel('Bs');

import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useBroadcastChannel = defineStore('BroadcastChanneler',
    () => {
        const flag = ref(1)
        const msg = ref(null)
        function postMessage(data) {
            msg.value = data;
            flag.value += 1;
        }
        return { msg, flag, postMessage }
    }
)