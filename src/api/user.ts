import http from '@/utils/http';

export const login = (params: any = {}): Promise<any> => {
  return http.post('/user/login', params);
};
export const list = (params: any = {}): Promise<any> => {
  return http.get('/user/list', params);
};
export const create = (params: any = {}): Promise<any> => {
  return http.post('/user', params);
};
export const remove = (id: any) => {
  return http.delete(`/user/${id}`);
};
