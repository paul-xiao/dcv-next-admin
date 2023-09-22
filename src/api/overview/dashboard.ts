import { defHttp } from '@/utils/http/axios';
const baseUrl = '/main/resource/';
export const getCloudNumByType = () => defHttp.get({ url: baseUrl + '/queryCloudNumByType' });
export const getCloudResource = (params = {}) => defHttp.get({ url: baseUrl + '/queryCloudResource', params });
export const getQuota = () => defHttp.get({ url: baseUrl + '/queryQuota' });
export const getResource = () => defHttp.get({ url: baseUrl + '/queryResource' });
