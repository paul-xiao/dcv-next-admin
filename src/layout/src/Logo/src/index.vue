<template>
  <div class="logo" :class="{collapsed: isCollapse}">
    <img class="logo-img" :src="icon" alt="logo">
    <h1 class="logo-title" v-if="!isCollapse">{{ title }}</h1>
  </div>
</template>
<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      title: string;
      icon: string;
      isCollapse: boolean;
    }>(),
    { isCollapse: false },
  );
</script>
