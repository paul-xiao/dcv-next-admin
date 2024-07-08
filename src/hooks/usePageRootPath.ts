/**
 * @description 获取页面根路径
 * @author paul.xiao
 * @date 2024-07-01 11:18:29
 * @param {*}
 * @return {*}
 */
export function usePageRootPath() {
  const rootPath = ref('');
  const getRootPath = () => {
    const path = window.location.pathname;
    const rootPath = path.substring(0, path.lastIndexOf('/'));
    return rootPath;
  };
  onMounted(() => {
    rootPath.value = getRootPath();
  });
  return { rootPath };
}
