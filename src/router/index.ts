import {createRouter, createWebHistory} from 'vue-router';
import Home from '../pages/Home.vue';
import Playlist from '../pages/Playlist.vue'
import VideoPlayer from '../pages/VideoPlayer.vue'
import { process } from '@tauri-apps/api';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
        
    },
    {
        path: '/playlist/:id',
        name: 'Playlist',
        component: Playlist
        
    },

    
    {
        path: '/VideoPlayer/:id',
        name: 'VideoPlayer',
        component: VideoPlayer
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;