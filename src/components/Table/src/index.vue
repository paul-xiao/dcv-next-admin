<template>
  <div :class="`${ns}-table`">
    <!-- 搜索栏 -->
    <div :class="`${ns}-table-search`"></div>
    <!-- 表格 -->
    <div :class="`${ns}-table-head`">
      <div class="title">
        {{ state.conf.title }}
      </div>
      <div class="opt">
        <ElButton v-if="state.conf?.addBtn" type="primary" @click="handleAdd">添加</ElButton>
        <ElButton v-if="state.conf?.batchDel" type="danger" @click="handleBatchDelete">删除</ElButton>
        <slot name="batch" :selections="state.multipleSelection"></slot>
      </div>
      <div>
        <i class="cursor-pointer el-icon el-icon-refresh" @click="onRefeshTable"></i>
      </div>
    </div>
    <div :class="`${ns}-table-main`">
      <ElTable
        :data="state.data"
        :stripe="state.conf?.stripe"
        :border="state.conf?.border"
        :height="state.conf?.height"
        row-key="id"
        :size="state.conf?.size"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        style="width: 100%"
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
        </ElTableColumn>
        <ElTableColumn :fixed="state.conf?.fixed" label="操作" :min-width="state.conf?.optWidth">
          <template #default="{ row }">
            <ElButton v-if="state.conf?.viewBtn" type="primary" text size="small" @click="handleView"> 查看 </ElButton>
            <ElButton v-if="state.conf?.editBtn" type="success" text size="small" @click="handleEdit()">
              编辑
            </ElButton>
            <ElButton v-if="state.conf?.delBtn" type="danger" text size="small" @click="handleDelete(row)">
              删除
            </ElButton>
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
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%">
      <IForm ref="dialogFormRef" v-model="form" :schema="state.schema" :foot="false">
        <!-- form插槽转移到table -->
        <template v-for="col of state.schema" :key="col.prop" #[col.prop]>
          <slot :name="`${col.prop}Form`"></slot>
        </template>
      </IForm>
      <template #footer>
        <span class="dialog-footer">
          <ElButton @click="handleCancel">取消</ElButton>
          <ElButton type="primary" @click="handleSubmit(dialogFormRef)">确认</ElButton>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, onMounted, watchEffect } from 'vue';
  import { ElButton, ElTable, ElTableColumn, ElPagination } from 'element-plus';
  import IForm from '../../Form';
  import tableProps from './table';
  import { IPageProps, ITableColumn, ITableConf } from './types';
  import { getGlobalConfig } from '@/hooks/useGlobalConfig';
  const ns = getGlobalConfig('namespace');
  const dialogFormRef = ref(null);
  const _props = defineProps(tableProps);
  const emit = defineEmits([
    'register',
    'update:modelValue',
    'load',
    'row-add',
    'row-update',
    'row-del',
    'batch-del',
    'size-change',
    'current-change',
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

  const state = reactive({
    data: [],
    multipleSelection: [],
    flag: 'add',
    conf: {
      addBtn: true,
      viewBtn: true,
      delBtn: true,
      editBtn: true,
      border: true,
    } as ITableConf,
    schema: [] as ITableColumn[],
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

  function handleCancel() {
    dialogVisible.value = false;
  }

  function handleView() {
    dialogVisible.value = true;
    state.flag = 'view';
  }
  function handleEdit() {
    dialogVisible.value = true;
    state.flag = 'edit';
  }
  function handleDelete(row: any) {
    emit('row-del', row);
  }

  function handleBatchDelete() {
    emit('batch-del', state.multipleSelection);
  }
  function handleSelectionChange(val: any) {
    state.multipleSelection = val;
  }
  function onRefeshTable() {
    onLoad();
  }
  function handleSizeChange(val: any) {
    state.page.pageSize = val;
    const { pageNum, pageSize } = state.page;
    onLoad({ pageNum, pageSize });
  }
  function handleCurrentChange(val: any) {
    state.page.pageNum = val;
    const { pageNum, pageSize } = state.page;
    onLoad({ pageNum, pageSize });
  }

  function setProps(props) {
    console.group('Set Props:');
    const { conf, api, schema, page } = props;
    state.conf = { ...state.conf, ...conf };
    state.api = api;
    state.schema = schema;
    state.page = { ...state.page, ...page };
    console.groupEnd();
  }
  async function onLoad(params = {}) {
    const res: any = await state.api({ search: { ...params }, page: { ...state.page } });
    state.data = res?.result;
    state.page.total = res?.total;
    console.log(res);
    
  }

  watchEffect(() => {
    onLoad();
  });

  const tableAction = {
    setProps,
    onLoad,
  };

  onMounted(() => {
    emit('register', tableAction);
  });
</script>
