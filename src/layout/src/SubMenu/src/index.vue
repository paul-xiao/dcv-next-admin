<template>
    <template v-if="children && children.length">
        <el-sub-menu :index="menu.path">
            <template #title>
                <Icon :name="menu.meta.icon"></Icon>
                <span>{{ menu.meta.title }}</span></template>

            <SubMenu v-for="item of children" :menu="item" />
        </el-sub-menu>
    </template>
    <template v-else>
        <el-menu-item :index="menu.path" v-if="!menu.meta.isExternal">
            <Icon :name="menu.meta.icon"></Icon>
            <template #title>{{ menu.meta.title }}</template>
        </el-menu-item>
        <el-menu-item @click="onExternalClick" v-else>
            <Icon :name="menu.meta.icon"></Icon>
            <template #title>{{ menu.meta.title }}</template>
        </el-menu-item>
    </template>
</template>
<script lang="ts">
import Icon from '@/components/Icon';
import { ref } from 'vue';
export default {
    name: 'SubMenu',
    components: { Icon },
    props: {
        menu: {
            type: Object,
            default: () => { },
        },
    },
    setup(props) {
        const children = ref([])
        children.value = props.menu?.children?.filter(m => !m.meta.hidden)
        function onExternalClick() {
            window.open(`${props.menu.meta.protocol}:/${props.menu.path}`)
        }
        return {
            children,
            onExternalClick
        };
    },
};
</script>
