<template>
  <div>
    <ITable @register="registerTable">
      <template #batch> <ElButton type="primary" :icon="Plus" @click="onAdd">添加</ElButton> </template>
      <template #thumbnail="{ row }">
        <el-image
          style="width: 100px; height: 100px"
          :src="row.thumbnail"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="[row.thumbnail]"
          :initial-index="4"
          fit="cover"
        />
      </template>
      <template #opt="{ row }">
        <ElButton type="primary" :icon="View" text @click="onRowView(row)">详情</ElButton>
        <ElButton type="primary" :icon="Edit" text @click="onAdd(row)">编辑</ElButton>
        <ElButton type="danger" :icon="Delete" text @click="onAdd(row)">删除</ElButton>
      </template>
    </ITable>
  </div>
</template>
<script lang="ts" setup>
  import { getArticleList, remove } from '@/api/article';
  import { ITable, useTable } from '@/components/ITable';
  import { useRouter } from 'vue-router';
  import { Plus, Edit, Delete, View } from '@element-plus/icons-vue';
  const router = useRouter();
  const [registerTable, { reload }] = useTable({
    title: '文章列表',
    api: getArticleList as any,
    schema: [
      {
        label: '标题',
        prop: 'title',
      },
      {
        label: '缩略图',
        prop: 'thumbnail',
        slot: true,
      },
      {
        label: '标签',
        prop: 'tags',
      },
      {
        label: '创建时间',
        prop: 'createTime',
      },
    ],
    search: {
      schema: [
        {
          label: '标题',
          prop: 'title',
        },
        {
          label: '标签',
          prop: 'tags',
        },
      ],
    },
    page: {
      size: 10,
      current: 1,
    },
    componentProps: {
      optWidth: 320,
    },
  });
  function onAdd(row: any) {
    console.log(row);
    router.push({ name: 'notes_add', state: { id: row.id } });
  }

  function onRowView(row: any) {
    router.push({
      path: '/notes/detail',
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
