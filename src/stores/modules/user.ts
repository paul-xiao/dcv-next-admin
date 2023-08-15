import { defineStore } from 'pinia';
interface User {}
export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      userData: [],
    };
  },
  getters: {
    getUserData(): User[] {
      return this.userData;
    },
  },
  actions: {
    async setUserData(data) {
      this.userData = data;
    },
  },
});
