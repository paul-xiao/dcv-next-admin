import { setToken, removeToken } from '@/utils/auth';
import { defineStore } from 'pinia';
import { router } from '@/router';

interface User {}
export const useUserStore = defineStore('user', {
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
    async login(data) {
      this.userData = data;
      setToken(data.token);
      router.push('/');
    },
    logout() {
      removeToken();
      router.push('/login');
    },
  },
});
