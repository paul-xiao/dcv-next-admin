import http from '@/utils/http';

export const list = (params: any = {}) => {
  return http.get('/project/list', { params });
};
export const detail = (id: number) => {
  return http.get(`/project/detail/${id}`);
};
export const create = (data: any) => {
  return http.post('/project/create', data);
};
export const update = (data: any) => {
  return http.put('/project/update', data);
};
export const remove = (id: any) => {
  return http.delete(`/project/delete/${id}`);
};
export const upload = (data: any) => {
  if (!data.file) return;
  const formdata = new FormData();
  formdata.append('file', data.file);
  return http.post(`/upload`, formdata);
};
