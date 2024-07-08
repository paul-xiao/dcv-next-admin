<template>
  <div>
    <ITable @register="registerTable" @row-del="onRowDel">
      <template #hidden="{ row }">
        {{ row.hidden ? '是' : '否' }}
      </template>
      <template #icon="{ row }">
        <SvgIcon :icon="row.icon" />
      </template>
      <template #opt="{ row }">
        <ElButton type="primary" :icon="Edit" text @click="onUpdate(row)">编辑</ElButton>
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
  import { list, remove } from '@/api/menu';
  import { ITable, useTable } from '@/components/ITable';
  import { Edit, Delete } from '@element-plus/icons-vue';
  import { SvgIcon } from '@/components/IIcon';
  import { useRouter, useRoute } from 'vue-router';
  import { tableSchema } from './data';
  const router = useRouter();
  const route = useRoute();
  const rootPath = route.matched[1].path;
  const [registerTable, { reload }] = useTable({
    api: list as any,
    schema: tableSchema,
    componentProps: {
      optWidth: 200,
    },
    search: {
      schema: [
        {
          label: '父级ID',
          prop: 'pid',
        },
      ],
    },
    page: {
      current: 1,
      size: 10,
    },
  });
  function onAdd() {
    router.push(rootPath + '/add');
  }

  async function onUpdate(row: { id: any }) {
    router.push({ path: rootPath + '/update', query: { id: row.id } });
  }
  async function onRowDel(row: { id: any }) {
    await remove(row.id);
    reload();
  }
</script>
