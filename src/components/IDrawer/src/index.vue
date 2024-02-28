<template>
  <ElDrawer
    ref="IDrawerRef"
    v-model="state.visable"
    :title="state.title"
    :with-header="state.header"
    :size="state.size"
  >
    <slot />
    <template #footer v-if="state.footer">
      <div style="flex: auto">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">确认</el-button>
      </div>
    </template>
  </ElDrawer>
</template>
<script setup lang="ts">
  import { onMounted, reactive, ref, watch } from 'vue';
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
    title: '',
    size: '35%',
  });
  const state = reactive({
    title: '',
    visable: false,
    header: true,
    footer: true,
    size: '',
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
    emit('open', params);
  }

  function close() {
    state.visable = false;
  }
  function onConfirm() {
    emit('confirm');
  }
  const hook = {
    setProps,
    open,
  };

  onMounted(() => {
    emit('register', hook);
  });

  defineExpose({
    close,
  });
</script>
