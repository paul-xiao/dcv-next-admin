<template>
  <div :class="`${ns}-layout`">
    <Header v-model:isCollapse="isCollapse" />
    <main class="main" :class="{colllapsed: isCollapse}">
      <Aside :isCollapse="isCollapse" />
      <div class="content">
        <RouterView />
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
  import Aside from './Aside.vue';
  import Header from './Header.vue';
  import { getGlobalConfig } from '@/hooks/useGlobalConfig';
  const ns = getGlobalConfig('namespace');
  const isCollapse = ref(false);

  watch(isCollapse, val => {
    console.log(val);
  });
</script>
