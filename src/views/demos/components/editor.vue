 <template>
    <div>
     <IEditor class="border" v-model="state.content" :editable="true" :toolbar="{action: '/api/upload'}"  />
    </div>
</template>
<script lang="ts" setup>

import { IEditor } from '@/components/IEditor';
const state = reactive({
    content: {} as any
})
</script>