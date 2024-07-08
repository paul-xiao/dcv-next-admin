<template>
  <ElSelect v-model="model" v-bind="$attrs" class="w-full">
    <ElOption v-for="item in myOptions" :key="item.value" :label="item.label" :value="item.value" />
  </ElSelect>
</template>
<script lang="ts" setup>
  import { ref, onMounted, computed } from 'vue';
  import { ElSelect, ElOption } from 'element-plus';
  import { SelectOption } from '../types';

  interface SelectProps {
    form: object;
    api?: (params?) => void;
    apiParams?: object;
    options?: SelectOption[];
    modelValue?: number | string | string[];
    props?: SelectOption;
  }
  const myOptions = ref<SelectOption[] | Record<string, any>>([]);
  const _props = defineProps<SelectProps>();
  const emit = defineEmits(['update:modelValue']);
  // set default
  myOptions.value = _props.options || [];

  const model = computed({
    get: () => _props.modelValue,
    set: val => emit('update:modelValue', val),
  });

  // 监听form变化
  watch(
    () => _props.form,
    value => {
      let obj = {};
      // 如果存在apiParams, 触发级联
      if (_props.apiParams && Object.keys(_props.apiParams).length) {
        Object.entries(_props.apiParams).forEach(([key, val]: any) => {
          obj[key] = value[val];
        });
        if (typeof _props.api === 'function') {
          loadDataFromApi(_props.api, obj);
        }
      }
    },
    {
      deep: true,
    },
  );
  function getMatched(data, filter: SelectOption) {
    if (!filter) return data;
    return data.reduce((res, cur) => {
      const result = {};
      Object.keys(filter).forEach(f => {
        const filterKey = filter[f];
        if (f === 'children') {
          result[f] = getMatched(cur[filterKey], filter);
        } else {
          result[f] = cur[filterKey];
        }
      });
      res.push(result);
      return res;
    }, []);
  }

  async function loadDataFromApi(api: (params?) => void, param?: object) {
    const data = await api(param);
    myOptions.value = getMatched(data, _props.props || { label: 'label', value: 'value' });
  }
  onMounted(() => {
    if (typeof _props.api === 'function') {
      loadDataFromApi(_props.api);
    }
  });
</script>
