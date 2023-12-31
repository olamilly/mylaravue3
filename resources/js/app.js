import './bootstrap';

import '../../node_modules/admin-lte/plugins/jquery/jquery.min.js';

import '../../node_modules/admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js';
import '../../node_modules/admin-lte/plugins/bootstrap/js/bootstrap.min.js';
import '../../node_modules/admin-lte/dist/js/adminlte.min.js'

import { createApp } from 'vue/dist/vue.esm-bundler.js';
import { createRouter, createWebHistory } from 'vue-router'
import Toast from "vue-toastification";
import Routes from './routes.js'
const app = createApp({});
const router = createRouter({
    routes:Routes,
    history: createWebHistory()
})

app.use(Toast);
app.use(router)
app.mount("#app")