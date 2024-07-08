import { defineStore } from 'pinia';
export const useMenuStore = defineStore({
  id: 'menu',
  state: () => {
    return {
      menuData: [],
    };
  },
  getters: {
    getMenuData(): any[] {
      return this.menuData;
    },
  },
  actions: {
    async setMenuData(data) {
      this.menuData = data;
    },
  },
});
