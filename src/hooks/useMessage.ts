import { ElNotification } from 'element-plus';

export function useMessage() {
  return {
    notify: ElNotification,
  };
}
