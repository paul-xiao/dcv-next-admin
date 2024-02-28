<template>
  <div>
    <DcTable @register="registerTable">
      <template #opt="{ row }">
        <ElButton type="primary" text @click="onAdd(row)">编辑</ElButton>
      </template>
      <template #batch>
        <ElButton type="primary" @click="onAdd">添加</ElButton>
      </template>
    </DcTable>
  </div>
</template>
<script lang="ts" setup>
import { getMenuList } from '@/api/menu'
import {ITable as DcTable,  useTable } from '@/components/ITable'
import { useRouter } from 'vue-router'
import { tableSchema } from './data'
const router = useRouter()
const [registerTable, { reload }] = useTable({
  api: getMenuList as any,
  schema: tableSchema,
  page: {
    size: 10,
    current: 1
  }
})

function onAdd(row) {
  // todo
}
</script>
