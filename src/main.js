import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import dayjs from 'dayjs';
import App from './App.vue';
import Dashboard from './vue-components/Dashboard.vue';
import './index.css';

const routes = [
    { path: '/', component: Dashboard, name: 'dashboard' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);

app.config.globalProperties.$dayjs = dayjs;

app.provide('apiUrl');
app.use(router);
app.mount('#app');
