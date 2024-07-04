<template>
  <IForm @register="registerForm" @submit="onSubmit">
    <template #permissions="{ model }">
      <ElTreeSelect
        :data="treeData"
        v-model="model.permissions"
        multiple
        node-key="id"
        :props="{
          label: 'title',
          id: 'id',
          children: 'children',
        }"
        :render-after-expand="false"
        check-strictly
        show-checkbox
        class="w-full"
      >
      </ElTreeSelect>
    </template>
  </IForm>
</template>
<script lang="ts" setup>
  import { create, update, detail } from '@/api/role';
  import { menuTree } from '@/api/menu';
  import { formSchema } from './data';
  import { ElMessage, ElTreeSelect } from 'element-plus';
  import { useRouter, useRoute } from 'vue-router';
  import { IForm, useForm } from '@/components/IForm';
  import { usePageRootPath } from '@/hooks/usePageRootPath';
  const router = useRouter();
  const route = useRoute();
  const { rootPath } = usePageRootPath();
  const isUpdate = route.path === rootPath.value + '/update';
  const { id } = route.query;
  if (isUpdate && !id) router.push(rootPath.value + '/index');
  id && getDetail(id);

  const [registerForm, { setValues }]: any = useForm({
    componentProps: {
      labelWidth: 100,
      labelSuffix: ':',
    },
    schema: formSchema,
  });
  const treeData = ref<any[]>([]);
  async function getDetail(id: any) {
    const result: any = await detail(id);

    const menuData = await menuTree(result.menuId);
    treeData.value = menuData as any;
    setValues(result);
  }

  async function onSubmit(form: any) {
    try {
      const res: any = form.id ? await update(form) : await create(form);
      ElMessage.success(res.msg);
      router.push(rootPath.value);
    } catch (error) {
      console.log(error);
    }
  }
</script>
