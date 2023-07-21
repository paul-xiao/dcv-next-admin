<template>
  <div class="logo" :class="{collapsed: props.isCollapse}">
    <img class="logo-img" :src="props.icon" alt="logo">
    <h1 class="logo-title" v-if="!props.isCollapse">{{ props.title }}</h1>
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
