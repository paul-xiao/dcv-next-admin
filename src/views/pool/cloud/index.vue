<template>
  <Table @register="registerTable" />
</template>
<script setup lang="ts">
  import { list } from '@/api/pool/cloud';
  import { Table, useTable } from '@/components/Table';
  import { schema, searchSchema } from './cloud';
  const [registerTable, {}] = useTable({
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
      title: '算力资源池',
      addBtn: true,
    },
  });
</script>
