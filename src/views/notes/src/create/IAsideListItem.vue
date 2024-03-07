<template>
  <li
    class="catalog-main-item cursor-pointer"
    :class="{ 'is-article': item?.articleId, active: item?.pid == activeId }"
    @click.stop="onCatalogClick(item)"
  >
    <div class="flex justify-between items-center px-5 hover:bg-gray-200" @click="onToggleChild(item)">
      <div class="flex items-center justify-center">
        <span class="mr-1"
          ><SvgIcon icon="folder" v-if="!item?.articleId"></SvgIcon> <SvgIcon icon="file" v-else></SvgIcon
        ></span>
        <span>
          {{ item?.name }}
        </span>
      </div>
      <div>
        <el-dropdown class="outline-none">
          <span class="el-dropdown-link outline-none"> <SvgIcon icon="more"></SvgIcon> </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="onGroupAdd(item)" v-if="!item?.articleId"> 新增分组 </el-dropdown-item>
              <el-dropdown-item @click="onArticleAdd(item)" v-if="!item?.articleId"> 新增文章 </el-dropdown-item>
              <el-dropdown-item @click="onRename(item)" v-if="!item?.articleId"> 重命名 </el-dropdown-item>
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
    <ul class="catalog-main-item-children" v-show="item?.$active">
      <IAsideListItem
        v-for="child of item?.children"
        :item="child"
        :activeId="activeId"
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

      return {
        onCatalogClick,
        onCatalogDel,
        onGroupAdd,
        onArticleAdd,
        onRename,
        onToggleChild,
      };
    },
  });
</script>
