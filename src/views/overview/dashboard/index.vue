<template>
  <section>
    <h1>算网资源纳管</h1>
    <div ref="chartRef" style="width: 500px; height: 400px;"></div>
  </section>
</template>
<script setup lang="ts">
  import { option } from './data'
  import { useEcharts } from '@/hooks/useEcharts';
  const chartRef = ref<HTMLDivElement | null>(null);
 
  onMounted(() => {
    const { setOption, getInstance } = useEcharts(chartRef);
    setOption(option);
  });
</script>
