<template>
    <div class="flex h-screen bg-gray-50">
        <div class="flex flex-col items-center justify-center flex-1 p-5">
            <div class="bg"></div>
        </div>
        <div class="flex flex-col items-center justify-center flex-1 p-5">
            <div class="px-5 py-10 bg-white rounded shadow-xl" style="width: 500px">
                <h1 class="py-5 text-2xl text-center">Login</h1>
                <IForm @register="registerForm" @submit="onSubmit" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useForm, IForm } from '@/components/Form';
import { loginSchema } from './schema';
import { ref } from 'vue';

const input = ref('');
const [registerForm] = useForm({
    labelWidth: 0,
    foot: true,
    schema: loginSchema,
    api: Promise.resolve(1),
});

function onSubmit(form: any) { }
</script>
<style lang="scss">
html,
body {
    height: 100%;
    margin: 0;
}

body {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    background-color: #fff;
}

.bg {
    width: 500px;
    height: 500px;
    overflow: hidden;
    background-image: url(@/assets/loginBg.svg);
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: contain;

    &-form {
        background-color: #fff;
    }
}
</style>
