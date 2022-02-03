<template>
    <div class="flex h-full w-full flex-col items-center justify-center gap-40 pb-40">
        <h1 class="font-bangers text-6xl tracking-wider">{{ `Assign your perks: ${total}` }}</h1>
        <div
            class="font-rowdies select-none rounded-lg border-4 border-gray-500 bg-red-200 px-4 py-2 text-center text-3xl"
        >
            <div class="flex items-center justify-between">
                <h3 class="mr-10">Healt</h3>
                <div class="grid grid-cols-3 gap-5">
                    <MinusCircleIcon
                        @click="update('healt')"
                        class="h-8 w-8 cursor-pointer text-red-600 active:animate-ping"
                        aria-hidden="true"
                    />
                    <span>{{ healt }}</span>
                    <PlusCircleIcon
                        @click="update('healt', true)"
                        class="h-8 w-8 cursor-pointer text-green-600 active:animate-ping"
                        aria-hidden="true"
                    />
                </div>
            </div>
            <div class="flex items-center justify-between">
                <h3 class="mr-10">Attack</h3>
                <div class="grid grid-cols-3 gap-5">
                    <MinusCircleIcon
                        @click="update('attack')"
                        class="h-8 w-8 cursor-pointer text-red-600 active:animate-ping"
                        aria-hidden="true"
                    />
                    <span>{{ attack }}</span>
                    <PlusCircleIcon
                        @click="update('attack', true)"
                        class="h-8 w-8 cursor-pointer text-green-600 active:animate-ping"
                        aria-hidden="true"
                    />
                </div>
            </div>
            <div class="flex items-center justify-between">
                <h3 class="mr-10">Defense</h3>
                <div class="grid grid-cols-3 gap-5">
                    <MinusCircleIcon
                        @click="update('defense')"
                        class="h-8 w-8 cursor-pointer text-red-600 active:animate-ping"
                        aria-hidden="true"
                    />
                    <span>{{ defense }}</span>
                    <PlusCircleIcon
                        @click="update('defense', true)"
                        class="h-8 w-8 cursor-pointer text-green-600 active:animate-ping"
                        aria-hidden="true"
                    />
                </div>
            </div>
            <hr class="my-3 border-t-4 border-gray-500" />
            <button
                @click="fight"
                class="button bg-gray-500 text-white hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-green-300"
            >
                Fight
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import state from '../js/state';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/vue/solid';
import { ref } from 'vue';
export default {
    components: { PlusCircleIcon, MinusCircleIcon },
    setup() {
        const total = ref(10);
        const healt = ref(0);
        const attack = ref(0);
        const defense = ref(0);

        const update = (perk, plus) => {
            if (plus) {
                if (total.value > 0) total.value--;
                else return;
            } else {
                if (total.value < 10) total.value++;
                else return;
            }

            switch (perk) {
                case 'healt': {
                    if (plus) healt.value++;
                    else healt.value--;
                    break;
                }
                case 'attack': {
                    if (plus) attack.value++;
                    else attack.value--;
                    break;
                }
                case 'defense': {
                    if (plus) defense.value++;
                    else defense.value--;
                    break;
                }
            }
        };

        const fight = () => {
            axios
                .post(`${state.apiUrl}/start-battle/`, {
                    id: state.id,
                    rol: state.rol,
                    perks: {
                        healt: healt.value,
                        attack: attack.value,
                        defense: defense.value,
                    },
                })
                .then(() => {
                    state.view = 'battle';
                });
        };

        return { total, healt, attack, defense, update, fight };
    },
};
</script>
