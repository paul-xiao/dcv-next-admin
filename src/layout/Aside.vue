<template>
  <div class="aside">
    <el-menu :default-active="defaultActive" class="aside-menu" unique-opened router :collapse="isCollapse"
      @open="handleOpen" @close="handleClose" @select="onMenuSelected">
      <template v-for="item of menus">
        <SubMenu :menu="item" />
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import SubMenu from './src/SubMenu';
import { useRoute } from 'vue-router'
import { useMenuStore } from '@/stores/modules/menu';
const route = useRoute()
const props = withDefaults(
  defineProps<{
    isCollapse: boolean;
  }>(),
  { isCollapse: false },
);
const defaultActive = ref('')
defaultActive.value = route.path.includes('/index') ? route.path.replace('/index', '') : route.path
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const onMenuSelected = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const menus: Ref<any[]> = ref([]);

const menuStore = useMenuStore()
menus.value = (menuStore.menuData);

</script>
@/styles/stores/modules/menu