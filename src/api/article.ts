import { defHttp } from '@/utils/http/axios';
export const getArticleList = (params: any = {}) => {
  return defHttp.get({ url: '/article/list', params });
};
export const getArticleById = (id: any) => {
  return defHttp.get(`/article/${id}`);
};
export const create = (data: any) => {
  return defHttp.post('/article/create', data);
};
export const update = (data: any) => {
  return defHttpput('/article/update', data);
};
export const remove = (id: any) => {
  return defHttpdelete(`/article/delete/${id}`);
};
export const upload = (data: any) => {
  if (!data.file) return;
  const formdata = new FormData();
  formdata.append('file', data.file);
  return defHttp.post(`/upload`, formdata);
};
