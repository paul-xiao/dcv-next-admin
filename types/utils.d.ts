/**
 * @fileName utils.ts
 * @description 工具类
 * @date 2022-09-05 16:47:23
 * @author lxl
 */

import type { ComputedRef, Ref } from 'vue';

export type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>;
};
