import { defHttp } from '@/utils/http/axios';
const baseUrl = '/pool/cloud';
export const list = params => defHttp.post({ url: baseUrl + '/search', params });
export const detail = params => defHttp.post({ url: baseUrl + '/detail', params });
