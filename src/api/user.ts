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
export const update = (params: any = {}): Promise<any> => {
  return http.put('/user', params);
};
export const updatePwd = (params: any = {}): Promise<any> => {
  return http.put('/user/pwd', params);
};
export const updateCurrentUserPwd = (params: any = {}): Promise<any> => {
  return http.put('/user/current/pwd', params);
};
export const detail = (id): Promise<any> => {
  return http.get(`/user/${id}`);
};
export const remove = (id: any) => {
  return http.delete(`/user/${id}`);
};
export const getCaptcha = (email: string) => {
  return http.post(`/user/send/email`, { email });
};
export const getUserInfo = (): Promise<any> => {
  return http.get(`/user/info`);
};
