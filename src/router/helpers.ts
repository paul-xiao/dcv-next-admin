import { emptyObjectItemFillter } from '@/utils/object';
import { Router, RouterView } from 'vue-router';
import { list as getMenuList } from '@/api/menu';
import { useMenuStore } from '@/stores/modules/menu';
import { __MyStorage__ } from '@/utils/cache/storage';
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
function parsedcomponentName(path) {
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
  // 忽略某些指定目录下的文件， 如 _test_
  // const filteredFiles = Object.fromEntries(
  //   Object.entries(allFiles).filter(([path]) => !path.includes('要忽略的文件夹名') && !path.endsWith('.要忽略的文件扩展名'))
  // );

  for (const path in files) {
    if (Object.prototype.hasOwnProperty.call(files, path)) {
      const component: any = await files[path]();
      const componentName = parsedcomponentName(path);
      // 动态导入并定义异步组件
      components[componentName] = component.default;
    }
  }

  return components;
}

let dynamicComponents;
let components;
/**
 * @description 初始化组件
 * @author paul.xiao
 * @date 2024-07-09 09:50:57
 * @param {*}
 * @return {*}
*/
async function initComs() {
  const coms = await loadComponents();
  dynamicComponents = coms;
  components = {
    ...dynamicComponents,
    LAYOUT: () => import('../layout/index.vue'),
    RouterView: RouterView,
  };
  return (list, pid?) => parseMenuList(list, pid);
}

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
export function parseMenuList(list: any[], pid = 0) {
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
export function generateRoutes(router: Router, cache?: any[]): Promise<boolean> {
  const menuStore = useMenuStore();
  const hasMenu = menuStore.menuData.length;
  if (hasMenu) return Promise.resolve(false);
  return new Promise((resolve, reject) => {
    let menus: any[] = [];
    const genRoutes = async menuData => {
      const foo = await initComs();
      menus = foo(menuData as any[]);
      menus.forEach(m => {
        router.addRoute(m);
      });
      menuStore.setMenuData(menus);
      resolve(true);
    };
    if (cache) {
      genRoutes(cache);
    } else {
      getMenuList()
        .then(menuData => {
          __MyStorage__.set('menuData', menuData);
          genRoutes(menuData);
        })
        .catch(err => reject(err));
    }
  });
}
