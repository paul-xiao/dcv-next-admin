<template>
  <ElDrawer
    ref="IDrawerRef"
    v-model="state.visable"
    :title="state.title"
    :with-header="state.header"
    :size="state.size"
  >
    <!-- froce slot  rerender -->
    <slot v-if="state.visable" :row="state.row" />
    <template v-if="state.footer" #footer>
      <div style="flex: auto">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" :loading="state.loading" @click="onConfirm">确认</el-button>
      </div>
    </template>
  </ElDrawer>
</template>
<script setup lang="ts">
  import { onMounted, reactive, ref, useSlots } from 'vue';
  const IDrawerRef = ref();
  interface DrawerProps {
    visable?: boolean;
    title?: string;
    header?: boolean;
    size?: string;
    loading?: boolean;
    footer?: boolean;
  }
  const _props = withDefaults(defineProps<DrawerProps>(), {
    visable: false,
    header: true,
    footer: true,
    loading: false,
    title: '',
    size: '35%',
  });
  const state = reactive({
    title: '',
    visable: false,
    loading: false,
    header: true,
    footer: true,
    size: '',
    row: {},
    onSubmit: (params?: any) => {},
  });

  setProps(_props);
  const emit = defineEmits(['register', 'confirm', 'open']);

  // set prop from useDrawer hook
  function setProps(props) {
    Object.entries(props).forEach(([key, val]) => {
      state[key] = val;
    });
  }
  function open(params) {
    state.visable = true;
    state.row = params;
    emit('open', params);
  }

  function close() {
    state.visable = false;
  }
  function onConfirm() {
    state.onSubmit(state.row);
  }
  function setLoading(loading) {
    state.loading = loading;
  }
  /**
   * @description 注册给useDrawerHooks使用的方法
   * @author paul.xiao
   * @date 2024-07-03 17:13:07
   * @param {*}
   * @return {*}
   */
  const registerFoos = {
    setProps,
    open,
    close,
    setLoading,
  };

  onMounted(() => {
    emit('register', registerFoos);
  });
</script>
