<template>
  <IForm @register="registerForm" @submit="onSubmit">
    <template #icon="{ model }">
      <IconPicker v-model="model.icon" />
    </template>
  </IForm>
</template>
<script lang="ts" setup>
  import { create, update, detail } from '@/api/menu';
  import { schema } from './data';
  import { ElMessage } from 'element-plus';
  import { useRouter, useRoute } from 'vue-router';
  import { IForm, useForm } from '@/components/IForm';
  import { IconPicker } from '@/components/IIcon';
  const router = useRouter();
  const route = useRoute();
  const rootPath = route.matched[1].path;
  const isUpdate = route.path === rootPath + '/update';
  const { id } = route.query;
  if (isUpdate && !id) router.push(rootPath + '/index');
  id && getDetail(id);

  const [registerForm, { setValues }]: any = useForm({
    componentProps: {
      labelWidth: 100,
      labelSuffix: ':',
    },
    schema: schema,
  });

  async function getDetail(id: any) {
    const result: any = await detail(id);
    setValues(result);
  }

  async function onSubmit(form: any) {
    try {
      const res: any = form.id ? await update(form) : await create(form);
      ElMessage.success(res.msg);
      router.push(rootPath);
    } catch (error) {
      console.log(error);
    }
  }
</script>
