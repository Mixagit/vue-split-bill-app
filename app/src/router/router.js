import { createRouter, createWebHashHistory } from "vue-router"

import About from '@/pages/About.vue';
import Main from '@/pages/Main.vue';
import PersonsPage from '@/pages/PersonsPage.vue';
import ProductsPage from '@/pages/ProductsPage.vue';
import ResultsPage from '@/pages/ResultsPage.vue';

const routes = [
    {
        path: '/',
        component: Main,
        meta: { title: 'Главная страница' }
    },
    {
        path: '/about',
        component: About,
        meta: { title: 'О нас' }
    },
    {
        path: '/persons',
        component: PersonsPage,
        meta: { title: 'Добавить пользователя' }
    },
    {
        path: '/products',
        component: ProductsPage,
        meta: { title: 'Добавить позицию' }
    },
    {
        path: '/results',
        component: ResultsPage,
        meta: { title: 'Результаты' }
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Делим счет в кафе';
    next();
  });

export default router;