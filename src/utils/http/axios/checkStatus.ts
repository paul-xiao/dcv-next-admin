import type { ErrorMessageMode } from '/#/axios';
import { HttpErrorEnum } from '@/enums/httpEnum';
export function checkStatus(status: number, msg: string, errorMessageMode: ErrorMessageMode = 'notification'): void {
  let errMessage = '';

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      console.log(msg);
      
      errMessage = msg;
      break;
    case 403:
      errMessage = msg || HttpErrorEnum.errMsg403;
      break;
    // 404请求不存在
    case 404:
      errMessage = msg || HttpErrorEnum.errMsg404;
      break;
    case 405:
      errMessage = msg || HttpErrorEnum.errMsg405;
      break;
    case 408:
      errMessage = msg || HttpErrorEnum.errMsg408;
      break;
    case 500:
      errMessage = msg || HttpErrorEnum.errMsg500;
      break;
    case 501:
      errMessage = msg || HttpErrorEnum.errMsg501;
      break;
    case 502:
      errMessage = msg || HttpErrorEnum.errMsg502;
      break;
    case 503:
      errMessage = msg || HttpErrorEnum.errMsg503;
      break;
    case 504:
      errMessage = msg || HttpErrorEnum.errMsg504;
      break;
    case 505:
      errMessage = msg || HttpErrorEnum.errMsg505;
      break;
    default:
  }

  if (errMessage) {
    //TODO: 弹窗错误消息,errorMessageMode弹窗类型 'modal' | 'message' | 'notification'
    console.log(errorMessageMode);
  }
}
