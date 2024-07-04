<template>
  <IForm @register="registerForm"></IForm>
</template>
<script lang="ts" setup>
  import { updatePwd } from '@/api/user';
  import { changgePwdFormSchema } from './data';
  import { IForm, useForm } from '@/components/IForm';
  const [registerForm, { validate }]: any = useForm({
    componentProps: {
      labelWidth: 100,
      labelSuffix: ':',
    },
    footer: false,
    schema: changgePwdFormSchema,
  });
  async function submit(row) {
    try {
      const form = await validate();
      return await updatePwd({ ...form, userId: row?.id });
    } catch (error) {
      return Promise.reject(error);
    }
  }
  defineExpose({
    submit,
  });
</script>
