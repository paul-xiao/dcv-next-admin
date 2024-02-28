import { inject } from 'vue';
import globalVars from '../settings/global';

const globalKey = Symbol(); // unique key

export const globalProvide = {
  install(app) {
    // 在此处添加你需要提供给全局的数据或方法
    app.provide(globalKey, globalVars);
  },
};

export const getGlobalConfig = key => {
  const globalVars = inject(globalKey);
  if (!globalVars) {
    throw new Error('globalVars not found');
  }

  return globalVars[key];
};
