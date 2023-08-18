import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '@/views/errors/404.vue';
import { setRouteGuards } from './guards';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/overview/dashboard',
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/login/index.vue'),
      meta: {
        title: '登陆',
      },
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
});

export async function setupRouter(app) {
  app.use(router);
}
