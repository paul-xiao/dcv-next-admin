import global from '@/settings/global';
import { getToken } from '@/utils/auth';
import { generateRoutes } from './helpers';
import { __MyStorage__ } from '@/utils/cache/storage';

const whiteList = ['/login'];
export function setRouteGuards(router) {
  router.beforeEach(async (to, _from, next) => {
    /* 路由发生变化修改页面title */
    try {
      if (to.meta.title) {
        document.title = to.meta.title ? `${global.title}-${to.meta.title}` : global.title;
      }

      if (whiteList.includes(to.path)) {
        next();
      } else {
        const token = getToken();
        if (!token) {
          next('/login');
        } else {
          const menuData = __MyStorage__.get('menuData');
          const rerendered = await generateRoutes(router, menuData?.length ? menuData : null);
          rerendered ? next(to.fullPath) : next();
        }
      }
    } catch (error) {
      next();
    }
  });
}
