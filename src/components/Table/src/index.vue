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
        <SvgIcon icon="refresh" @click="onRefeshTable"></SvgIcon>
        <SvgIcon icon="setting" @click="onRefeshTable"></SvgIcon>
      </div>
    </div>
    <div :class="`${ns}-table-main`" ref="ITableRef">
      <ElTable
        :data="state.data"
        :stripe="state.conf?.stripe"
        :border="state.conf?.border"
        :height="state.conf?.height"
        row-key="id"
        :size="state.conf?.size"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :style="{ height: tableHight }"
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
            <div class="tag" :data-color-tag="getTagColor(row, item)">{{ row[item.prop] }}</div>
          </template>
        </ElTableColumn>
        <ElTableColumn :fixed="state.conf?.fixed" label="操作" :min-width="state.conf?.optWidth">
          <template #default="{ row }">
            <slot name="opt" :row="row"></slot>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
    <div v-if="state?.page?.total" :class="`${ns}-table-pagination`">
      <ElPagination
        :current-page="state?.page?.pageNum"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="state?.page?.pageSize"
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
  import { SvgIcon } from '@/components/Icon';
  import tableProps from './table';
  import { IPageProps, ITableColumn, ITableConf, ITableSearch } from './types';
  import { getGlobalConfig } from '@/hooks/useGlobalConfig';
  import { CloudTypeColor } from './enums/colors';
  import TableSearch from './components/TableSearch.vue';
  const ns = getGlobalConfig('namespace');
  const _props = defineProps(tableProps);
  const emit = defineEmits([
    'register',
    'update:modelValue',
  ]);

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
    conf: {
      addBtn: true,
      viewBtn: true,
      delBtn: true,
      batchDel: true,
      editBtn: true,
      border: true,
    } as ITableConf,
    schema: [] as ITableColumn[],
    search: {} as ITableSearch,
    api: (_params?: any) => {},
    page: {} as IPageProps,
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
    state.page.pageSize = val;
    setTableHeight();
    onLoad();
  }
  function handleCurrentChange(val: any) {
    state.page.pageNum = val;
    onLoad();
  }

  function setProps(props) {
    console.group('Set Props:');
    const { title, conf, api, schema, page, search } = props;
    state.conf = { ...state.conf, ...conf };
    state.title = title;
    state.api = api;
    state.schema = schema;
    state.search = search;
    state.page = { ...state.page, ...page };
    console.groupEnd();
  }
  async function onLoad(params = {}) {
    const res: any = await state.api({ search: { ...params }, page: { ...state.page } });
    state.data = res?.result;
    state.page.total = res?.total;
  }

  function getTagColor(row, item) {
    const type = item.prop.includes('String') ? row[item.prop.replace('String', '')] : row.prop;
    return CloudTypeColor[type];
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
