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
        <DcForm @register="registerForm" tabindex="0" @keyup.enter="onSubmit">
          <template #captcha="{ model }">
            <div class="flex w-full">
              <ElInput v-model="model.captcha" placeholder="请输入验证码" class="flex-1 mr-2" />
              <ElButton type="primary" :disabled="locked" :loading="captLoading" plain @click="onGetCaptcha">{{
                countdownText
              }}</ElButton>
            </div>
          </template>
          <template #footer>
            <el-button type="primary" style="width: 100%" @click="onSubmit">登录</el-button>
          </template>
        </DcForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { getCaptcha } from '@/api/user';
  import { useForm, IForm as DcForm } from '@/components/IForm';
  import { loginSchema } from './login';
  import { useUserStore } from '@/stores/modules/user';

  const captLoading = ref(false);
  const countdown = ref(60);
  const countdownText = ref('获取验证码');
  const locked = ref(false);
  const userStore = useUserStore();
  const [registerForm, { validate }] = useForm({
    schema: loginSchema,
    componentProps: {
      size: 'large',
    },
  });

  // 倒计时函数
  function startCountdown() {
    let intervalId = setInterval(() => {
      locked.value = true;
      countdown.value--;

      // 更新倒计时文本
      countdownText.value = `${countdown.value}s后重新获取`;

      // 检查倒计时是否结束
      if (countdown.value <= 0) {
        locked.value = false;
        clearInterval(intervalId); // 清除定时器
        countdownText.value = '重新获取'; // 倒计时结束，更新文本
      }
    }, 1000);

    // 可以考虑在组件卸载时清除interval，避免内存泄漏
    onUnmounted(() => clearInterval(intervalId));
  }
  async function onGetCaptcha() {
    const model = await validate();
    try {
      captLoading.value = true;
      startCountdown();
      await getCaptcha(model.email);
    } finally {
      captLoading.value = false;
    }
  }
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
