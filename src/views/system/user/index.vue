<template>
  <div>
    <ITable @register="registerTable" @rowDel="onRowDel">
      <template #avatar="{ row }">
        <img :src="`/image/${row.avatar}`" width="100" height="100" v-if="row.avatar" style="max-height: 150px" />
      </template>
      <template #opt="{ row }">
        <ElButton type="primary" text @click="onRowEdit(row)">编辑</ElButton>
      </template>
      <template #batch>
        <ElButton type="primary" @click="onAdd">添加</ElButton>
      </template>
    </ITable>
  </div>
</template>
<script lang="ts" setup>
  import { list, remove } from '@/api/user';
  import { ITable, useTable } from '@/components/ITable';
  import { useRouter } from 'vue-router';
  import { tableSchema } from './data';
  const router = useRouter();
  
  const [registerTable, { reload }] = useTable({
    api: list as any,
    schema: tableSchema,
  });
  function onAdd() {
    router.push({ name: 'system_user_add' });
  }
  function onRowEdit(row: any) {
    router.push({ path: '/system/user/update', query: { id: row.id } });
  }

  async function onRowDel(row: { id: any }) {
    await remove(row.id);
    reload();
  }
</script>
