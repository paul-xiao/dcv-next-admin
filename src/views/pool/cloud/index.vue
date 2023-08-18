<template>
  <Table @register="registerTable" />
</template>
<script setup lang="ts">
  import { list } from '@/api/pool/cloud';
  import { Table, useTable } from '@/components/Table';
  import { schema } from './cloud';
  const [registerTable, {}] = useTable({
    api: list as any,
    schema,
    page: {
      pageNum: 1,
      pageSize: 10,
      total: 0,
    },
    conf: {
      title: '算力资源池',
      addBtn: true,
    },
  });
</script>
