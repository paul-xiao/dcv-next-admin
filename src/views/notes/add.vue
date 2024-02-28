<template>
  <div class="p-5 bg-white">
    <div class="pb-2 text-right">
      <ElButton type="primary" @click="onSubmit"> 提交</ElButton>
    </div>
      <IEditor class="border" v-model="state.content" :editable="true"></IEditor>
  </div>
</template>
<script lang="ts" setup>
import { getArticleById } from '@/api/article'
import { useRouter } from 'vue-router'
import { onMounted, reactive, ref, watch } from 'vue'
import { IEditor } from 'dcv-editor'
import 'dcv-editor/dist/style.css'
const router = useRouter()

const state = reactive({
  content: {} as any
})
onMounted(() => {
  const { id } = history.state
  id && getDetail(id)
})

async function getDetail(id: number) {
  const res: any = await getArticleById(id)
}

async function onSubmit() {
  console.log(state.content);
  router.push('/notes')
  
}
</script>
