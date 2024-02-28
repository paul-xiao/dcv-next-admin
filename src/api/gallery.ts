import { defHttp } from '@/utils/http/axios';

export const getGalleryList = (params: any = {}) => {
  return defHttp.get({ url: '/gallery/list', params });
};
export const getGalleryById = (id: number) => {
  return defHttp.get({ url: `/gallery/detail/${id}` });
};
export const create = (params: any) => {
  return defHttp.post({ url: '/gallery/create', params });
};
export const update = (params: any) => {
  return defHttpput({ url: '/gallery/update', params });
};
export const remove = (id: any) => {
  return defHttpdelete({ url: `/gallery/delete/${id}` });
};
export const upload = (data: any) => {
  if (!data.file) return;
  const formdata = new FormData();
  formdata.append('file', data.file);
  return defHttp.post({ url: `/upload`, params: formdata });
};
