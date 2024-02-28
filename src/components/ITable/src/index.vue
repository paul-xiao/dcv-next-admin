<template>
  <div :class="`${ns}-table`">
    <!-- 搜索栏 -->
    <div :class="`${ns}-table-search`">
      <TableSearch :schema="state.search.schema" v-if="state.search" :search-method="onLoad" />
    </div>
    <!-- 表格 -->
    <div :class="`${ns}-table-head`">
      <div class="title">
        {{ state.title }}
      </div>
      <div class="opt">
        <slot name="batch" :selections="state.multipleSelection"></slot>
      </div>
      <div class="tool mx-2 flex">
        <SvgIcon class="cursor-pointer" icon="refresh" @click="onRefeshTable"></SvgIcon>
        <SvgIcon icon="setting" @click="onRefeshTable"></SvgIcon>
      </div>
    </div>
    <div :class="`${ns}-table-main`" ref="ITableRef">
      <ElTable
        :data="state.data"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        v-bind="$attrs"
        @selection-change="handleSelectionChange"
      >
        <ElTableColumn type="selection" width="55" />
        <ElTableColumn
          v-for="item of state.schema"
          :key="item.id"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template v-if="item.slot" #default="{ row }">
            <slot :name="item.prop" :row="row"></slot>
          </template>
          <template v-else-if="item.isTag" #default="{ row }">
            <div class="tag" :data-tag-color="getTagColor(row, item)">{{ row[item.prop] }}</div>
          </template>
        </ElTableColumn>
        <ElTableColumn :fixed="state.componentProps?.fixed" label="操作" :width="state.componentProps?.optWidth">
          <template #default="{ row }">
            <slot name="opt" :row="row"></slot>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
    <div v-if="state?.page?.total" :class="`${ns}-table-pagination`">
      <ElPagination
        :current-page="state?.page?.current"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="state?.page?.size"
        layout="total, sizes, prev, pager, next"
        :total="state?.page?.total"
        small
        background
        prev-text="上一页"
        next-text="下一页"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, onMounted, watchEffect } from 'vue';
  import { ElTable, ElTableColumn, ElPagination } from 'element-plus';
  import { SvgIcon } from '@/components/IIcon';
  import tableProps from './table';
  import { IPageProps, ITableColumn, ITableConf, ITableSearch } from './types';
  import { getGlobalConfig } from '@/hooks/useGlobalConfig';
  import { CloudTypeColor } from '@/enums/colors';
  import TableSearch from './components/TableSearch.vue';
  const ns = getGlobalConfig('namespace');
  const _props = defineProps(tableProps);
  const emit = defineEmits(['register', 'update:modelValue']);

  const form = computed({
    get() {
      return _props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    },
  });

  const dialogVisible = ref(false);
  const tableHight = ref('');
  const ITableRef = ref<HTMLElement>();

  const state = reactive({
    title: '',
    data: [],
    multipleSelection: [],
    flag: 'add',
    schema: [] as ITableColumn[],
    search: {} as ITableSearch,
    api: (_params?: any) => {},
    page: {} as IPageProps,
    componentProps: {} as IData,
  });

  const dialogTitle = computed(() => {
    const map: any = {
      add: '新增',
      view: '查看',
      edit: '编辑',
    };
    return map[state.flag];
  });

  function handleAdd() {
    emit('update:modelValue', {});
    dialogVisible.value = true;
    state.flag = 'add';
  }
  async function handleSubmit(formRef: any) {
    if (!formRef) return;

    await formRef.validate((valid: any, fields: any) => {
      console.log(valid);

      if (valid) {
        console.log('submit!', form.value);
        dialogVisible.value = false;
      } else {
        console.log('error submit!', fields);
      }
    });
  }
  function handleSelectionChange(val: any) {
    state.multipleSelection = val;
  }
  function onRefeshTable() {
    onLoad();
  }
  function handleSizeChange(val: any) {
    state.page.size = val;
    setTableHeight();
    onLoad();
  }
  function handleCurrentChange(val: any) {
    state.page.current = val;
    onLoad();
  }

  function setProps(props) {
    console.group('Set Props:');
    const { title, componentProps, api, schema, page, search } = props;
    state.componentProps = { ...state.componentProps, ...componentProps };
    state.title = title;
    state.api = api;
    state.schema = schema;
    state.search = search;
    state.page = { ...state.page, ...page };
    console.groupEnd();
  }
  async function onLoad(params = {}) {
    const { current, size } = state.page;

    const res: any = await state.api({ ...params, current, size });
    state.data = res?.total ? res.data : res;
    state.page.total = res?.total;
  }

  function getTagColor(row, item) {
    const type = item.prop.includes('String') ? row[item.prop.replace('String', '')] : row.prop;
    console.log(CloudTypeColor[type]);

    return type ? CloudTypeColor[type] : '#ccc';
  }

  function setTableHeight() {
    tableHight.value = ITableRef.value?.clientHeight + 'px';
  }

  const tableAction = {
    setProps,
    onLoad,
    handleAdd,
  };

  onMounted(() => {
    emit('register', tableAction);
    // init data
    onLoad();
    setTableHeight();
    window.addEventListener('resize', setTableHeight);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', setTableHeight);
  });
</script>
