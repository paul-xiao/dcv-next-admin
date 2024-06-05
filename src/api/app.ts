import http from '@/utils/http';

export const login = (data: any = {}) => {
  return http.post("/login", {
    ...data,
  });
};
export const getMenuList = (params: any = {}) => {
  return http.get("/getMenu", {
    params,
  });
};
