import { defHttp } from '@/utils/http/axios';

const baseUrl = {
  List: "/article/list",
};
export const getList = (params: any = {}) => {
  return defHttp.get(baseUrl.List, {
    params,
  });
};
