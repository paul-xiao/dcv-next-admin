import global from '@/settings/global';
import { getToken } from '@/utils/auth';
import { generateRoutes } from './helpers';

const whiteList = ['/login'];
let flag = false;
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
        console.log(typeof token);        
        if (!token) {
          next('/login');
        } else {
          console.log(typeof token);
          
          if (flag) {
            next();
            return;
          } else {
            flag = await generateRoutes(router);
            console.log(flag, to.path);
            flag && next(to.path);
          }
        }
      }
    } catch (error) {
      console.log(error);
      next();
    }
  });
}
