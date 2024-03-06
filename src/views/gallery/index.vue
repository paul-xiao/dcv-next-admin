<template>
  <div>
    <ITable @register="registerTable" @rowDel="onRowDel">
      <template #opt="{ row }">
        <ElButton type="primary"  text @click="onAdd(row)">编辑</ElButton>
      </template>
      <template #batch>
        <ElButton type="primary" @click="onAdd">添加</ElButton>
      </template>
    </ITable>
  </div>
</template>
<script lang="ts" setup>
import { getGalleryList, remove } from '@/api/gallery'
import { ITable, useTable } from '@/components/ITable'
import { useRouter } from 'vue-router'
const router = useRouter()
const [registerTable, { reload }] = useTable({
  api: getGalleryList as any,
  schema: [
    {
      label: '名称',
      prop: 'name'
    },
    {
      label: '大小',
      prop: 'size'
    },
    {
      label: '拍摄时间',
      prop: 'takeTime'
    },
    {
      label: '上传时间',
      prop: 'uploadTime'
    }
  ],
  page: {
    current:1,
    size: 10
  }
}) 
function onAdd(row: any) {
  console.log(row)
  router.push({ name: 'notes_add', state: { id: row.id} })
}

async function onRowDel(row: { id: any }) {
  await remove(row.id)
  reload()
}
</script>
