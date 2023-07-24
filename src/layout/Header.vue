<template>
  <div class="header">
    <Logo :title="title" :isCollapse="isCollapse" icon="/favicon.ico" />
    <div class="header-main">
      <div class="header-main-left">
        <el-icon @click="onAsideToggle"
          ><Expand v-if="isCollapse" />
          <Fold v-else />
        </el-icon>
        <Breadcrumb />
      </div>
      <div class="header-main-right">
        <el-dropdown>
          <span class="el-dropdown-link" style="outline: none;">
            <el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
           
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item disabled>Action 4</el-dropdown-item>
              <el-dropdown-item divided>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import Logo from './src/Logo';
  import Breadcrumb from './src/Breadcrumb';
  import { Expand, Fold } from '@element-plus/icons-vue';
  import { getGlobalConfig } from '@/hooks/useGlobalConfig';

  const title = getGlobalConfig('title');
  const isCollapse = ref(false);

  const emit = defineEmits(['update:isCollapse']);
  function onAsideToggle() {
    isCollapse.value = !isCollapse.value;
    emit('update:isCollapse', isCollapse.value);
  }
</script>