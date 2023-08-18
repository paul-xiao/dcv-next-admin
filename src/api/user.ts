import { defHttp } from '@/utils/http/axios';
const baseUrl = '/system';
export const login = data => {
  console.log(data);
  
  return defHttp.post({
    url: baseUrl + '/login/login',
    data,
  });
};
export const getMenuList = params => defHttp.get({ url: '/getMenu', params });
