<template>
  <div>
    <ITable @register="registerTable" @rowDel="onRowDel">
      <template #thumbnail="{ row }">
        <img :src="row.thumbnail" width="150" height="150" v-if="row.thumbnail" style="max-height: 150px;">
      </template>
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
import { list, remove } from '@/api/project'
import { ITable, useTable } from '@/components/ITable'
import { useRouter } from 'vue-router'
import { tableSchema } from './data'
const router = useRouter()
const [registerTable, { reload }] = useTable({
  api: list as any,
  schema: tableSchema,
}) 
function onAdd(row: any) {
  console.log(row)
  router.push({ name: 'project_add', state: { id: row.id} })
}

async function onRowDel(row: { id: any }) {
  await remove(row.id)
  reload()
}
</script>
