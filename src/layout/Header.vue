<template>
  <div class="header">
    <Logo :title="title" :is-collapse="isCollapse" icon="/favicon.ico" />
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
        <div class="flex items-center header-main-right-item">
          <el-dropdown>
            <span class="el-dropdown-link" style="outline: none">
              <el-avatar :size="30" :src="`/image/${userInfo.avatar}`" />
            </span>
            <template #dropdown>
              <div class="p-5 text-center w-60">
                <p class="text-sm">{{ userInfo.name }}</p>
                <el-avatar :size="30" :src="`/image/${userInfo.avatar}`" />
                <p>{{ userInfo.email }}</p>
              </div>
              <el-dropdown-menu>
                <el-dropdown-item :icon="Edit">
                  <RouterLink to="/user/profile">编辑资料</RouterLink>
                </el-dropdown-item>
                <el-dropdown-item :icon="Lock">
                  <RouterLink to="/user/update-pwd">修改密码</RouterLink></el-dropdown-item
                >
                <el-dropdown-item :icon="SwitchButton" @click="userStore.logout()">退出登录</el-dropdown-item>
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
  import { Expand, Fold, SwitchButton, Edit, Lock } from '@element-plus/icons-vue';
  import { getGlobalConfig } from '@/hooks/useGlobalConfig';
  import { useUserStore } from '@/stores/modules/user';
  const userStore = useUserStore();
  const title = getGlobalConfig('title');
  const userInfo = userStore.userInfo;
  const isCollapse = ref(false);

  const emit = defineEmits(['update:isCollapse']);
  function onAsideToggle() {
    isCollapse.value = !isCollapse.value;
    emit('update:isCollapse', isCollapse.value);
  }
</script>
