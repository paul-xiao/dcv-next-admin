import http from '@/utils/http';


/**
 * @description 字典查询
 * @author paul.xiao
 * @date 2024-06-26 15:00:15
 * @param {*}
 * @return {*}
*/
export const getDict = (params?: any) => {
  return http.get(`/dict`, { params });
}
/**
 * @description 图片上传
 * @author paul.xiao
 * @date 2024-06-26 15:00:04
 * @param {*}
 * @return {*}
*/
export const upload = (data: any) => {
  if (!data.file) return;
  const formData = new FormData();
  formData.append('file', data.file);  
  return http.post(`/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
