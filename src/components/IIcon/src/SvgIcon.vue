<template>
  <svg :class="svgClass" aria-hidden="true" :style="{ width: size + 'px', height: size + 'px' }">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  interface Props {
    icon?: string;
    size?: number;
    className?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    className: '',
    size: 16
  });
  const iconName = computed(() => `#icon-${props.icon}`);

  const svgClass = computed(() => {
    if (props.className) {
      return 'svg-icon ' + props.className;
    } else {
      return 'svg-icon';
    }
  });
</script>
