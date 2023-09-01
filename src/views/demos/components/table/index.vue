<template>
  <Table @register="registerTable">
    <template #opt="{ row }">
      <ElButton type="primary" text size="small" icon="view" @click="detail()">详情</ElButton>
      <ElButton type="danger" text size="small" icon="delete" @click="del()">删除</ElButton>
    </template>
  </Table>
</template>
<script setup lang="ts">
  import { Table, useTable } from '@/components/Table';
  import { tableSchema } from './schema';
  const [registerTable, {}] = useTable({
    title: '表格',
    api: () => Promise.resolve({ result: [{ field1: 1111, field2: 1111, field3: 1111, field4: 1111 }] }) as any,
    schema: tableSchema,
    page: false,
  });

  function detail() {}
  function del() {}
</script>
