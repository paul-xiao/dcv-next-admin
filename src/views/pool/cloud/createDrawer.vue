<template>
  <Drawer ref="DrawerRef" @confirm="onConfirm" :loading="loading">
    <IForm @register="registerForm" :foot="false"></IForm>
  </Drawer>
</template>
<script setup lang="ts">
  import { Drawer } from '@/components/IDrawer';
  import { IForm, useForm } from '@/components/IForm';
  import { FormSchema } from './cloud';
  import { useMessage } from '@/hooks/useMessage';
  const loading = ref(false);
  const DrawerRef = ref();
  const { notify } = useMessage();
  const [registerForm, { validate }] = useForm({
    schema: FormSchema,
  });
  async function onConfirm() {
    loading.value = true;
    const values = await validate();
    setTimeout(() => {
      console.log(values);
      notify.success('成功');
      loading.value = false;
      DrawerRef.value.close()
    }, 1000);
  }
</script>