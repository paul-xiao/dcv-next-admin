<template>
  <ElRow>
    <ElCol :span="12">
      <BasicChart />
    </ElCol>
    <ElCol :span="12">
      <BasicChart chart-type="line" />
    </ElCol>
    <ElCol :span="12">
      <BasicChart chart-type="pie" />
    </ElCol>
    <ElCol :span="12">
      <BasicChart />
    </ElCol>
    <ElCol :span="12">
      <BasicChart />
    </ElCol>
  </ElRow>
</template>
<script setup lang="ts">
  import BasicChart from './basic.vue';
</script>
