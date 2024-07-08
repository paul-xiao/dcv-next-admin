<template>
  <IForm @register="registerForm" @submit="onSubmit"> </IForm>
</template>
<script lang="ts" setup>
  import { create, update, getUserInfo } from '@/api/user';
  import { schema } from './data';
  import { ElMessage } from 'element-plus';
  import { IForm, useForm } from '@/components/IForm';

  getDetail();
  const [registerForm, { setValues }]: any = useForm({
    schema,
    componentProps: {
      labelWidth: 80,
      labelPosition: 'right',
    },
  });

  async function getDetail() {
    const res: any = await getUserInfo();
    const result = res;
    console.log(result);

    setValues(result);
  }

  async function onSubmit(form: any) {
    try {
      const res: any = form.id ? await update(form) : await create(form);
      res && ElMessage.success('操作成功！');
    } catch (error) {
      console.log(error);
    }
  }
</script>
