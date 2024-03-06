<template>
  <div class="toolbar-wrap">
    <div v-if="editor" class="toolbar" ref="toolbar"></div>
    <div class="image-upload" v-if="showImageUpload">
      <span class="close-icon" @click="showImageUpload = false">X</span>
      <input ref="imageUploadRef" type="file" accept="image" @change="onImageUpload" />
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios'
import { getCurrentInstance, onMounted, ref } from 'vue'
import { getIcon } from '../helpers/icons'
import { menus } from '../plugins/menu'
const props = defineProps<{
  editor: any,
  action?: string
}>()
const toolbar = ref<HTMLElement>()
const imageUploadRef = ref<HTMLElement>()
const showImageUpload = ref<boolean>(false)
const instance: any = getCurrentInstance()

function buildToolbar() {
  menus.forEach(m => {
    const newChild = buildToolbarItem(m)
    toolbar.value?.appendChild(newChild)
  })
}

function buildToolbarItem(item: { icon: any; command: any; title: string }) {
  const iconEl = getIcon({ path: item.icon, width: 1000, height: 1000 })
  iconEl.setAttribute('title', item.title)
  iconEl.onclick = () => {
    const command = item.command
    const foos = props.editor.chain().focus()
    const isCustom = Object.keys(foos).findIndex(k => k === item.command) === -1
    console.log(isCustom)
    console.log(instance)

    isCustom ? instance.exposed?.[command]() : props.editor.chain().focus()[item.command]().run()
  }

  return iconEl
}

function addImage() {
  const url = window.prompt('URL')

  if (url) {
    props.editor.chain().focus().setImage({ src: url }).run()
  }
}
function uploadImage() {
  showImageUpload.value = true
  imageUploadRef.value?.focus()
}

async function onImageUpload(e: any) {
  showImageUpload.value = false
  const formData = new FormData()
  formData.append('file', e.target.files[0])
  if(!props.action) return
  const res = await axios.post(props.action, formData)
  if (res.data.code === 200) {
    const url = `/image/${res.data.result}`
    if (url) {
      props.editor.chain().focus().setImage({ src: url }).run()
    }
  }
}

function addUrl() {
  const url = window.prompt('URL')

  if (url) {
    props.editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run() 
  }
}

onMounted(() => {
  buildToolbar()
})

defineExpose({
  addImage,
  uploadImage,
  addUrl
})
</script>
