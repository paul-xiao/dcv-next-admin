<template>
  <template v-if="children && children.length">
    <el-sub-menu :index="menu.path">
      <template #title>
        <SvgIcon :icon="menu.meta.icon"></SvgIcon>

        <span class="ml-1">{{ menu.meta.title }}</span></template
      >

      <SubMenu v-for="item of children" :menu="item" />
    </el-sub-menu>
  </template>
  <template v-else>
    <el-menu-item :index="menu.path" v-if="!menu.meta.isExternal">
      <SvgIcon :icon="menu.meta.icon"></SvgIcon>

      <template #title>
        <span class="ml-1">{{ menu.meta.title }}</span>
      </template>
    </el-menu-item>
    <el-menu-item @click="onExternalClick" v-else>
      <SvgIcon :icon="menu.meta.icon"></SvgIcon>
      <template #title>
        <span class="ml-1">{{ menu.meta.title }}</span></template
      >
    </el-menu-item>
  </template>
</template>
<script lang="ts">
  import { SvgIcon } from '@/components/Icon';
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
