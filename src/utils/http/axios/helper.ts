import { isObject, isString } from '@/utils/is';
import { defHttp } from '@/utils/http/axios';
import type { AxiosRequestConfig } from 'axios';
import type { RequestOptions } from '/#/axios';
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export function joinTimestamp<T extends boolean>(join: boolean, restful: T): T extends true ? string : object;

export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? '' : {};
  }
  const now = new Date().getTime();
  if (restful) {
    return `?_t=${now}`;
  }
  return { _t: now };
}

/**
 * @description: Format request parameter time
 */
export function formatRequestDate(params: Recordable) {
  if (Object.prototype.toString.call(params) !== '[object Object]') {
    return;
  }

  for (const key in params) {
    if (params[key] && params[key]._isAMomentObject) {
      params[key] = params[key].format(DATE_TIME_FORMAT);
    }
    if (isString(key)) {
      const value = params[key];
      if (value) {
        try {
          params[key] = isString(value) ? value.trim() : value;
        } catch (error: any) {
          throw new Error(error);
        }
      }
    }
    if (isObject(params[key])) {
      formatRequestDate(params[key]);
    }
  }
}

export interface apiConfig {
  url: string;
  pathKey?: string[];
}
export interface apiOptions {
  [key: string]: string | apiConfig;
}

export type FormatAjaxFnMap<T> = {
  [P in keyof T]: (...arg: any) => Promise<any>;
};

export type ApiRequest = FormatAjaxFnMap<apiOptions>;

const isNull = (d: unknown): boolean => d === null || d === undefined;
const METHOD_LIST = ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'];
/**
 * @param {apiOptions} api 接口url组成的对象, pathKey中的参数会拼接到url路径中,detailGET: {url: '/api/history',pathKey: ['id'],},转 路径/api/history/[id]的get请求
 * @return {ApiRequest} 对应ajax函数
 * @description 根据apiOptions,key结尾method判断请求方式，返回对应ajax函数
 * @author lxl
 * @date 2022-09-01 13:36:36
 */
export function formatAjaxFn(api: apiOptions): ApiRequest {
  const getAjaxWrap = <T extends keyof apiOptions>(url: T) => {
    const method = METHOD_LIST.find(item => url['endsWith'](item));
    const ajaxOpt = api[url];
    const param = {} as apiOptions;
    if ((typeof ajaxOpt).toLowerCase() === 'string') {
      param.url = api[url];
    } else {
      return (params: AxiosRequestConfig, opt: RequestOptions) => {
        const path = (ajaxOpt['pathKey'] || []).map(item => (!isNull(params[item]) ? params[item] : '')).join('/');
        param.url = ajaxOpt['url'] + (path ? `/${path}` : '');
        return defHttp[method?.toLowerCase() || 'get']({ ...param, params }, opt);
      };
    }
    return (params, opt) => defHttp[method?.toLowerCase() || 'get']({ ...param, params }, opt);
  };

  const requestFn = {};
  Object.keys(api).forEach(key => {
    requestFn[key] = getAjaxWrap<string>(key);
  });
  return requestFn;
}
