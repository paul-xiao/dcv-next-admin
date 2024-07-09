<template>
  <ElFormItem :label="label" :label-width="labelWidth" :rules="rules" :prop="prop">
    <template v-if="!!$slots[prop]">
      <slot :name="prop"></slot>
    </template>
    <component
      :is="getComponent(type)"
      v-else
      v-model="myValue"
      v-bind="componentProps"
      @change="onChange"
    />
  </ElFormItem>
</template>
<script lang="ts">
  // 动态组件处理方式有两种： component 或者 jsx
  import { defineComponent } from 'vue';
  import { ElFormItem, ElInput } from 'element-plus';
  import ISelect from './IFormSelect.vue';
  import IUpload from './IFormUpload.vue';
  import { computed } from 'vue';
  export default defineComponent({
    components: { ElFormItem, ElInput, ISelect, IUpload },
    props: {
      model: [String,Object],
      label: { type: String, default: '' },
      labelWidth: { type: [String, Number], default: '' },
      prop: { type: String, default: '' },
      type: String,
      rules: { type: Array, default: null } as any,
      componentProps: { type: Object, default: () => {} },
      modelValue: [String, Array, Number],
    },
    emits: ['update:modelValue', 'change'],
    setup(_props, { emit }) {
      const myValue = computed({
        get: () => {
          return _props.modelValue;
        },
        set: val => {
          emit('update:modelValue', val);
        },
      });
      /**
       * @description 首字母大写
       * @author paul.xiao
       * @date 2024-06-26 13:50:51
       * @param {*}
       * @return {*}
       */
      function capitalize(str) {
        return str && str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
      }
      /**
       * @description 监听表单变化
       * @author paul.xiao
       * @date 2024-06-26 14:02:18
       * @param {*}
       * @return {*}
       */
      function onChange(val) {
        emit('change', val);
      }
      /**
       * @description 获取组件
       * @author paul.xiao
       * @date 2024-06-26 14:02:40
       * @param {*}
       * @return {*}
       */
      const getComponent = (type = 'input') => {
        const isInput = ['password', 'input'].includes(type);
        switch (type) {
          case 'select':
            return 'ISelect';
          case 'upload':
            return 'IUpload';
          default:
            return `El${capitalize(isInput ? 'input' : type)}`;
        }
      };
      return {
        getComponent,
        onChange,
        myValue,
      };
    },
  });
</script>
