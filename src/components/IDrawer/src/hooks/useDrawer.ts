export function useDrawer(params): any {
  const IDrawerRef = ref();
  // 注册
  function register(instance) {
    instance.setProps(params);
    IDrawerRef.value = instance;
  }
  // 钩子
  const hooks = {
    openDrawer: params => {
      IDrawerRef.value.open(params);
    },
    closeDrawer: () => {
      IDrawerRef.value.close();
    },
    showLoading: (loading = true) => {
      IDrawerRef.value.setLoading(loading);
    },
  };

  return [register, hooks];
}
