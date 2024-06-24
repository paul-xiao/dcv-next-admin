import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '@/views/errors/404.vue';

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
    {
      path: '/overview',
      name: 'overview',
      component: () => import('../layout/index.vue'),
      children: [
        {
          path: '/overview/dashboard',
          name: 'dashboard',
          component: () => import('../views/overview/dashboard/index.vue'),
          meta: {
            title: '仪表盘',
          },
        },
      ],

      meta: {
        title: '概览',
      },
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
});

export async function setupRouter(app) {
  app.use(router);
}
