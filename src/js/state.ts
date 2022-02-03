import { reactive } from 'vue';

const state = reactive({
    apiUrl: 'http://localhost:8000/api',
    view: 'login',
    host: null,
    guest: null
});

export default state;
