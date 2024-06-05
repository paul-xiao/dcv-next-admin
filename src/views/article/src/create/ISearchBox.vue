<template>
  <div class="bg-white p-5" v-if="visable">
    <div class="search-box-inner">
      <div class="search-box-inner-search">
        <input type="text" v-model="text" @keyup="onKeyup" />
      </div>
      <div class="search-box-inner-result">
        <ul>
          <li v-for="item of result" :key="item.id" @click="onItemClick(item)">
            {{ item.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, watch } from 'vue';
  import axios from 'axios';
  interface Article {
    id: number;
    title: string;
  }
  const visable = ref<boolean>(false);
  const list = ref<Article[]>([]);
  const result = ref<Article[]>([]);
  const text = ref<string>('');

  const emit = defineEmits(['ItemClick']);
  async function getArticles() {
    const res = await axios.get('/api/article/list');
    list.value = result.value = res.data.result;

    console.log(list.value);
  }

  function onKeyup() {
    result.value = list.value.filter(d => d.title.includes(text.value));
  }

  function onItemClick(item: any) {
    visable.value = false;
    console.log(item.id);

    emit('ItemClick', item);
  }

  watch(
    () => visable.value,
    val => {
      val && getArticles();
    },
  );

  defineExpose({
    visable,
  });
</script>
