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
        <div class="header-main-right-item">
          <a herf="" target="blank"><SvgIcon icon="help"></SvgIcon></a>
        </div>
        <div class="header-main-right-item">
          <ElBadge :value="12">
            <SvgIcon icon="notification"></SvgIcon>
          </ElBadge>
        </div>
        <div class="header-main-right-item flex items-center">
          <el-dropdown>
            <span class="el-dropdown-link" style="outline: none">
              <el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="userStore.logout()">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import Logo from './src/Logo';
  import Breadcrumb from './src/Breadcrumb';
  import { SvgIcon } from '@/components/IIcon';
  import { Expand, Fold } from '@element-plus/icons-vue';
  import { getGlobalConfig } from '@/hooks/useGlobalConfig';
  import { useUserStore } from '@/stores/modules/user';
  const userStore = useUserStore();
  const title = getGlobalConfig('title');
  const isCollapse = ref(false);

  const emit = defineEmits(['update:isCollapse']);
  function onAsideToggle() {
    isCollapse.value = !isCollapse.value;
    emit('update:isCollapse', isCollapse.value);
  }
</script>
