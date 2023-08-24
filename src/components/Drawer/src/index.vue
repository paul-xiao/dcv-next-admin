<template>
  <ElDrawer
    ref="IDrawerRef"
    v-model="state.visable"
    :title="state.title"
    :with-header="state.header"
    :size="state.size"
  >
    <slot />
    <template #footer>
      <div style="flex: auto">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">确认</el-button>
      </div>
    </template>
  </ElDrawer>
</template>
<script setup lang="ts">
  import { onMounted, reactive, ref, unref } from 'vue';
  const visable = ref(false);
  const IDrawerRef = ref();
  interface DrawerProps {
    visable?: boolean;
    title?: string;
    header?: boolean;
    size?: string;
    loading?: boolean;
  }
  const _props = withDefaults(defineProps<DrawerProps>(), { visable: false, header: true, title: '', size: '35%' });
  const state = reactive({
    title: '',
    visable: false,
    header: true,
    size: '',
  });

  setProps(_props);
  const emit = defineEmits(['register', 'confirm']);

  // set prop from useDrawer hook
  function setProps(props) {
    Object.entries(props).forEach(([key, val]) => {
      state[key] = val;
    });
  }
  function open() {
    state.visable = true;
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
    close
  })
</script>
