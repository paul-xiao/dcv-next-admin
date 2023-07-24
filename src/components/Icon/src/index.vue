<template>
    <el-icon :size="20">
        <component :is="name" />
    </el-icon>
</template>
<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        /**
         * The label of the button
         */
        name: string;
    }>(),
    { name: '' },
);
</script>