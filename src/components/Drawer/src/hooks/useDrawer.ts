export function useDrawer(params): any {

  const IDrawerRef = ref()
  // 注册
  function register(instance) {
    instance.setProps(params)
    IDrawerRef.value = instance
  }
  // 钩子
  const hooks = {
    openDrawer: () => {
      IDrawerRef.value.open()
    }
  };

  return [register, hooks];
}
