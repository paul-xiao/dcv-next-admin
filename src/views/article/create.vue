<template>
  <IForm @register="registerForm" @submit="onSubmit">
    <template #content="{ model }">
      <IEditor class="border min-h-lg" v-model="model.content"  ref="editorRef" />
    </template>
  </IForm>
</template>
<script lang="ts" setup>
  import { watch, ref } from 'vue';
  import { IEditor } from '@/components/IEditor';
  import { create, update, getArticleById } from '@/api/article';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { formSchema } from './data';
  import { IForm, useForm } from '@/components/IForm';
  const router = useRouter();
  const route = useRoute();
  const state = reactive({
    content: {} as any,
  });
  const editorRef = ref<any>();
  const [registerForm, { setValues }]: any = useForm({
    componentProps: {
      labelWidth: 100,
      labelSuffix: ':',
    },
    schema: formSchema,
  });

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
  const isEditable = ref<boolean>(true);


  const rootPath = route.matched[0].path;
  const isUpdate = route.path === rootPath + '/update';
  const { id } = route.query;
  if (isUpdate && !id) router.push(rootPath + '/index');

  watch(
    () => state.content,
    val => {
      console.log(val);
    },
  );
  onMounted(() => {
    route.query?.id && onCatalogItemClick({ articleId: route.query.id });
  });

  function onSubmit(form) {
    const request = route.query.id  ? update : create;
    ElMessageBox.confirm('确定提交?', 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }).then(() => {

      form.tags = form.tags.join(',');
      request(form).then((res) => {    
        console.log(res);
            
        if(!res) return
        IAsideListRef.value?.getCatalog();
        editorRef.value?.editor?.setEditable(false);
        router.push('/article')
        ElMessage({
          type: 'success',
          message: '提交成功',
        });
      });
    });

    // 刷新列表
  }
 

 

  async function onCatalogItemClick({ articleId }: any) {
    if (!articleId) return;
    // editorRef.value?.setEditable(false)
    isEditable.value = false;
    const res: any = await getArticleById(articleId);
    const { content } = res;
    res.tags = [].concat(res.tags)
    setValues(res)
    editorRef?.value?.setContent(content);
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
