<template>
  <div class="toolbar-wrap">
    <div v-if="editor" class="toolbar" ref="toolbar"></div>
    <div class="image-upload" v-show="false">
      <span class="close-icon" @click="showImageUpload = false">X</span>
      <input ref="imageUploadRef" type="file" accept="image" @change="onImageUpload" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { getCurrentInstance, onMounted, ref } from 'vue';
  import { getIcon } from '../helpers/icons';
  import { menus } from '../plugins/menu';
  import { upload } from '@/api/upload';
  const props = defineProps<{
    editor: any;
  }>();
  const toolbar = ref<HTMLElement>();
  const imageUploadRef = ref<HTMLElement>();
  const showImageUpload = ref<boolean>(false);
  const instance: any = getCurrentInstance();

  function buildToolbar() {
    menus.forEach(m => {
      const newChild = buildToolbarItem(m);
      toolbar.value?.appendChild(newChild);
    });
  }

  function buildToolbarItem(item: { icon: any; command: any; title: string }) {
    const iconEl = getIcon({ path: item.icon, width: 1000, height: 1000 });
    iconEl.setAttribute('title', item.title);
    iconEl.onclick = () => {
      const command = item.command;
      const foos = props.editor.chain().focus();
      const isCustom = Object.keys(foos).findIndex(k => k === item.command) === -1;
      console.log(isCustom);
      console.log(instance);

      isCustom ? instance.exposed?.[command]() : props.editor.chain().focus()[item.command]().run();
    };

    return iconEl;
  }

  function addImage() {
    const url = window.prompt('URL');

    if (url) {
      props.editor.chain().focus().setImage({ src: url }).run();
    }
  }
  function uploadImage() {
    showImageUpload.value = true;
    imageUploadRef.value?.click();
  }

  async function onImageUpload(e: any) {
    try {
      showImageUpload.value = false;
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      const res = await upload(formData);
      if (res) {
        const url = `/image/${res}`;
        if (url) {
          props.editor.chain().focus().setImage({ src: url }).run();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  function addUrl() {
    const url = window.prompt('URL');

    if (url) {
      props.editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run();
    }
  }

  onMounted(() => {
    buildToolbar();
  });

  defineExpose({
    addImage,
    uploadImage,
    addUrl,
  });
</script>
