import { createRouter, createWebHashHistory } from "vue-router"

import Main from '@/pages/Main.vue';
import PersonsPage from '@/pages/PersonsPage.vue';
import About from '@/pages/About.vue';

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/persons',
        component: PersonsPage
    },
    {
        path: '/about',
        component: About
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router;