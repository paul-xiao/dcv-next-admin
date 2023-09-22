<template>
  <section>
    <h1>算网资源纳管</h1>
    <div class="grid grid-cols-6 gap-3 my-2">
      <template v-for="item of 12" :key="item" v-if="!state.syncResourceData.length">
        <el-skeleton :rows="2" animated class="my-2" />
      </template>
      <DataBox :option="item" v-for="item of state.syncResourceData" />
    </div>
  </section>
  <section>
    <h1>算网资源实例</h1>
    <div class="grid grid-cols-6 gap-3 my-2">
      <template v-for="item of 12" :key="item" v-if="!state.resourceData.length">
        <el-skeleton :rows="2" animated class="my-2" />
      </template>
      <DataBox :option="item" v-for="item of state.resourceData" />
    </div>
  </section>
  <div class="flex">
    <section class="flex-1">
      <h1>各云商云池-云区域总数</h1>
      <IChart :option="state.cloudRegionChartOption" width="100%" height="400px" />
    </section>
    <section class="flex-1">
      <h1>算网资源使用情况统计</h1>
      <div class="flex flex-wrap mt-2">
        <IChart
          v-for="item of state.qutaData"
          :option="item.option"
          width="32%"
          height="120px"
          class="border border-dashed"
        />
      </div>
    </section>
  </div>
  <section>
    <h1>云资源实例明细</h1>
  </section>
</template>
<script setup lang="ts">
  import { option, qutaPieOption } from './data';
  import { DataBox } from '@/components/IDataDisplay';
  import IChart from '@/components/IChart';
  import { getCloudNumByType, getQuota, getCloudResource, getResource } from '@/api/overview/dashboard';
  const state = reactive({
    syncResourceData: [] as any,
    resourceData: [] as any,
    cloudRegionChartOption: option,
    qutaData: [] as any,
  });
  async function setResourceStat() {
    const data = await getResource();

    const getParsedResources = (data = []) => {
      return data.map(d => {
        const { name, type, used, total, icon, path, unit } = d;
        const value = type === 'num' ? total : [used, total];
        const label = name;
        return { label, value, icon, path, unit };
      });
    };
    state.resourceData = getParsedResources(data.data);
    state.syncResourceData = getParsedResources(data.sync);
    console.log(state.syncResourceData);
  }
  async function setCloudResource() {
    const data = await getCloudResource({ businessId: '' });
    console.log(data);
  }

  // 各云商云池-云区域总数
  async function setCloudRegionData() {
    const data = await getCloudNumByType();
    state.cloudRegionChartOption.xAxis.data = Object.keys(data) as never[];
    state.cloudRegionChartOption.series[0].data = Object.values(data);
  }
  // 算网资源使用情况统计
  async function setQutaData() {
    const data = await getQuota();

    state.qutaData = data.map((d, idx) => {
      const { name, usable, used } = d;
      const getUnit = name => {
        switch (name) {
          case '块存储':
            return 'disk';
          case '带宽':
            return 'bandwidth';
          case 'CPU':
          case 'GPU':
            return '核';
          default:
            return '个';
        }
      };
      const data = [
        { name: '已用', value: usable, unit: getUnit(name) },
        { name: '可用', value: used, unit: getUnit(name) },
      ];
      const option = qutaPieOption(name, data, idx);
      return { name, option };
    });
  }
  setResourceStat();
  setCloudResource();
  setCloudRegionData();
  setQutaData();
</script>
