<template>
  <IForm @register="registerForm" @submit="onSubmit"> </IForm>
</template>
<script lang="ts" setup>
  import { create, update, getGalleryById } from '@/api/gallery';
  import { schema } from './data';
  import { ElMessage } from 'element-plus';
  import { useRouter } from 'vue-router';
  import { IForm, useForm } from '@/components/IForm';
  import { onMounted } from 'vue';
  const router = useRouter();

  onMounted(() => {
    const { id } = history.state;
    id && getDetail(id);
  });

  const [registerForm, { setValues }]: any = useForm({
    schema,
  });

  async function getDetail(id: number) {
    const res: any = await getGalleryById(id);
    const result = res.data;
    console.log(result);

    setValues(result);
  }

  async function onSubmit(form: any) {
    try {
      const res: any = form.id ? await update(form) : await create(form);
      ElMessage.success(res.msg);
      router.push('/gallery');
    } catch (error) {
      console.log(error);
    }
  }
</script>
