import { HttpResponse } from '@/types/http';
import { defHttp } from '@/utils/http/axios';

const baseUrl = {
  List: '/menu/list',
};
export const getMenuList = (params: any = {}): Promise<HttpResponse> => {
  return defHttp.get({ url: baseUrl.List, params });
};
