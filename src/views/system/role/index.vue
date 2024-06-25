<template>
  <div>
    <ITable @register="registerTable" @rowDel="onRowDel">
      <template #avatar="{ row }">
        <img :src="`/image/${row.avatar}`" width="100" height="100" v-if="row.avatar" style="max-height: 150px" />
      </template>
      <template #opt="{ row }">
        <ElButton type="primary" text @click="onRowEdit(row)" :icon="Edit">编辑</ElButton>
        <el-popconfirm title="Are you sure to delete this?" @confirm="onRowDel(row)">
          <template #reference>
            <ElButton type="danger" :icon="Delete" text>删除</ElButton>
          </template>
        </el-popconfirm>
      </template>
      <template #batch>
        <ElButton type="primary" @click="onAdd">添加</ElButton>
      </template>
    </ITable>
  </div>
</template>
<script lang="ts" setup>
  import { list, remove } from '@/api/role';
  import { ITable, useTable } from '@/components/ITable';
  import { useRouter } from 'vue-router';
  import { tableSchema } from './data';
  import { Edit, Delete } from '@element-plus/icons-vue'
  const router = useRouter();
  const route = useRoute();
  const rootPath = route.matched[1].path;
  const [registerTable, { reload }] = useTable({
    api: list as any,
    schema: tableSchema,
  });
  function onAdd() {
    router.push(rootPath + '/add');
  }
  function onRowEdit(row: any) {
    router.push({ path: rootPath + '/update', query: { id: row.id } });
  }

  async function onRowDel(row: { id: any }) {
    await remove(row.id);
    reload();
  }
</script>
