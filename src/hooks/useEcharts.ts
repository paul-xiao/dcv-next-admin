import echarts from '@/utils/echarts';
export function useEcharts(ele: Ref<HTMLDivElement | null>) {
  let echartsInstance: echarts.ECharts | null;
  function initCharts() {
    const el = unref(ele);
    console.log(el);
    
    if (!el) return;
    echartsInstance = echarts.init(el);
    console.log(echartsInstance);
  }

  function setOption(option: any) {
    showLoading();
    
    if (!echartsInstance) initCharts();
    if (!echartsInstance) return;
    

    echartsInstance.setOption(option);
    hideLoading();
  }

  function getInstance() {
    if (!echartsInstance) initCharts();
    return echartsInstance;
  }

  function onResize() {
    echartsInstance?.resize();
  }

  function showLoading() {
    echartsInstance?.showLoading();
  }
  function hideLoading() {
    echartsInstance?.hideLoading();
  }

  onMounted(() => {
    window.addEventListener('resize', onResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', onResize);
  });

  return {
    setOption,
    getInstance,
  };
}
