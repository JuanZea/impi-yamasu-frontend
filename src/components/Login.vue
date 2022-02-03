<template>
    <div class="font-rowdies flex h-full w-full flex-col items-center p-10">
        <h1 class="text-6xl text-green-700 underline">Impi Yamasu</h1>
        <div class="mt-20 flex flex-grow flex-col items-center">
            <h2 class="animate-growel mb-10 text-3xl text-gray-800">Login</h2>
            <div class="flex flex-col gap-4 rounded-lg bg-black bg-opacity-25 p-10">
                <div class="flex gap-4">
                    <div class="grid grid-rows-2 items-center justify-end gap-4">
                        <label class="font-bold text-gray-800" for="battle">Battle</label>
                        <label class="font-bold text-gray-800" for="battle">Nick</label>
                    </div>
                    <div class="grid grid-rows-2 gap-4">
                        <input v-model="id" class="input" id="battle" type="number" />
                        <input v-model="player" class="input" id="battle" type="text" />
                    </div>
                </div>
                <button
                    @click="create"
                    type="button"
                    class="button bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 focus:ring-offset-green-300"
                >
                    <PlusCircleIcon class="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                    Create
                </button>
                <button
                    @click="join"
                    type="button"
                    class="button bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-300"
                >
                    <PlayIcon class="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                    Join
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import state from '../js/state';
import axios from 'axios';
import { PlayIcon, PlusCircleIcon } from '@heroicons/vue/outline';
import { ref } from 'vue';
export default {
    components: { PlayIcon, PlusCircleIcon },
    setup() {
        const id = ref();
        const player = ref();

        const create = () => {
            axios.post(`${state.apiUrl}/create-battle/`, { id: id.value, player: player.value }).then(() => {
                state.view = 'connecting';
                state.id = id.value;
                state.rol = 'host';
                state.host = player.value;
            });

            const interval = setInterval(() => {
                axios.post(`${state.apiUrl}/battle-info/`, { id: id.value }).then(res => {
                    if (!res.data.open) {
                        state.guest = res.data.guestPlayer;
                        state.view = 'perks'
                        clearInterval(interval);
                    }
                });
            }, 1000);
        };

        const join = () => {
            axios
                .post(`${state.apiUrl}/join-battle/`, { id: id.value, player: player.value })
                .then(res => {
                    state.id = id.value;
                    state.view = 'perks';
                    state.rol = 'guest';
                    state.host = res.data.hostPlayer;
                    state.guest = player.value;
                })
                .catch(() => {
                    state.view = 'battleClosed';
                });
        };

        return { id, player, create, join };
    },
};
</script>
