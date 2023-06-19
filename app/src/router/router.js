import { createRouter, createWebHashHistory } from 'vue-router';

import Main from '@/pages/Main.vue';
import PersonsPage from '@/pages/PersonsPage.vue';
import ProductsPage from '@/pages/ProductsPage.vue';
import ResultsPage from '@/pages/ResultsPage.vue';

const routes = [
  {
    path: '/',
    component: Main,
    meta: { title: 'Делим счёт в кафе' }
  },
  {
    path: '/persons',
    component: PersonsPage,
    meta: { title: 'Добавить людей' }
  },
  {
    path: '/products',
    component: ProductsPage,
    meta: { title: 'Добавить позиции' }
  },
  {
    path: '/results',
    component: ResultsPage,
    meta: { title: 'Результаты' }
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Делим счёт в кафе';
  next();
});

export default router;
