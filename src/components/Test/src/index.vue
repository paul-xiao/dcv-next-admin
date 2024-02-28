<template>
  <div>{{ message }}</div>
</template>

<script lang="ts">
  export default {
    name: 'MyComponent',
    props: {
      message: String,
    },
  };
</script>
