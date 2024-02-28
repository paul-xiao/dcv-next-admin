<template>
  <IForm ref="IFormRef" @register="registerForm">
    <template #footer>
      <ElButton :loading="loading" type="primary" @click="onSearch">搜索</ElButton>
      <ElButton @click="onReset">重置</ElButton>
    </template>
  </IForm>
</template>
<script setup lang="ts">
  import { useForm, IForm } from '@/components/IForm';
  interface SearchProps {
    schema: any;
    searchMethod: Function;
  }
  const props = defineProps<SearchProps>();
  const loading = ref(false);

  const [registerForm, { validate, updateSchema, resetForm }]: any = useForm({
    schema: props.schema,
    componentProps: {
      inline: true,
    }
  });

  watch(
    () => props.schema,
    async val => {
      await updateSchema(val);
    },
  );

  // methods

  async function onSearch() {
    loading.value = true;
    const values = await validate();
    await props.searchMethod(values);
    loading.value = false;
  }
  async function onReset() {
    resetForm();
    await props.searchMethod();
  }
</script>
@/components/IForm