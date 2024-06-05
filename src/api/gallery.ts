import http from '@/utils/http';

export const getGalleryList = (params: any) => {
  return http.get('/gallery/list', { params });
};
export const getGalleryById = (id: number) => {
  return http.get(`/gallery/detail/${id}`);
};
export const create = (params: any) => {
  return http.post('/gallery', params);
};
export const update = (params: any) => {
  return http.put('/gallery/update', params);
};
export const remove = (id: any) => {
  return http.delete(`/gallery/${id}`);
};
export const upload = (data: any) => {
  if (!data.file) return;
  const formdata = new FormData();
  formdata.append('file', data.file);
  return http.post(`/upload`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
