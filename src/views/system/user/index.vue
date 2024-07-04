<template>
  <div>
    <ITable @register="registerTable" @rowDel="onRowDel">
      <template #avatar="{ row }">
        <img :src="`/image/${row.avatar}`" width="100" height="100" v-if="row.avatar" style="max-height: 150px" />
      </template>
      <template #opt="{ row }">
        <ElButton type="primary" :icon="Edit" text @click="onRowEdit(row)">编辑</ElButton>
        <ElButton type="primary" :icon="Edit" text @click="onPwdUpdate(row)">修改密码</ElButton>
      </template>
      <template #batch>
        <ElButton type="primary" :icon="Plus" @click="onAdd">添加</ElButton>
      </template>
    </ITable>
    <!-- Drawer Usage Demo -->
    <IDrawer @register="registerDrawer">
      <ChangePassword ref="ChangePasswordRef" />
    </IDrawer>
  </div>
</template>
<script lang="ts" setup>
  import { list, remove } from '@/api/user';
  import { ITable, useTable } from '@/components/ITable';
  import { IDrawer, useDrawer } from '@/components/IDrawer';
  import { Edit, Delete, Plus } from '@element-plus/icons-vue';
  import ChangePassword from './changePassword.vue';
  import { useRouter } from 'vue-router';
  import { tableSchema } from './data';

  const router = useRouter();

  const ChangePasswordRef = ref();

  const [registerTable, { reload }] = useTable({
    api: list as any,
    schema: tableSchema,
  });

  const [registerDrawer, { openDrawer, closeDrawer, showLoading }] = useDrawer({
    title: '修改密码',
    width: '50%',
    onSubmit,
  });
  function onAdd() {
    router.push({ name: 'system_user_add' });
  }
  function onRowEdit(row: any) {
    router.push({ path: '/system/user/update', query: { id: row.id } });
  }
  function onPwdUpdate(row: any) {
    openDrawer(row);
  }

  async function onSubmit(row) {
    try {
      showLoading();
      const res = await ChangePasswordRef.value.submit(row);
      res && closeDrawer();
    } finally {
      showLoading(false);
    }
  }

  async function onRowDel(row: { id: any }) {
    await remove(row.id);
    reload();
  }
</script>
