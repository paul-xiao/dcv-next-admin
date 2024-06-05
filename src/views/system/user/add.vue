<template>
  <div>
    <dc-form @register="registerForm" @submit="onSubmit">
      <template #content="{ model }">
        <dc-editor v-model="model.content" />
      </template>
    </dc-form>
  </div>
</template>
<script lang="ts" setup>
import { create, update, detail } from '@/api/project'
import { formSchema } from './data'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useForm } from '@/components/IForm'
import { onMounted, ref, watch } from 'vue'
const router = useRouter()

onMounted(() => {
  const { id } = history.state
  id && getDetail(id)
})

const [registerForm, { setValues }]: any = useForm({
  labelWidth: 100,
  foot: true,
  schema: formSchema
})

async function getDetail(id: number) {
  const res: any = await detail(id)
  const result = res.data
  console.log(result)

  setValues(result)
}

async function onSubmit(form: any) {
  try {
    const res: any = form.id ? await update(form) : await create(form)
    ElMessage.success(res.msg)
    router.push('/project')
  } catch (error) {
    console.log(error)
  }
}
</script>
