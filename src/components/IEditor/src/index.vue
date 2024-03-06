<script lang="ts" setup>
  import { onBeforeUnmount, reactive, ref, watch } from 'vue';
  import Document from '@tiptap/extension-document';
  import Image from '@tiptap/extension-image';
  import Link from '@tiptap/extension-link';
  import Highlight from '@tiptap/extension-highlight';
  import Typography from '@tiptap/extension-typography';
  import StarterKit from '@tiptap/starter-kit';
  import TextAlign from '@tiptap/extension-text-align';
  import TaskItem from '@tiptap/extension-task-item';
  import TaskList from '@tiptap/extension-task-list';
  import Placeholder from '@tiptap/extension-placeholder';
  import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
  import css from 'highlight.js/lib/languages/css';
  import js from 'highlight.js/lib/languages/javascript';
  import ts from 'highlight.js/lib/languages/typescript';
  import java from 'highlight.js/lib/languages/java';
  import html from 'highlight.js/lib/languages/xml';

  import { Editor, EditorContent, VueNodeViewRenderer } from '@tiptap/vue-3';
  import IToolBar from './components/IToolBar.vue';
  import ICodeBlock from './components/ICodeBlock.vue';
  import ITableOfContent from './components/ITableOfContent.vue';
  import TableOfContents from './extensions/TableOfContents';
  import './styles/index.scss';

  import { createLowlight } from 'lowlight';
  const lowlight = createLowlight();
  lowlight.register('html', html);
  lowlight.register('css', css);
  lowlight.register('js', js);
  lowlight.register('java', java);
  lowlight.register('ts', ts);

  const CustomDocument = Document.extend({
    content: 'heading block*',
  });
  const _props = withDefaults(
    defineProps<{
      modelValue: IData;
      toolbar: IData;
      editable: boolean;
    }>(),
    {
      editable: true,
    },
  );

  const emits = defineEmits(['update:modelValue', 'change']);

  const state = reactive({
    form: {} as any,
  });
  const editor = new Editor({
    extensions: [
      StarterKit.configure({
        document: false,
        codeBlock: false,
      }),
      Highlight,
      Typography,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TaskItem.configure({
        nested: true,
      }),
      TaskList,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'What’s the title?';
          }
          return '';
        },
      }),
      CustomDocument,
      CodeBlockLowlight.extend({
        addNodeView() {
          return VueNodeViewRenderer(ICodeBlock);
        },
      }).configure({ lowlight }),
      TableOfContents,
      Link.extend({
        inclusive: false,
      }),
    ],
    content: '',
    editable: _props.editable,
    onUpdate({ editor }) {
      const { content } = editor.getJSON();
      state.form.title = getTitle(content);
      if (editor.getHTML() === '<h1></h1>') {
        const html = `<h1>${state.form.title}</h1>`;
        editor.commands.setContent(html);
      }
      state.form.content = editor.getHTML();
      state.form.thumbnail = getThumbnail(content);

      emits('update:modelValue', state.form);
    },
  });

  watch(
    () => _props.editable,
    val => {
      editor.setEditable(val);
    },
  );

  function setContent(val: any) {
    // init article
    if (val?.id) {
      const { title, content, catalogId, id, updateTime } = val;
      state.form = { title, content, catalogId, id, updateTime };
      editor.commands.setContent(content);
      emits('update:modelValue', state.form);
    }
  }
  function getTitle(nodes: any) {
    const h1Node = nodes.find(
      (node: { type: string; attrs: { level: number } }) => node.type === 'heading' && node.attrs.level === 1,
    );
    return h1Node?.content?.[0]?.text || '';
  }
  function getThumbnail(nodes: any) {
    const imgNode = nodes.find((n: { type: string; attrs: { level: number } }) => n.type === 'image');
    return imgNode?.attrs?.src;
  }

  // expose to parent
  defineExpose({
    setContent,
  });

  onBeforeUnmount(() => {
    editor.destroy();
  });
</script>
<template>
  <div class="container">
    <div class="top">
      <IToolBar :editor="editor" v-bind="toolbar" />
    </div>
    <div class="main">
      <EditorContent class="editor" :editor="editor" />
      <ITableOfContent :editor="editor" :title="state.form?.title" />
    </div>
  </div>
</template>
