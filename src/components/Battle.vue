<template>
    <div class="flex h-full w-full flex-col items-center justify-center gap-40 pb-40">
        <h1 :class="['font-bangers animate-pulse text-6xl tracking-wider', { 'animate-none text-8xl': winner }]">
            {{ winner ? `The winner is ${winner}` : 'Fighting!!!' }}
        </h1>
        <div class="font-rowdies grid grid-cols-2 gap-16 text-3xl">
            <div class="rounded-lg border-4 border-gray-500 bg-blue-200 px-4 py-2 text-center">
                <h3>{{ state.host }}</h3>
                <hr class="my-3 border-t-4 border-gray-500" />
                <div class="flex justify-center gap-5">
                    <div>
                        <HeartIcon class="h-8 w-8 animate-bounce cursor-pointer text-red-600" />
                        {{ hostPerks ? hostPerks.healt : '?' }}
                    </div>
                    <div>
                        <LightningBoltIcon
                            class="h-8 w-8 animate-bounce cursor-pointer text-yellow-600 animation-delay-150"
                        />
                        {{ hostPerks ? hostPerks.attack : '?' }}
                    </div>
                    <div>
                        <ShieldCheckIcon
                            class="h-8 w-8 animate-bounce cursor-pointer text-blue-600 animation-delay-300"
                        />
                        {{ hostPerks ? hostPerks.defense : '?' }}
                    </div>
                </div>
                <hr class="my-3 border-t-4 border-gray-500" />
                <div class="flex flex-col justify-center">
                    <RefreshIcon v-if="!winner" class="animate-spin-reverse h-8 w-8 cursor-pointer text-gray-600" />
                    <span v-for="match in matches" :key="match.id">{{ match.host }}</span>
                    <span v-if="winner === state.host">😁</span>
                    <span v-else-if="winner">😵</span>
                </div>
            </div>
            <div class="rounded-lg border-4 border-gray-500 bg-red-200 px-4 py-2 text-center">
                <h3>{{ state.guest }}</h3>
                <hr class="my-3 border-t-4 border-gray-500" />
                <div class="flex justify-center gap-5">
                    <div>
                        <HeartIcon class="h-8 w-8 animate-bounce cursor-pointer text-red-600 animation-delay-300" />
                        {{ guestPerks ? guestPerks.healt : '?' }}
                    </div>
                    <div>
                        <LightningBoltIcon
                            class="h-8 w-8 animate-bounce cursor-pointer text-yellow-600 animation-delay-150"
                        />
                        {{ guestPerks ? guestPerks.attack : '?' }}
                    </div>
                    <div>
                        <ShieldCheckIcon class="h-8 w-8 animate-bounce cursor-pointer text-blue-600" />
                        {{ guestPerks ? guestPerks.defense : '?' }}
                    </div>
                </div>
                <hr class="my-3 border-t-4 border-gray-500" />
                <div class="flex flex-col justify-center">
                    <RefreshIcon v-if="!winner" class="animate-spin-reverse h-8 w-8 cursor-pointer text-gray-600" />
                    <span v-for="match in matches" :key="match.id">{{ match.guest }}</span>
                    <span v-if="winner === state.guest">😁</span>
                    <span v-else-if="winner">😵</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import state from '../js/state';
import { HeartIcon, LightningBoltIcon, ShieldCheckIcon, RefreshIcon } from '@heroicons/vue/solid';
import axios from 'axios';
import { ref, computed } from 'vue';
export default {
    components: { HeartIcon, LightningBoltIcon, ShieldCheckIcon, RefreshIcon },
    setup() {
        const winner = ref();

        const matches = ref([]);

        const calculateWinner = (first, host, guest) => {
            const match = (id, dom, host, guest) => {
                let active;
                let passive;
                if (dom === 'host') {
                    active = host;
                    passive = guest;
                } else {
                    active = guest;
                    passive = host;
                }

                const hit = active.attack - passive.defense <= 0 ? 1 : active.attack - passive.defense;

                const match = {
                    id: id,
                    host: dom === 'host' ? host.healt : host.healt - hit,
                    guest: dom === 'guest' ? guest.healt : guest.healt - hit,
                };

                matches.value.push(match);
                return [{...host, healt: match.host}, { ...guest, healt: match.guest }];
            };

            let matchId = 0;
            let turnDom = first;
            while (host.healt > 0 && guest.healt > 0) {
                let [nhost, nguest] = match(++matchId, turnDom, host, guest);
                turnDom = turnDom === 'host' ? 'guest' : 'host';
                host = nhost;
                guest = nguest;
            }
            if (host.healt > 0) return state.host;
            else return state.guest;
        };

        axios.post(`${state.apiUrl}/battle-info/`, { id: state.id }).then(res => {
            if (!res.data.open) {
                state.hostPerks = res.data.hostPerks;
                state.guestPerks = res.data.guestPerks;
            }

            let sw = false;
            const interval = setInterval(() => {
                axios.post(`${state.apiUrl}/battle-info/`, { id: state.id }).then(res => {
                    if (!res.data.open) {
                        if (res.data.hostPerks && res.data.guestPerks) {
                            state.hostPerks = res.data.hostPerks;
                            state.guestPerks = res.data.guestPerks;
                            clearInterval(interval);
                            winner.value = calculateWinner(sw ? state.rol : state.rol === 'host' ? 'guest' : 'host', res.data.hostPerks, res.data.guestPerks);
                        }
                        sw = true;
                    }
                });
            }, 1000);
        });

        const hostPerks = computed(() => state.hostPerks);
        const guestPerks = computed(() => state.guestPerks);
        return { state, hostPerks, guestPerks, winner, matches };
    },
};
</script>
