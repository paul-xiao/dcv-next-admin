import { defHttp } from '@/utils/http/axios';

export const getTagList = (params: any = {}) => {
  return defHttp.get("/tag/list", {
    params,
  });
};
