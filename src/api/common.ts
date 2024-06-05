import http from '@/utils/http';

export const upload = (data: any) => {
  if (!data.file) return;
  const formData = new FormData();
  formData.append('file', data.file);
  console.log(formData, data.file);
  
  return http.post(`/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
