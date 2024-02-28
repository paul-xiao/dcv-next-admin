<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item v-for="item of matchedRoute" :to="{ path: item.path }">{{
      item.meta.title
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang="ts">
  import { Ref, ref, watch } from 'vue';
  import { RouteLocationMatched, useRoute, useRouter } from 'vue-router';

  const matchedRoute: Ref<RouteLocationMatched[]> = ref([]);
  const router = useRouter();
  const route = useRoute();
  matchedRoute.value = route.matched?.filter(m => !m.meta.hidden);

  watch(
    () => router.currentRoute.value,
    () => {
      matchedRoute.value = route.matched?.filter(m => !m.meta.hidden);
    },
  );
</script>
