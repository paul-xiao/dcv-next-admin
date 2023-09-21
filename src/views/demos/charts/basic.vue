<template>
  <div ref="chartContainer" style="width: 600px; height: 400px"></div>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useEcharts } from '@/components/IChart';

  const _porps = defineProps({
    chartType: {
      type: String,
      default: 'bar',
    },
  });
  const chartContainer = ref();
  const chartInstance = useEcharts({
    ref: chartContainer,
    options: {
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
          type: _porps.chartType,
        },
      ],
    },
  });

  onMounted(() => {
    // Access the chart instance
    console.log(chartInstance.value);
  });
</script>