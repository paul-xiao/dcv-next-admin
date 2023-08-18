<template>
  <div class="login-wrap">
    <!-- <video autoplay muted loop>
      <source src="@/assets/video/login-bg.mp4" type="video/mp4" />
    </video> -->

    <div class="login-panel">
      <div class="login-panel-head">
        <div class="logo">
          <img class="logo-img" src="/favicon.ico" alt="logo" />
          <h1 class="logo-title">{{ title }}</h1>
        </div>
      </div>
      <div class="login-panel-main">
        <div class="login-form">
          <h1 class="py-5 text-2xl text-center">用户登录</h1>
          <IForm ref="IFormRef" @register="registerForm" modelSize="large">
            <template #verifyCode="{ row, model }">
              <ElRow class="w-full" :gutter="5">
                <ElCol :span="20">
                  <ElInput v-model="model.verifyCode" :placeholder="row.componentProps.placeholder" />
                </ElCol>
                <ElCol :span="4">
                  <img style="height: 40px" class="w-full" :src="captchaImg" @click="onCaptchaImgRefresh" />
                </ElCol>
              </ElRow>
            </template>
            <template #footer>
              <ElButton :loading="loading" type="primary" style="width: 100%" @click="onLogin">登录</ElButton>
            </template>
          </IForm>
        </div>
      </div>

      <div class="login-panel-foot text-gray-400"> &copy;2023 算网 </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ElInput, ElRow, ElCol } from 'element-plus';
  import { useForm, IForm } from '@/components/Form';
  import { loginSchema } from './login';
  import { login } from '@/api/user';
  import { getGlobalConfig } from '@/hooks/useGlobalConfig';
  import { encrypt } from '@/utils/cipher';
  import { useUserStore } from '@/stores/modules/user';
  const userStore = useUserStore();
  const IFormRef = ref<any>(null);
  const loading = ref(false);
  const captchaImg = ref<string>('');
  const title = getGlobalConfig('title');
  const [registerForm, { validate }]: any = useForm({
    schema: loginSchema,
  });
  function onCaptchaImgRefresh() {
    captchaImg.value = `/api/system/login/verifyCode?timestamp=${Date.now()}`;
  }
  async function onLogin() {
    try {
      loading.value = true;
      const values = await validate();
      const res = await login({ ...values, passWord: encrypt(values.passWord) });
      if (res) {
        loading.value = false;
        userStore.login(res)
      }
    } finally {
      onCaptchaImgRefresh();
      loading.value = false;
    }
  }
  onCaptchaImgRefresh();
</script>
<style lang="scss" scoped>
  .login-wrap {
    // position: fixed;
    // top: 0;
    // left: 0;
    width: 100%;
    height: 100vh;
    // z-index: -1;
    overflow: hidden;
  }

  .login-wrap video {
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
  }
  .login-panel {
    width: 100%;
    height: 100%;
    background: #fafafa;
    // position: absolute;
    // right: 0;
    // top: 0;
    // z-index: 10;
    display: flex;
    flex-direction: column;
    &-head {
      display: flex;
      padding: 15px;
      background: #fff;
      box-shadow: 0 2px 8px rgba(51, 51, 51, 0.08);
      .logo {
        display: flex;
        align-items: center;
        padding: 0 12px;
        min-width: 63px;

        .logo-title {
          font-weight: 700;
          margin-left: 5px;
        }
      }
    }
    &-main {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &-foot {
      text-align: center;
      background: #fff;
      padding: 15px;
    }
  }
  .login-form {
    width: 600px;
    min-height: 400px;
    border: 1px solid #f2f2f2;
    background: #fff;
    padding: 30px;
    border-radius: 5px;
  }
</style>
