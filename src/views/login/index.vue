<template>
  <div class="flex h-screen">
    <div ref="bgRef" class="flex flex-col items-center justify-center flex-1 p-5 bg">
      <div class="absolute text-lg top-5 left-5">Dcv Admin</div>
      <div class="text-3xl">Welcome to Dcv Admin</div>
      <div class="text-xl font-normal leading-10 text-gray-600 text-md">A very impressive management system</div>
    </div>
    <div class="flex flex-col items-center justify-center w-1/2 p-5 bg-white">
      <div class="px-5 py-10" style="width: 500px">
        <h1 class="py-5 text-2xl text-center">用户登录</h1>
        <DcForm @register="registerForm">
          <template #footer>
            <el-button type="primary" style="width: 100%" @click="onSubmit">登录</el-button>
          </template>
        </DcForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useForm, IForm as DcForm } from '@/components/IForm';
  import { loginSchema } from './login';
  import { useUserStore } from '@/stores/modules/user';

  const userStore = useUserStore();
  const [registerForm, { validate }] = useForm({
    schema: loginSchema,
    componentProps: {
      size: 'large',
    },
  });
  async function onSubmit() {
    const form = await validate();
    userStore.login(form);
  }
</script>
<style lang="scss" scoped>
  html,
  body {
    height: 100%;
    margin: 0;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    background-color: #fff;
  }
  .bg {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: url(@/assets/pexels.jpg);
    background-position: center top;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    clip-path: path('M0,0 L800,0,C1000,500 800,700 800,1200 L0,1200');
  }
</style>
