<template>
  <li
    class="cursor-pointer catalog-main-item"
    :class="{ 'is-article': item?.articleId, active: item?.pid == activeId }"
    :draggable="true"
    @dragstart="onDragStart(item)"
    @dragover="onDragOver"
    @drop="onDrop(item)"
    @click.stop="onCatalogClick(item)"
  >
    <div class="flex items-center justify-between px-5 hover:bg-gray-200" @click="onToggleChild(item)">
      <div class="flex items-center justify-center">
        <span class="mr-1"
          ><SvgIcon v-if="!item?.articleId" icon="folder"></SvgIcon> <SvgIcon v-else icon="file"></SvgIcon
        ></span>
        <span>
          {{ item?.name }}
        </span>
      </div>
      <div>
        <el-dropdown class="outline-none">
          <span class="outline-none el-dropdown-link"> <SvgIcon icon="more"></SvgIcon> </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-if="!item?.articleId" @click="onGroupAdd(item)"> 新增分组 </el-dropdown-item>
              <el-dropdown-item v-if="!item?.articleId" @click="onArticleAdd(item)"> 新增文章 </el-dropdown-item>
              <el-dropdown-item v-if="!item?.articleId" @click="onRename(item)"> 重命名 </el-dropdown-item>
              <el-dropdown-item>
                <el-popconfirm title="Are you sure to delete this?" @confirm="onCatalogDel(item)">
                  <template #reference> 删除 </template>
                </el-popconfirm>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <ul v-show="item?.$active" class="catalog-main-item-children">
      <IAsideListItem
        v-for="child of item?.children"
        :key="child.id"
        :item="child"
        :active-id="activeId"
        @catalog-item-del="onCatalogDel"
        @add-group="onGroupAdd"
        @add-article="onArticleAdd"
        @catalog-item-click="onCatalogClick"
      />
    </ul>
  </li>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import SvgIcon from '@/components/IIcon/src/SvgIcon.vue';
  import type { PropType } from 'vue';
  interface CatalogItem {
    id: number;
    name: string;
    pid?: string | number;
    children: CatalogItem[];
    articleId?: boolean;
    $active?: boolean;
  }
  export default defineComponent({
    name: 'IAsideListItem',
    components: { SvgIcon },
    props: {
      item: Object as PropType<CatalogItem>,
      activeId: String,
    },
    emits: ['catalog-item-del', 'catalog-item-click', 'add-group', 'add-article', 'rename'],
    setup(_props, { emit }) {
      function onCatalogClick(item: any) {
        emit('catalog-item-click', item);
      }
      function onCatalogDel(item: any) {
        emit('catalog-item-del', item);
      }
      function onGroupAdd(item: any) {
        emit('add-group', item);
      }
      function onArticleAdd(item: any) {
        emit('add-article', item);
      }
      function onRename(item: any) {
        emit('rename', item);
      }
      function onToggleChild(item: any) {
        item.$active = !item.$active;
      }
      function onDragStart(item: any) {
        console.log(item);
      }
      function onDragOver(e) {
        // 阻止默认行为，以便drop事件能被触发
        e.preventDefault();
      }
      function onDrop(item: any) {
        console.log(item);
      }

      return {
        onCatalogClick,
        onCatalogDel,
        onGroupAdd,
        onArticleAdd,
        onRename,
        onToggleChild,
        onDragStart,
        onDragOver,
        onDrop,
      };
    },
  });
</script>
