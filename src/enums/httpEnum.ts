/**
 * @description: Request result set
 */
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = -1,
  UNAUTH = 401,
  TYPE = 'success',
}

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description:  contentTyp
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

export enum HttpErrorEnum {
  errorTip = '错误提示',
  errorMessage = '操作失败，系统异常',
  apiRequestFailed = '请求出错，请稍候重试',
  apiTimeoutMessage = '接口请求超时，请刷新页面重试',
  networkExceptionMsg = '网络异常，请检查您的网络连接是否正常',

  errMsg401 = '用户没有权限',
  errMsg403 = '用户得到授权，但是访问是被禁止的',
  errMsg404 = '网络请求错误，未找到该资源',
  errMsg405 = '网络请求错误，请求方法未允许',
  errMsg408 = '网络请求超时',
  errMsg500 = '服务器错误，请联系管理员',
  errMsg501 = '网络未实现',
  errMsg502 = '网络错误，请稍后重试',
  errMsg503 = '服务不可用，服务器暂时过载或维护',
  errMsg504 = '网络超时',
  errMsg505 = 'HTTP版本不支持该请求',
}
