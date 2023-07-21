import { createRouter, createWebHistory } from 'vue-router';
import LAYOUT from '../layout/index.vue';
import { setRouteGuards } from './guards';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/overview/dashboard'
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: '关于'
      }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/login/Login.vue'),
      meta: {
        title: '登陆'
      }
    },
    {
      path: '/overview',
      name: 'overview',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LAYOUT,
      meta: {
        title: '概览'
      },
      redirect: '/overview/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/overview/Dashboard.vue'),
          meta: {
            title: '仪表盘'
          }
        }
      ]
    },
  ],
});

setRouteGuards(router)
export default router;
