<template>
  <section>
    <h1>算网资源纳管</h1>

    <el-skeleton :count="12" animated :loading="!state.syncResourceData.length" class="grid grid-cols-6 gap-3 my-2">
      <template #template>
        <div class="flex items-center p-5 border">
          <div class="w-30">
            <el-skeleton-item variant="image" class="h-20" style="width: 30px; height: 30px" />
          </div>
          <div class="flex-1">
            <el-skeleton-item />
            <el-skeleton-item />
          </div>
        </div>
      </template>
      <div class="grid grid-cols-6 gap-3 my-2">
        <DataBox :option="item" v-for="item of state.syncResourceData" />
      </div>
    </el-skeleton>
  </section>
  <section>
    <h1>算网资源实例</h1>
    <el-skeleton :count="12" animated :loading="!state.resourceData.length" class="grid grid-cols-6 gap-3 my-2">
      <template #template>
        <div class="flex items-center p-5 border">
          <div class="w-30">
            <el-skeleton-item variant="image" class="h-20" style="width: 30px; height: 30px" />
          </div>
          <div class="flex-1">
            <el-skeleton-item />
            <el-skeleton-item />
          </div>
        </div>
      </template>
      <div class="grid grid-cols-6 gap-3 my-2">
        <DataBox :option="item" v-for="item of state.resourceData" />
      </div>
    </el-skeleton>
  </section>
  <div class="flex">
    <section class="flex-1">
      <h1>各云商云池-云区域总数</h1>
      <el-skeleton :loading="regionLoading" animated>
        <template #template>
          <div class="flex flex-row-reverse transition transform rotate-180 p-10">
            <el-skeleton-item :style="{ width: '20px', height: 300 / item + 'px' }" v-for="item of 12" class="mx-4" />
          </div>
        </template>
        <IChart :option="state.cloudRegionChartOption" width="100%" height="400px" />
      </el-skeleton>
    </section>
    <section class="flex-1">
      <h1>算网资源使用情况统计</h1>

      <el-skeleton :count="6" :loading="!state.qutaData.length" animated class="grid grid-cols-3 gap-3 my-2">
        <template #template>
          <div class="p-5">
            <el-skeleton-item style="width: 50px" />
            <div class="flex justify-center items-center">
              <div class="flex-1">
                <el-skeleton-item style="width: 30px; display: block" class="mb-2" />
                <el-skeleton-item style="width: 30px; display: block" />
              </div>
              <el-skeleton-item variant="circle" style="height: 100px; width: 100px" />
            </div>
          </div>
        </template>
        <div class="flex flex-wrap mt-2">
          <IChart v-for="item of state.qutaData" :option="item.option" width="32%" height="200px" />
        </div>
      </el-skeleton>
    </section>
  </div>
  <section>
    <h1>云资源实例明细</h1>
    <div class="my-2">
      <el-table :data="state.coudResourceData" height="450" stripe style="width: 100%" class="my-table">
        <el-table-column prop="cloudTypeString" label="云商"></el-table-column>
        <el-table-column prop="vpnNum" label="VPN"></el-table-column>
        <el-table-column prop="vpcNum" label="VPC"></el-table-column>
        <el-table-column prop="networkNum" label="接入点"></el-table-column>
        <el-table-column prop="vmNum" label="虚机"></el-table-column>
        <el-table-column prop="diskNum" label="磁盘"></el-table-column>
        <el-table-column prop="ossNum" label="对象存储(桶数量)"></el-table-column>
        <el-table-column prop="eipNum" label="弹性IP"></el-table-column>
        <el-table-column prop="mysqlNum" label="MYSQL"></el-table-column>
        <el-table-column prop="postgresqlNum" label="POSTGRESQL"></el-table-column>
        <el-table-column prop="redisNum" label="REDIS"></el-table-column>
        <el-table-column prop="clbNum" label="负载均衡"></el-table-column>
        <el-table-column prop="containerNum" label="容器集群"></el-table-column>
      </el-table>
    </div>
  </section>
</template>
<script setup lang="ts">
  import { option, qutaPieOption } from './data';
  import { DataBox } from '@/components/IDataDisplay';
  import IChart from '@/components/IChart';
  import { getCloudNumByType, getQuota, getCloudResource, getResource } from '@/api/overview/dashboard';
  const regionLoading = ref(false);
  const state = reactive({
    syncResourceData: [] as any,
    resourceData: [] as any,
    cloudRegionChartOption: option,
    qutaData: [] as any,
    coudResourceData: [] as any,
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
    state.coudResourceData = data;
  }

  // 各云商云池-云区域总数
  async function setCloudRegionData() {
    regionLoading.value = true;
    const data = await getCloudNumByType();
    state.cloudRegionChartOption.xAxis.data = Object.keys(data) as never[];
    state.cloudRegionChartOption.series[0].data = Object.values(data);
    regionLoading.value = false;
  }
  // 算网资源使用情况统计
  async function setQutaData() {
    const data = await getQuota();

    state.qutaData = data
      .filter(q => q.name && q.name !== '接入点')
      .map((d, idx) => {
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
