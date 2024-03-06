import { defHttp } from '@/utils/http/axios';
export const getArticleList = (params: any = {}) => {
  return defHttp.get({ url: '/article/list', params });
};
export const getArticleById = (id: any) => {
  return defHttp.get({ url: `/article/${id}` });
};
export const create = (params: any) => {
  return defHttp.post({ url: '/article', params });
};
export const update = (params: any) => {
  return defHttp.put({ url: '/article/update', params });
};
export const remove = (id: any) => {
  return defHttp.delete({url: `/article/${id}`});
};
export const upload = (params: any) => {
  if (!params.file) return;
  const formdata = new FormData();
  formdata.append('file', params.file);
  return defHttp.post({ url: `/upload`, params: formdata });
};
