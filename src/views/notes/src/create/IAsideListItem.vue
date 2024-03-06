<template>
  <li
    class="catalog-main-item cursor-pointer"
    :class="{ 'is-article': item?.pid, active: item?.pid == activeId }"
    @click.stop="onCatalogClick(item)"
  >
    <div class="flex justify-between items-center px-5 hover:bg-gray-200" @click="onToggleChild(item)">
      <span>
        <span> {{ !item?.pid ? '📁 ' : '📄 ' }} </span>
        <span>
          {{ item?.name }}
        </span></span
      >
      <el-dropdown class="outline-none">
        <span class="el-dropdown-link outline-none"> ... </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="onCatalogAdd(item)" v-if="!item?.pid">
              <ElButton type="primary" text>新增</ElButton>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-popconfirm title="Are you sure to delete this?" @confirm="onCatalogDel(item)">
                <template #reference>
                  <ElButton type="danger" text>删除</ElButton>
                </template>
              </el-popconfirm>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <ul class="catalog-main-item-children" v-show="item?.$active">
      <IAsideListItem
        v-for="child of item?.children"
        :item="child"
        :activeId="activeId"
        @catalog-item-del="onCatalogDel"
        @catalog-item-add="onCatalogAdd"
        @catalog-item-click="onCatalogClick"
      />
    </ul>
  </li>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import type { PropType } from 'vue';
  interface Catalog {
    name: string;
    pid?: string | number;
    children: Catalog[];
    $active?: boolean;
  }
  export default defineComponent({
    name: 'IAsideListItem',
    props: {
      item: Object as PropType<Catalog>,
      activeId: String,
    },
    emits: ['catalog-item-del', 'catalog-item-click', 'CatalogItemAdd'],
    setup(_props, { emit }) {
      function onCatalogClick(item: any) {
        emit('catalog-item-click', item);
      }
      function onCatalogDel(item: any) {
        emit('catalog-item-del', item);
      }
      function onCatalogAdd(item: any) {
        emit('CatalogItemAdd', item);
      }
      function onToggleChild(item: any) {
        item.$active = !item.$active;
      }

      return {
        onCatalogClick,
        onCatalogDel,
        onCatalogAdd,
        onToggleChild,
      };
    },
  });
</script>
