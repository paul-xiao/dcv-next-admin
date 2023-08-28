<template>
  <Drawer ref="DrawerRef" @open="load">
    <Description @register="registerDesc" />
  </Drawer>
</template>
<script setup lang="ts">
  import { detail } from '@/api/pool/cloud';
  import { Drawer } from '@/components/Drawer';
  import { Description, useDescription } from '@/components/Description';
  import { DetailSchema } from './cloud';
  const DrawerRef = ref();
  const [registerDesc, { setDescData }] = useDescription({
    schema: DetailSchema,
  });
  async function load(row) {
    const result = await detail({ poolCloudId: row.id });
    setDescData(result);
  }
</script>
