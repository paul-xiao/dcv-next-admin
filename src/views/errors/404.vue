<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
      <img src="@/assets/images/404.png" width="500" />
      <div>
        <RouterLink to="/"> <ElButton type="primary">返回首页</ElButton> </RouterLink>
        <ElButton class="ml-2" @click="onLogout">退出登录</ElButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useUserStore } from '@/stores/modules/user';
  const userStore = useUserStore();

  function onLogout() {
    userStore.logout();
  }
</script>
