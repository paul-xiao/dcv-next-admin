import { CacheEnum } from '@/enums/cacheEnum';
import { Session } from '@/utils/cache/storage';

export function getToken() {
  return Session.get(CacheEnum.TOKEN);
}
export function setToken(val) {
  return Session.set(CacheEnum.TOKEN, val);
}
export function removeToken() {
  return Session.remove(CacheEnum.TOKEN);
}
