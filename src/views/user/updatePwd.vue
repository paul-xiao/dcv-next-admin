<template>
  <IForm @register="registerForm" @submit="onSubmit"></IForm>
</template>
<script lang="ts" setup>
  import { updateCurrentUserPwd } from '@/api/user';
  import { changgePwdFormSchema } from './data';
  import { IForm, useForm } from '@/components/IForm';
  import { ElMessage } from 'element-plus';
  import { useUserStore } from '@/stores/modules/user';
  const [registerForm, { resetForm }]: any = useForm({
    componentProps: {
      labelWidth: 100,
      labelSuffix: ':',
    },
    schema: changgePwdFormSchema,
  });

  const userStore = useUserStore();

  async function onSubmit(form) {
    try {
      const res = await updateCurrentUserPwd({ ...form });
      res && ElMessage.success('修改成功, 请重新登录！');
      resetForm();
      userStore.logout();
    } catch (error) {
      console.log(error);

      ElMessage.error(error as string);
    }
  }
</script>
