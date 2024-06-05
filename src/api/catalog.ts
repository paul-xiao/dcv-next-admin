import http from '@/utils/http';

const baseUrl = '/catalog';

export const list = (params: any = {}) => {
  return http.get(`${baseUrl}/list`, { params });
};
export const detail = (id: any) => {
  return http.get(`${baseUrl}/${id}`);
};
export const create = (params: any) => {
  return http.post(`${baseUrl}`, params);
};
export const update = (params: any) => {
  return http.put(`${baseUrl}/update`, params);
};
export const remove = (id: any) => {
  return http.delete(`${baseUrl}/${id}`);
};
