import { defHttp } from '@/utils/http/axios';

export const login = (data: any = {}) => {
  return defHttp.post("/login", {
    ...data,
  });
};
export const getMenuList = (params: any = {}) => {
  return defHttp.get("/getMenu", {
    params,
  });
};
