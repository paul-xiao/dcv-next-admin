import global from '@/settings/global';
import { generateRoutes } from './helpers';
export function setRouteGuards(router) {
  router.beforeEach(async (to, _from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title ? `${global.title}-${to.meta.title}` : global.title;
    }
    const flag = await generateRoutes(router);    
    flag ? next(to.path) : next();
  });
}
