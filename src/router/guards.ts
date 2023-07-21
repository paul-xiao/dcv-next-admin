
import global from "@/settings/global";
export function setRouteGuards(router) {
  router.beforeEach((to, _from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title ? `${global.title}-${to.meta.title}` : global.title;
    }
    next();
  });
}
