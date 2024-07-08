<template>
  <template v-if="children && children.length">
    <el-sub-menu :key="menu.path" :index="menu.path">
      <template #title>
        <SvgIcon :icon="menu.meta.icon"></SvgIcon>

        <span class="ml-1">{{ menu.meta.title }}</span></template
      >

      <SubMenu v-for="item of children" :menu="item" />
    </el-sub-menu>
  </template>
  <template v-else>
    <el-menu-item v-if="!menu.meta.isExternal" :key="menu.path" :index="menu.path">
      <SvgIcon :icon="menu.meta.icon"></SvgIcon>

      <template #title>
        <span class="ml-1">{{ menu.meta.title }}</span>
      </template>
    </el-menu-item>
    <el-menu-item v-else @click="onExternalClick">
      <SvgIcon :icon="menu.meta.icon"></SvgIcon>
      <template #title>
        <span class="ml-1">{{ menu.meta.title }}</span></template
      >
    </el-menu-item>
  </template>
</template>
<script lang="ts">
  import { SvgIcon } from '@/components/IIcon';
  import { ref } from 'vue';
  export default {
    name: 'SubMenu',
    components: { SvgIcon },
    props: {
      menu: {
        type: Object,
        default: () => {},
      },
    },
    setup(props) {
      const children = ref([]);
      children.value = props.menu?.children?.filter(m => !m.meta.hidden);
      function onExternalClick() {
        window.open(`${props.menu.meta.protocol}:/${props.menu.path}`);
      }
      return {
        children,
        onExternalClick,
      };
    },
  };
</script>
@/components/IIcon
