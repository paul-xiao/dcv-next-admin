<template>
  <IForm @register="registerForm" @submit="onSubmit"> </IForm>
</template>
<script lang="ts" setup>
  import { create, update, detail } from '@/api/user';
  import { formSchema } from './data';
  import { ElMessage } from 'element-plus';
  import { useRouter } from 'vue-router';
  import { IForm, useForm } from '@/components/IForm';
  const router = useRouter();
  const route = useRoute();

  const isUpdate = route.path === '/system/user/update';
  const { id } = route.query;
  if (isUpdate && !id) router.push('/system/user/index');
  id && getDetail(id);

  const [registerForm, { setValues }]: any = useForm({
    componentProps: {
      labelWidth: 100,
      labelSuffix: ':',
    },
    schema: formSchema,
  });

  async function getDetail(id: any) {
    const result: any = await detail(id);
    setValues(result);
  }

  async function onSubmit(form: any) {
    try {
      const res: any = form.id ? await update(form) : await create(form);
      ElMessage.success(res.msg);
      router.push('/system/user');
    } catch (error) {
      console.log(error);
    }
  }
</script>
