<template>
  <div class="catalog">
    <div class="catalog-top">
      <div class="flex items-center border">
        <div class="catalog-search-icon">
          <SvgIcon icon="search" />
        </div>
        <div class="flex-1">
          <input type="text" class="outline-none" v-model="searchText" @focus="onSearchStart" placeholder="搜索" />
        </div>
        <div class="font-light text-xs text-gray-400 mr-2">
          <small>Ctrl + K</small>
        </div>
      </div>
      <el-dropdown class="outline-none ml-2">
        <el-button circle :icon="Plus"></el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="onNewGroupCreate(true)">新增文章</el-dropdown-item>
            <el-dropdown-item @click="onNewGroupCreate()">新增分组</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="catalog-main">
      <div class="catalog-main-top-input" v-if="newItem">
        <input type="text" v-model="asideText" @blur="onAsideTextBlur" />
      </div>
      <ul>
        <IAsideListItem
          v-for="item of catalogs"
          :item="item"
          :activeId="activeId"
          @catalog-item-del="onCatalogDel"
          @catalog-item-add="onCatalogAdd"
          @catalog-item-click="onCatalogItemClick"
        />
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { SvgIcon } from '@/components/IIcon';
  import { onMounted, onUnmounted, ref } from 'vue';
  import axios from 'axios';
  import IAsideListItem from './IAsideListItem.vue';
  import { Plus } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus'
  const active = ref(false);
  const activeId = ref('');
  const newItem = ref(false);
  const newItemFlag = ref(false);
  const pid = ref(0);
  const searchText = ref('');
  const asideText = ref('');
  const catalogs: any = ref([]);

  const emits = defineEmits(['CatalogItemClick', 'SearchStart']);
  function getCatalog(): void {
    axios.get('/api/catalog/list').then(res => {
      catalogs.value = res.data.result;
      console.log('refreshed');
    });
  }
  function createCatalog(data: { name: string; pid: number; type: number }) {
    return axios.post('/api/catalog', data);
  }

  function onNewGroupCreate(flag: boolean = false) {
    newItem.value = true;
    newItemFlag.value = flag;
    asideText.value = flag ? '新文章' : '新分组';
  }
  async function onAsideTextBlur() {
    newItem.value = false;
    // call catalog create
    await createCatalog({ name: asideText.value, pid: pid.value || 0, type: newItemFlag.value ? 1 : 0 });
    // call list refresh
    getCatalog();
  }

  function onCatalogItemClick(item: { articleId: any }) {
    emits('CatalogItemClick', item);
  }
  function onCatalogDel(item: { id: any }) {
    const isConfirm = confirm('确定删除？');

    isConfirm &&
      axios
        .delete(`/api/catalog/${item.id}`)
        .then(() => {
          getCatalog();
        })
        .catch(err => console.log(err));
  }

  function onCatalogAdd(item: { id: number, articleId: number }) {
    if(item.articleId) {
      ElMessage.warning('请在目录下创建')
      return
    }
    newItem.value = true;
    newItemFlag.value = true;
    asideText.value = '新文章';
    pid.value = item.id;
  }

  function onGlobalHover() {
    active.value = true;
    pid.value = 0;
  }
  function onAddDone() {
    active.value = false;
  }

  function setActive(articleId: any) {
    const traverse = (arr: any[], id: any) => {
      let hasChildActive = false;
      arr.forEach((n: { children: any[]; $active: boolean; articleId: any }) => {
        if (n.children && n.children.length > 0) {
          hasChildActive = traverse(n.children, id) || hasChildActive;
          n.$active = n.children.some((c: { articleId: any; $active: any }) => c.articleId == id || c.$active);
        } else {
          n.$active = n.articleId == id;
        }
        hasChildActive = hasChildActive || n.$active;
      });
      return hasChildActive;
    };

    traverse(catalogs.value, articleId);

    onCatalogItemClick({ articleId });

    activeId.value = String(articleId);
  }
  function onSearchStart() {
    emits('SearchStart');
  }

  function onSearchKeyup(event: { ctrlKey: any; key: string }) {
    if (event.ctrlKey && event.key === 'k') {
      onSearchStart();
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', onSearchKeyup);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', onSearchKeyup);
  });

  getCatalog();

  defineExpose({
    getCatalog,
    setActive,
  });
</script>
<style lang="scss">
  .catalog {
    width: 350px;
    margin-right: 15px;
    padding: 15px;
    &-top {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      .catalog-search {
        flex: 1;
        display: flex;
        border: 1px solid #333;
        border-radius: 5px;
        margin-right: 10px;

        &-icon {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          svg {
            color: #777;
            width: 20px;
            height: 20px;
          }
        }
        &-cmd-icon {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          svg {
            color: #777;
            width: 20px;
            height: 20px;
          }
        }
        &-input {
          input {
            height: 30px;
            border: none;
            outline: none;
          }
        }
      }
      &-add {
        position: relative;
        z-index: 999;
        &.active {
          .catalog-top-add-dropdown {
            display: block;
          }
        }
        &-dropdown {
          position: absolute;
          background-color: #fff;
          top: 50px;
          border: 1px solid;
          border-radius: 5px;
          display: none;
          .dropdown-item {
            padding: 10px 15px;
            width: 5em;
            &:hover {
              background-color: #f2f2f2;
              cursor: pointer;
            }
          }
        }
      }
    }
    &-main {
      font-size: 14px;
      height: calc(100% - 50px);
      overflow-y: auto;
      color: #333;

      &-top-input {
        width: 100%;
        display: flex;
        input {
          padding: 6px 12px;
          border: 1px dashed #333;
          line-height: 25px;
          flex: 1;
          border-radius: 5px;
        }
        margin-bottom: 10px;
      }
      &-item {
        &.is-article {
          padding-left: 20px;
          cursor: pointer;
          &.active {
            background: aliceblue;
          }
        }
        &-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 0;
          &:hover {
            background-color: #f2f2f2;
          }
        }
        &-children {
          padding-left: 15px !important;
        }
      }
    }
  }
</style>
