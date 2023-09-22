<template>
  <div ref="chartRef" :style="{ width, height }"></div>
</template>
<script setup lang="ts">
  import { watch } from 'vue';
  import { useEcharts } from './hooks/useEcharts';

  const props = defineProps({
    option: {
      type: Object,
      default: () => {},
    },
    width: {
      type: String,
      default: '100px',
    },
    height: {
      type: String,
      default: '100px',
    },
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const chartInstance = ref();

  onMounted(() => {
    try {
      const { setOption, getInstance } = useEcharts(chartRef);
      setOption(props.option);
      chartInstance.value = getInstance();
    } catch (error) {
      console.log(error);
    }
  });

  watch(
    () => props.option,
    val => {
      chartInstance.value.setOption(val, true);
      console.log(val);
      
    },
    { deep: true },
  );
</script>
