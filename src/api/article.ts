import http from '@/utils/http';
/**
 * Description placeholder
 * @date 2024/4/7 - 16:51:59
 *
 * @param {*} [params={}]
 * @returns {*}
 */
export const getArticleList = (params: any = {}) => {
  return http.get('/article/list', { params });
};
/**
 * Description placeholder
 * @date 2024/4/7 - 16:51:59
 *
 * @param {*} id
 * @returns {*}
 */
export const getArticleById = (id: any) => {
  return http.get(`/article/${id}`);
};
/**
 * Description placeholder
 * @date 2024/4/7 - 16:51:59
 *
 * @param {*} params
 * @returns {*}
 */
export const create = (params: any) => {
  return http.post('/article', params);
};
/**
 * Description placeholder
 * @date 2024/4/7 - 16:51:59
 *
 * @param {*} params
 * @returns {*}
 */
export const update = (params: any) => {
  return http.put('/article', params);
};
/**
 * Description placeholder
 * @date 2024/4/7 - 16:51:59
 *
 * @param {*} id
 * @returns {*}
 */
export const remove = (id: any) => {
  return http.delete(`/article/${id}`);
};
/**
 * Description placeholder
 * @date 2024/4/7 - 16:51:59
 *
 * @param {*} params
 * @returns {*}
 */
export const upload = (params: any) => {
  if (!params.file) return;
  const formdata = new FormData();
  formdata.append('file', params.file);
  return http.post(`/upload`, formdata);
};
