import http from '@/utils/http';

export const upload = (data: any) => {
  return http.post('/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
