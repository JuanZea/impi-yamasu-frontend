<template>
    <div class="flex flex-col gap-40 pb-40 h-full w-full justify-center items-center">
        <h1 class="text-6xl font-bangers tracking-wider animate-bounce">Battle closed</h1>
    </div>
</template>

<script>
import state from '../js/state';
export default {
    setup() {
        const {host, guest} = state;

        return {host, guest }
    },
}
</script>