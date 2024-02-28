<template>
  <div :class="`${ns}-description`">
    <ElRow>
      <ElCol :span="row" v-for="item of state.schema" :class="`${ns}-description-item`">
        <div :class="`${ns}-description-item-label`">
          {{ item.label }}
        </div>
        <div :class="`${ns}-description-item-value`">
          <template v-if="item.isTag">
            <div class="tag" :data-tag-color="getTagColor(state.data, item)">{{ state.data[item.prop] }}</div>
          </template>
          <template v-else>
            {{ state.data[item.prop] }}
          </template>
        </div>
      </ElCol>
    </ElRow>
  </div>
</template>
<script lang="ts">
  import { getGlobalConfig } from '@/hooks/useGlobalConfig';
  import { CloudTypeColor } from '@/enums/colors';

  export default defineComponent({
    name: 'Description',
    props: {
      row: {
        type: Number,
        default: 12,
      },
      schema: Array as PropType<IDescritionProps[]>,
      data: Object,
    },
    emits: ['register'],
    setup(props, { emit }) {
      const ns = getGlobalConfig('namespace');
      const state = reactive({
        schema: [] as IDescritionProps[],
        data: {} as any,
      });

      state.schema = props.schema || [];
      function setDescSchema(schema: IDescritionProps[]) {
        state.schema = schema;
      }
      function setDescData(data) {
        state.data = data;
      }

      function getTagColor(row, item) {
        const type = item.prop.includes('String') ? row[item.prop.replace('String', '')] : row.prop;
        return CloudTypeColor[type];
      }

      watch(
        () => props.data,
        val => {
          setDescData(val);
        },
      );

      onMounted(() => {
        emit('register', {
          setDescSchema,
          setDescData,
        });
      });

      return {
        ns,
        setDescSchema,
        setDescData,
        getTagColor,
        state,
      };
    },
  });
</script>
