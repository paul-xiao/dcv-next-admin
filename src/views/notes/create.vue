<template>
  <div class="demo-container">
    <IAsideList @catalog-item-click="onCatalogItemClick" @search-start="onSearchStart" ref="IAsideListRef" />
    <div class="content">
      <div class="top">
        <IEditorHeader
          :title="state.content?.title"
          :readonly="!isEditable"
          :date="state.content?.updateTime || ''"
          @submit="onSubmit"
          @eidt="onEdit"
        />
      </div>
      <div class="main">
        <IEditor class="border" v-model="state.content" :editable="true" ref="editorRef" />
      </div>
    </div>
    <ISearchBox @item-click="onSearchResultClick" ref="ISearchBoxRef" />
  </div>
</template>
<script lang="ts" setup>
  import { watch, ref } from 'vue';
  import IEditorHeader from './src/create/IEditorHeader.vue';
  import IAsideList from './src/create/IAsideList.vue';
  import ISearchBox from './src/create/ISearchBox.vue';
  import axios from 'axios';
  import { IEditor } from '@/components/IEditor';

  const state = reactive({
    content: {} as any,
  });
  const editorRef = ref<any>();

  interface FormData {
    id?: string;
    title: string;
    thumbnail?: string;
    updateTime?: string;
    content: string;
    catalogId: string | number;
  }

  const IAsideListRef = ref<any>(null);
  const ISearchBoxRef = ref<any>(null);
  const isEditable = ref<boolean>(false);

  watch(
    () => state.content,
    val => {
      console.log(val);
    },
  );

  function onSubmit() {
    const isConfirm = confirm('确定提交？');
    isConfirm &&
      axios[state.content?.id ? 'put' : 'post']('/api/article', state.content).then(() => {
        IAsideListRef.value?.getCatalog();
        // editorRef.value?.setEditable(false)
        isEditable.value = false;
      });
    // 刷新列表
  }
  function onEdit() {
    // editorRef.value?.setEditable(true)
    isEditable.value = true;
  }

  function getArticleById(id: string) {
    return axios.get(`/api/article/${id}`);
  }

  async function onCatalogItemClick({ id, articleId }: any) {
    if (!articleId) return;
    // editorRef.value?.setEditable(false)
    isEditable.value = false;
    const artile: any = await getArticleById(articleId);
    const res = artile.data.result;
    editorRef?.value?.setContent(res);
  }

  function onSearchResultClick(item: any) {
    IAsideListRef.value.setActive(item.id);
  }

  function onSearchStart() {
    ISearchBoxRef.value.visable = true;
  }
</script>
<style lang="scss" scoped>
  .demo-container {
    height: 100%;
    display: flex;
    position: relative;
    .content {
      flex: 1;
    }
  }
</style>
