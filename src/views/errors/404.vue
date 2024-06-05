<template>
  <div class="flex items-center justify-center h-screen">
    <div>
      <h1>404</h1>
      <div>
        <router-link to="/"> <ElButton>返回首页</ElButton> </router-link>
        <ElButton @click="onLogout">退出登录</ElButton>
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
