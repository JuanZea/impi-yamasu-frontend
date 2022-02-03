<template>
    <div class="bg-blocker h-screen w-screen">
        <Login v-if="state.view === 'login'" />
        <InGame v-if="state.view === 'inGame'" />
        <BattleClosed v-if="state.view === 'battleClosed'" />
    </div>
</template>

<script>
import state from './js/state';
import Login from './components/Login.vue';
import InGame from './components/InGame.vue';
import BattleClosed from './components/BattleClosed.vue';
export default {
    components: { Login, InGame, BattleClosed },
    setup() {
        return { state };
    },
};
</script>
