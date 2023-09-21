import { useMenuStore } from '@/styles/stores/modules/menu';
import { emptyObjectItemFillter } from '@/utils/object';
import { Router, RouterView } from 'vue-router';
export interface Menu {
  id: number;
  title: string;
  path: string;
  component: string;
  parentId: number;
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

const compoents = {
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
 * @param parentId
 * @returns
 */
export function parseMenuList(list: Menu[], parentId = 0) {
  const tree: any[] = [];
  for (const item of list) {
    if (item.parentId === parentId) {
      const child = parseMenuList(list, item.id);
      if (child.length > 0) {
        item.children = child;
      }
      const { title, path, component, hidden, children, parentId, isExternal, protocol, icon } = item;
      // const childPath = parentId ? getChildPath(path) : path;
      const name = path.replace('/', '').replace(/\//g, '_');
      const isDefaultComponent = ['LAYOUT', 'RouterView'].includes(component);
      const componentName = isDefaultComponent
        ? component
        : component.replace('/', '').replace(/\//g, '_').toLowerCase();

      const metaDta = {
        title,
        hidden,
        parentId,
        isExternal,
        protocol,
        icon,
      };      
      const treeItem = {
        path,
        name,
        component: compoents[componentName],
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
    const getMenuList = () => {
      fetch('/menu/list') // todo: 更换接口
        .then(res => res.json())
        .then(d => {
          const menus = parseMenuList(d.result);
          menus.forEach(m => {
            router.addRoute(m);
          });
          menuStore.setMenuData(menus);
          resolve(true);
        })
        .catch(err => reject(err));
    };
    getMenuList();
  });
}
