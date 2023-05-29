import { createRouter, createWebHashHistory } from "vue-router"

import About from '@/pages/About.vue';
import Main from '@/pages/Main.vue';
import PersonsPage from '@/pages/PersonsPage.vue';
import ProductsPage from '@/pages/ProductsPage.vue';
import ResultsPage from '@/pages/ResultsPage.vue';

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/persons',
        component: PersonsPage
    },
    {
        path: '/products',
        component: ProductsPage
    },
    {
        path: '/results',
        component: ResultsPage
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router;