import http from '@/utils/http';

const baseURL = '/link';

export const list = (params: any) => {
  return http.get(baseURL + '/list', { params });
};
export const detail = (id: number) => {
  return http.get(baseURL + `/${id}`);
};
export const create = (params: any) => {
  return http.post(baseURL, params);
};
export const update = (params: any) => {
  return http.put(baseURL + '/update', params);
};
export const remove = (id: any) => {
  return http.delete(baseURL + `/${id}`);
};
