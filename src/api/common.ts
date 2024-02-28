import { defHttp } from '@/utils/http/axios';
export const getCloudTypeList = params => defHttp.get({ url: '/common/cloudType/list', params });
