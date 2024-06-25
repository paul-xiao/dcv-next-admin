<template>
  <div class="icon-picker">
    <el-input v-model="model" placeholder="请输入图标名称" class="icon-picker-input">
      <template #prepend>
        <el-icon>
          <SvgIcon :icon="model" />
        </el-icon>
      </template>
      <template #append>
        <el-icon @click="toggleIconList">
          <Edit />
        </el-icon>
      </template>
    </el-input>
    <div class="icon-list" v-show="showIconList">
      <SvgIcon :icon="icon" class="icon" v-for="icon of iconList" @click="onIconSelected(icon)"></SvgIcon>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { SvgIcon } from '@/components/IIcon';
  import { Edit, Delete } from '@element-plus/icons-vue';
  const icons = import.meta.glob('@/assets/icons/*.svg');
  const iconList = Object.keys(icons).map(key => {
    return key.match(/([^\/\\]+)\.svg$/)?.[1];
  });

  const showIconList = ref(false);
  const _props = withDefaults(
    defineProps<{
      modelValue?: string;
    }>(),
    {},
  );

  const emits = defineEmits(['update:modelValue']);

  const model = computed({
    get: () => _props.modelValue,
    set: val => emits('update:modelValue', val),
  });
  function onIconSelected(icon) {
    console.log(icon);

    emits('update:modelValue', icon);
  }

  function toggleIconList() {
    showIconList.value = !showIconList.value;
  }
</script>
<style lang="scss" scoped>
  .icon-picker {
    position: relative;
  }
  .icon-picker-input {
    width: 100%;
  }
  .icon-list {
    position: absolute;
    left: 300px;
    top: 0;
    width: 500px;
    background: #fff;
    border: 1px solid #f2f2f2;
    padding: 10px;
    z-index: 999;
    border-radius: 5px;
    box-shadow: 5px 5px 5px 1px #fafafa;
    .icon{
        margin: 5px;
        &:hover {
            background-color: #ccc;
        }
    }
  }
</style>
