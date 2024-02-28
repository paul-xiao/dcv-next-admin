import global from '@/settings/global';
import { getToken } from '@/utils/auth';
import { generateRoutes } from './helpers';

const whiteList = ['/login'];
export function setRouteGuards(router) {
  router.beforeEach(async (to, _from, next) => {
    /* 路由发生变化修改页面title */
    try {      
      if (to.meta.title) {
        document.title = to.meta.title ? `${global.title}-${to.meta.title}` : global.title;
      }

      if (whiteList.includes(to.path)) {
        const token = getToken();
        if (token && to.path === '/login') {
          next('/');
        } else {
          next();
        }
      } else {
        const token = getToken();
        if (!token) {
          next('/login');
        } else {
          const flag = await generateRoutes(router);
          flag ? next(to.path) : next();
        }
      }
    } catch (error) {
      console.log(error);
      next();
    }
  });
}
