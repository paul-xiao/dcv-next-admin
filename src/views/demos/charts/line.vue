<template>
  <div ref="chartContainer" style="width: 600px; height: 400px"></div>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useEcharts } from '@/components/Chart';

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
          type: 'line',
        },
      ],
    },
  });

  onMounted(() => {
    // Access the chart instance
    console.log(chartInstance.value);
  });
</script>
