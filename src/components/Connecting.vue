<template>
    <div class="flex h-full w-full flex-col items-center justify-center gap-40 pb-40">
        <h1 class="font-bangers animate-pulse text-6xl tracking-wider">Waiting for player...</h1>
        <div class="font-rowdies grid grid-cols-2 gap-16 text-3xl">
            <div class="rounded-lg border-4 border-gray-500 bg-blue-200 px-4 py-2 text-center">
                <h3>Player 1 (host)</h3>
                <hr class="my-3 border-t-4 border-gray-500" />
                <span>{{ host }}</span>
            </div>
            <div class="rounded-lg border-4 border-gray-500 bg-red-200 px-4 py-2 text-center">
                <h3>Player 2 (guest)</h3>
                <hr class="my-3 border-t-4 border-gray-500" />
                <span>{{ guest ?? '???' }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import state from '../js/state';
export default {
    setup() {
        const host = computed(() => {
            return state.host;
        });

        const guest = computed(() => {
            return state.guest;
        });

        return { host, guest };
    },
};
</script>
