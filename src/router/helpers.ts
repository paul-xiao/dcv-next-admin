import { useMenuStore } from '@/styles/stores/modules/menu';
import { emptyObjectItemFillter } from '@/utils/object';
import { Router, RouterView } from 'vue-router';
import { getMenuList } from '@/api/menu';
export interface Menu {
  id: number;
  title: string;
  path: string;
  component: string;
  pid: number;
  children?: Menu[];
  hidden?: boolean;
  isExternal?: boolean;
  protocol?: string;
  icon?: string;
}

/**
 * 组件名称处理
 * @param {string} path
 * @returns {string}
 */
function parsedcomponentNameName(path) {
  return path
    .match(/\..\/views\/(.*)\.vue$/)[1]
    .toLowerCase()
    .replace('/index', '')
    .replace(/\//g, '_');
}
export async function loadComponents() {
  const components = {};

  // 获取指定文件夹下的所有组件文件
  const files = import.meta.glob('../views/**/*.vue');

  for (const path in files) {
    if (Object.prototype.hasOwnProperty.call(files, path)) {
      const component: any = await files[path]();
      const componentName = parsedcomponentNameName(path);
      // 动态导入并定义异步组件
      components[componentName] = component.default;
    }
  }

  return components;
}

const dynamicComponents = await loadComponents();

const components = {
  ...dynamicComponents,
  LAYOUT: () => import('../layout/index.vue'),
  RouterView: RouterView,
};

/**
 * 获取子路由路径
 * @param {string} path
 * @returns {string}
 */
function getChildPath(path) {
  const regex = /\/([^/]+)$/;
  const match = path.match(regex);
  const result = match ? match[1] : '';
  return result;
}

/**
 * 菜单转换为路由
 * @param menus
 * @param pid
 * @returns
 */
export function parseMenuList(list: Menu[], pid = 0) {
  const tree: any[] = [];
  const sortFunc = (a: { sort: number }, b: { sort: number }) => a.sort - b.sort;
  const sortList = list.sort(sortFunc);
  for (const item of sortList) {
    if (item.pid === pid) {
      const child = parseMenuList(sortList, item.id);
      if (child.length > 0) {
        item.children = child;
      }
      const { title, path, component, hidden, children, pid, isExternal, protocol, icon } = item;
      // const childPath = pid ? getChildPath(path) : path;
      const name = path.replace('/', '').replace(/\//g, '_');

      const isSubRoot = pid !== 0 && component === 'LAYOUT'; // 子节点root
      const componentName =
        typeof component === 'string' ? components[isSubRoot ? 'RouterView' : component] : component;

      const metaDta = {
        title,
        hidden,
        pid,
        isExternal,
        protocol,
        icon,
      };
      const treeItem = {
        path,
        name,
        component: componentName,
        meta: emptyObjectItemFillter(metaDta),
        children,
        redirect: children?.length ? children[0].path : null,
      };
      tree.push(treeItem);
    }
  }
  return tree;
}

/**
 * 生成路由
 * @param {object} router vue-router
 * @returns {Promise<boolean>} flag:是否返回当前路由
 */
export function generateRoutes(router: Router): Promise<boolean> {
  const menuStore = useMenuStore();
  const hasMenu = menuStore.menuData.length;
  if (hasMenu) return Promise.resolve(false);
  return new Promise((resolve, reject) => {
    getMenuList()
      .then(res => {
        const menus = parseMenuList(res);
        menus.forEach(m => {
          router.addRoute(m);
        });
        menuStore.setMenuData(menus);
        resolve(true);
      })
      .catch(err => reject(err));
  });
}
