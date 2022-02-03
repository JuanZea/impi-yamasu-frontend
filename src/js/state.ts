import { reactive } from 'vue';

const state = reactive({
    apiUrl: 'http://localhost:8000/api',
    view: 'login',
    id: undefined,
    rol: undefined,
    host: null,
    guest: null,
    hostPerks: null,
    guestPerks: null
});

export default state;
