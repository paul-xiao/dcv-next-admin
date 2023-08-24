<template>
  <Table @register="registerTable">
    <template #batch>
      <ElButton type="primary" icon="plus" @click="onCreate">新增</ElButton>
      <ElButton type="primary" @click="onQuotaConf">容量配置</ElButton>
    </template>
    <template #opt="{ row }">
      <ElButton type="primary" text size="small" @click="onDetailView(row)">详情</ElButton>
      <ElButton type="primary" text size="small" @click="onQuotaConf()">容量配置</ElButton>
    </template>
  </Table>
  <!-- 抽屉弹窗 -->
  <CreateDrawer @register="registerDrawer" />
</template>
<script setup lang="ts">
  import { list } from '@/api/pool/cloud';
  import { Table, useTable } from '@/components/Table';
  import { useDrawer } from '@/components/Drawer';
  import { schema, searchSchema } from './cloud';
  import CreateDrawer from './createDrawer.vue';
  const [registerTable, { add }] = useTable({
    title: '算力资源池',
    api: list as any,
    schema,
    search: {
      schema: searchSchema,
    },
    page: {
      pageNum: 1,
      pageSize: 10,
      total: 0,
    },
    conf: {
      optWidth: '80px',
    },
  });

  const [registerDrawer, { openDrawer }] = useDrawer({
    title: '新增算力资源池',
    size: '50%',
  });

  function onCreate() {
    openDrawer();
  }
  function onQuotaConf() {}
  function onDetailView(row) {
    console.log(row.id);
  }
</script>
