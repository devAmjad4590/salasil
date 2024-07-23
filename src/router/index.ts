import {createRouter, createWebHistory} from 'vue-router';
import Home from '../pages/Home.vue';
import { process } from '@tauri-apps/api';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
        
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;