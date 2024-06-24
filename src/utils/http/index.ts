// http.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import { getToken } from '../auth';
import { router } from '@/router';
import { useUserStore } from '@/stores/modules/user';
const showStatus = (code: number) => {
  let message = '';
  switch (code) {
    case 400:
      message = '请求错误(400)';
      break;
    case 401:
      message = '未授权，请重新登录(401)';
      break;
    case 404:
      message = '请求出错(404)';
      break;
    case 500:
      message = '服务器错误(500)';
      break;
    default:
      message = `连接出错(${code})!`;
  }
  return `${message}，请检查网络或联系管理员！`;
};

const instance = axios.create({
  baseURL: '/api',
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在这里判断请求类型，并设置 header
    //获取token，并将其添加至请求头中
    let token = getToken();
    // 为 POST 请求设置 header
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    // 你可以添加更多的 header，例如设置 token
    config.headers['authorization'] = token;

    return config;
  },
  error => {
    // 错误抛到业务代码
    error.data = {};
    error.data.message = '服务器异常，请联系管理员！';
    console.log(error);

    return Promise.resolve(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const code = response.data.code;
    let message = showStatus(code);
    code !== 200 && ElMessage.error(response.data.message || message);
    return (response?.data?.result as any) || [];
  },
  error => {
    if (axios.isCancel(error)) {
      console.log('repeated request: ' + error.message);
    } else {
      // handle error code
      // 错误抛到业务代码
      const code = error.response.status;
      const userStore = useUserStore();
      error.data = {};
      error.data.message = error?.response?.data?.message || '请求超时或服务器异常，请检查网络或联系管理员！';
      switch (code) {
        case 401:
          userStore.logout()
          break;

        default:
          ElMessage.error(error.data.message);
          break;
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
