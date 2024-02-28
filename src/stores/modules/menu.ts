import { defineStore } from 'pinia';
interface Menu {}
export const useMenuStore = defineStore({
  id: 'menu',
  state: () => {
    return {
      menuData: [],
    };
  },
  getters: {
    getMenuData(): Menu[] {
      return this.menuData;
    },
  },
  actions: {
    async setMenuData(data) {
      this.menuData = data;
    },
  },
});
