<template>
    <node-view-wrapper class="code-block">
      <pre><code><node-view-content /></code></pre>
    </node-view-wrapper>
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