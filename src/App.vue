<template>
    <div class="bg-blocker h-screen w-screen">
        <Login v-if="state.view === 'login'" />
        <Connecting v-if="state.view === 'connecting'" />
        <BattleClosed v-if="state.view === 'battleClosed'" />
        <Perks v-if="state.view === 'perks'" />
        <Battle v-if="state.view === 'battle'" />
    </div>
</template>

<script>
import state from './js/state';
import Login from './components/Login.vue';
import Connecting from './components/Connecting.vue';
import BattleClosed from './components/BattleClosed.vue';
import Perks from './components/Perks.vue';
import Battle from './components/Battle.vue';
export default {
    components: { Login, Connecting, BattleClosed, Perks, Battle },
    setup() {
        return { state };
    },
};
</script>
