<template>
  <div v-if="state.article" class="p-5 bg-white">
    <div class="py-5">
      <div class="text-lg font-bold">
        {{ state.article.title }}
      </div>
      <div>
        <span v-for="tag of state.article.tags" class="mr-2 text-xs font-thin">{{ tag }}</span>
        <span class="text-xs font-thin">{{ fromNow(state.article.createTime) }}</span>
      </div>
    </div>
    <div class="w-full viewer" v-html="state.article.content"></div>
  </div>
</template>
<script lang="ts" setup>
import { getArticleById } from '@/api/article'
import { fromNow } from '@/utils/dayjs'
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const state = reactive({
  article: {} as any
})
if (!route.query?.id) {
  router.push('/notes')
} else {
  getDetail()
}

async function getDetail() {
  const res: any = await getArticleById(route.query?.id)
  state.article = res.result
}
</script>
