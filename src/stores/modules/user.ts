import { setToken, removeToken } from '@/utils/auth';
import { defineStore } from 'pinia';
import { router } from '@/router';
import { login, getUserInfo } from '@/api/user';
import { __MyStorage__ } from '@/utils/cache/storage';
interface User {
  email: string;
}
const userInfo = __MyStorage__.get('userInfo');
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: userInfo || ({} as User),
    };
  },
  getters: {
    getUserInfo(): User {
      return this.userInfo;
    },
  },
  actions: {
    async login(params) {
      const { token }: { token: string } = await login(params);
      if (token) {
        setToken(token || '');
        const userInfo = await getUserInfo();
        this.userInfo = userInfo;
        __MyStorage__.set('userInfo', userInfo);
        router.push('/');
      }
    },
    logout() {
      removeToken();
      __MyStorage__.clear();
      router.push('/login');
    },
  },
});
