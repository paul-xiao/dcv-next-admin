import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

interface EchartsHookConf {
  ref: Ref;
  options?: any;
}

export default function useEcharts(conf: EchartsHookConf) {
  const chartInstance = ref<any>(null);

  // Initialize the chart when the component is mounted
  onMounted(() => {
    // Create the chart instance
    chartInstance.value = echarts.init(conf.ref.value);

    // Configure the chart options
    // For simplicity, we'll just set some basic options here
    const defaultOptions = {
      xAxis: {
        type: 'category',
        data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70],
          type: 'bar',
        },
      ],
    };

    // Set the options and render the chart
    chartInstance.value.setOption(conf.options || defaultOptions);
  });

  // Dispose of the chart when the component is unmounted
  onUnmounted(() => {
    chartInstance.value.dispose();
  });

  return chartInstance;
}
