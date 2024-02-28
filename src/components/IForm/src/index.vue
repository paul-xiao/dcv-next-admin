<template>
  <ElForm
    ref="formRef"
    :rules="rules"
    :model="state.ruleForm"
    :inline="state?.conf?.inline"
    status-icon
    :label-width="state?.conf?.labelWidth"
    :size="modelSize"
  >
    <template v-for="item of schema" :key="item.prop">
      <IFormItem v-model="state.ruleForm[item.prop]" @change="val => handleChange(item, val)" v-bind="item">
        <template v-if="!!$slots[item.prop]" #[item.prop]>
          <!-- row: 当前表单属性, model: 当前表单内容 -->
          <slot :name="item.prop" :row="item" :model="state.ruleForm"></slot>
        </template>
      </IFormItem>
    </template>

    <template v-if="foot">
      <ElFormItem v-if="!$slots.footer">
        <ElButton type="primary" :size="modelSize" @click="submitForm">确认</ElButton>
        <ElButton @click="resetForm()">重置</ElButton>
      </ElFormItem>
      <ElFormItem v-else>
        <slot name="footer"></slot>
      </ElFormItem>
    </template>
  </ElForm>
</template>
<script setup lang="ts">
  import { FormInstance, ElForm, ElFormItem, ElButton } from 'element-plus';
  import IFormItem from './components/FormItem.vue';
  import { computed, onMounted, reactive, ref, unref, watch } from 'vue';
  import { FormItem, FormProps } from './types';
  import { getCurrentInstance } from 'vue';
  interface Props {
    modelValue?: object;
    schema?: FormItem[];
    rules?: object;
    foot?: boolean;
    modelSize?: 'small' | 'default' | 'large';
  }
  const instance = getCurrentInstance();
  const _props = withDefaults(defineProps<Props>(), { foot: true });
  const _emits = defineEmits(['update:modelValue', 'register', 'submit']);
  const formRef = ref<FormInstance>();
  const schema = ref<any[]>([]);
  const state = reactive({
    conf: {} as FormProps,
    ruleForm: {} as any,
  });

  // init schema without useForm hook
  schema.value = _props.schema || [];
  state.ruleForm = state.ruleForm = Object.assign({}, _props.modelValue);

  // watchs
  watch(
    () => _props.modelValue,
    val => {
      state.ruleForm = Object.assign({}, val);
    },
  );
  const _isRequired = computed(() => {
    return function (row: any) {
      return row.rules && row.rules.some((r: any) => r.required);
    };
  });

  const submitForm = async () => {
    if (!formRef.value) return;
    await formRef.value.validate(async valid => {
      if (valid) {
        _emits('submit', { ...unref(state.ruleForm) });
      } else {
        console.warn('valid fail!', state.ruleForm);
      }
    });
  };

  const validate = async (cb: any) => {
    if (formRef.value && (await formRef.value.validate(cb))) {
      return state.ruleForm;
    }
  };

  const resetForm = () => {
    formRef.value?.resetFields();
    state.ruleForm = {};
  };

  function setProps(props) {
    state.conf = { ...props };
  }
  function setDefautValues(values) {
    state.ruleForm = { ...values };
  }
  function setFormItem(key, val) {
    state.ruleForm[key] = val;
    state.ruleForm = { ...state.ruleForm };
  }

  function getSchema(data) {
    schema.value = data;
  }

  function handleChange(item, props) {
    item.change && item.change(formActions, props);
  }

  const formActions = {
    setProps,
    getSchema,
    setDefautValues,
    setFormItem,
    validate,
    resetForm,
  };

  onMounted(() => {
    _emits('register', formActions);
  });
  defineExpose({
    submitForm,
  });
</script>
