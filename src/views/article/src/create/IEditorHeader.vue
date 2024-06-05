<template>
  <div class="head">
    <div class="title">
      {{ title || '标题' }} <small v-if="date">{{ fromNow(date) }}</small>
    </div>
    <div>
      <ElButton v-if="readonly" @click="onEdit">编辑</ElButton>
      <ElButton v-else @click="onSubmit">提交</ElButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { fromNow } from '@/utils/dayjs'
const _props = withDefaults(
  defineProps<{
    title: string | undefined
    date: string | undefined
    readonly: boolean
  }>(),
  {
    readonly: true
  }
)

const emit = defineEmits(['eidt', 'submit', 'export'])

function onSubmit() {
  emit('submit')
}
function onEdit() {
  emit('eidt')
}
</script>
<style lang="scss" scoped>
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
</style>
