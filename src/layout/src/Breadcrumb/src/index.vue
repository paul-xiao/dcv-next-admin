<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item v-for="item of matchedRoute" :to="{ path: item.path }">{{item.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang="ts">
import { Ref, ref } from 'vue';
import { RouteLocationMatched, useRoute } from 'vue-router';

const matchedRoute:Ref<RouteLocationMatched[]> = ref([])
const route = useRoute()
matchedRoute.value = route.matched
</script>
