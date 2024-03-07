import { defHttp } from '@/utils/http/axios';

const baseUrl = '/catalog'

export const list = (params: any = {}) => {
  return defHttp.get({ url: `${baseUrl}/list`, params });
};
export const detail = (id: any) => {
  return defHttp.get({ url: `${baseUrl}/${id}` });
};
export const create = (params: any) => {
  return defHttp.post({ url: `${baseUrl}`, params });
};
export const update = (params: any) => {
  return defHttp.put({ url: `${baseUrl}/update`, params });
};
export const remove = (id: any) => {
  return defHttp.delete({url: `${baseUrl}/${id}`});
};
