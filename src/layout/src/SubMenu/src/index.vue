<template>
    <template v-if="menu.children && menu.children.length">
        <el-sub-menu :index="menu.path">
            <template #title><el-icon>
                    <setting />
                </el-icon><span>{{ menu.meta.title }}</span></template>

            <SubMenu v-for="item of menu.children" :menu="item" />
        </el-sub-menu>
    </template>
    <el-menu-item v-else :index="menu.path">
        <el-icon>
            <setting />
        </el-icon>
        <template #title>{{ menu.meta.title }}</template>
    </el-menu-item>
</template>
<script lang="ts">
import { Setting } from '@element-plus/icons-vue';
export default {
    name: 'SubMenu',
    components: { Setting },
    props: {
        menu: {
            type: Object,
            default: () => { },
        },
    },
    setup() {
        return {};
    },
};
</script>
