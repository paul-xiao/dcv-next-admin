import { ErrorTypeEnum } from '/@/enums/exceptionEnum';
import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';
import { RoleInfo } from '/@/api/sys/model/userModel';

// Lock screen information
export interface LockInfo {
  // Password required
  pwd?: string | undefined;
  // Is it locked?
  isLock?: boolean;
}

// Error-log information
export interface ErrorLogInfo {
  // Type of error
  type: ErrorTypeEnum;
  // Error file
  file: string;
  // Error name
  name?: string;
  // Error message
  message: string;
  // Error stack
  stack?: string;
  // Error detail
  detail: string;
  // Error url
  url: string;
  // Error time
  time?: string;
}

export interface UserInfo {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  userName: string;
  //昵称
  nickName: string;
  // 头像
  avatar: string;
  //创建时间
  createTime: string;
  //创建人userId
  createUser: number;
  //是否为管理员
  admin: Boolean;
  //登录时间
  loginDate: string;
  //登录IP
  loginIp: string;
  email?: string;
  // 备注
  notes?: string;
  phone?: string;
  roleId?: string;
  sex: '0' | '1';
  // 首页
  homePath?: string;
  enterpriseId?: string | number;
  dept?: Recordable;
}

export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}
