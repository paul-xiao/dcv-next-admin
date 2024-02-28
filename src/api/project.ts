import { defHttp } from '@/utils/http/axios';

export const list = (params: any = {}) => {
  return defHttp.get({ url: '/project/list', params });
};
export const detail = (id: number) => {
  return defHttp.get({ url: `/project/detail/${id}` });
};
export const create = (data: any) => {
  return defHttp.post({ url: '/project/create', data });
};
export const update = (data: any) => {
  return defHttp.put('/project/update', data);
};
export const remove = (id: any) => {
  return defHttp.delete(`/project/delete/${id}`);
};
export const upload = (data: any) => {
  if (!data.file) return;
  const formdata = new FormData();
  formdata.append('file', data.file);
  return defHttp.post(`/upload`, formdata);
};
