<template>
  <div>
    <ITable @register="registerTable" @rowDel="onRowDel">
      <template #thumbnail="{ row }">
        <el-image
          style="width: 100px; height: 100px"
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
  import { list, remove } from '@/api/link';
  import { ITable, useTable } from '@/components/ITable';
  import { Edit, Delete } from '@element-plus/icons-vue';
  import { useRouter, useRoute } from 'vue-router';
  const router = useRouter();
  const route = useRoute();
  const rootPath = route.matched[0].path;
  const [registerTable, { reload }] = useTable({
    api: list as any,
    schema: [
      {
        label: '名称',
        prop: 'title',
      },
      {
        label: '图片',
        prop: 'thumbnail',
      },
      {
        label: '备注',
        prop: 'notes',
      }
    ],
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
