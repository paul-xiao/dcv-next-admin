import { HttpResponse } from "@/types/http";
import { defHttp } from '@/utils/http/axios';

export const login = (params: any = {}): Promise<HttpResponse> => {
  return defHttp.post({url: "/user/login", params});
};
