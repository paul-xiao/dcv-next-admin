<template>
    <NodeViewWrapper class="code-block">
      <pre><code><NodeViewContent /></code></pre>
    </NodeViewWrapper>
  </template>
  
  <script lang="ts" setup>
  import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-3'
  </script>
  
  <style lang="scss">
  .code-block {
    position: relative;
  
    select {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
    }
  }
  </style>