import http from '@/utils/http';
export const list = (params: any = {}) => {
  return http.get({
    url: '/links/list', 
    params,
  });
};
export const detail = (id: number) => {
  return http.get({url:`/links/detail/${id}`});
};
export const create = (params: any) => {
  return http.post({url:'/links/create', params});
};
export const update = (id, params: any) => {
  return http.put({url:`/links/update/${id}`, params});
};
export const remove = (id: any) => {
  return http.delete({url: `/links/delete/${id}`});
};
export const upload = (data: any) => {
  if (!data.file) return;
  const formdata = new FormData();
  formdata.append('file', data.file);
  return http.post({url:'/links/upload', data: formdata});
};
