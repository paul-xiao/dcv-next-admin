<template>
  <div>
    <ITable @register="registerTable">
      <template #batch> <ElButton type="primary" :icon="Plus" @click="onAdd">添加</ElButton> </template>
      <template #thumbnail="{ row }">
        <el-image
          v-show="row.thumbnail"
          style="width: 50px; height: 50px"
          :src="`/image/${row.thumbnail}`"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="[`/image/${row.thumbnail}`]"
          :initial-index="4"
          fit="cover"
        />
      </template>
      <template #opt="{ row }">
        <ElButton type="primary" :icon="View" text @click="onRowView(row)">详情</ElButton>
        <ElButton type="primary" :icon="Edit" text @click="onEdit(row)">编辑</ElButton>

        <el-popconfirm title="Are you sure to delete this?" @confirm="onRowDel(row)">
          <template #reference>
            <ElButton type="danger" :icon="Delete" text>删除</ElButton>
          </template>
        </el-popconfirm>
      </template>
    </ITable>
  </div>
</template>
<script lang="ts" setup>
  import { getArticleList, remove } from '@/api/article';
  import { ITable, useTable } from '@/components/ITable';
  import { useRouter } from 'vue-router';
  import { tableSchema, searchSchema } from './data';
  import { Plus, Edit, Delete, View } from '@element-plus/icons-vue';
  const router = useRouter();
  const [registerTable, { reload }] = useTable({
    title: '文章列表',
    api: getArticleList as any,
    schema: tableSchema,
    search: {
      schema: searchSchema,
    },
    page: {
      size: 10,
      current: 1,
    },
    componentProps: {
      optWidth: 320,
    },
  });
  function onAdd() {
    router.push('/article/create');
  }
  function onEdit(row: any) {
    router.push({ path: '/article/update', query: { id: row.id } });
  }

  function onRowView(row: any) {
    router.push({
      path: '/article/detail',
      query: {
        id: row.id,
      },
    });
  }
  async function onRowDel(row: { id: any }) {
    await remove(row.id);
    reload();
  }
</script>
<style lang="scss" scoped>
  ::v-deep .el-table .el-table__cell {
    position: inherit;
  }
</style>
