<template>
    <h1>dashboard</h1>
    <px-element message="hola! this is a web component" >
    </px-element>
</template>
<script setup lang="ts">
import { defineCustomElement } from 'vue';
import Test from '@/components/Test'
const MyCustomElement = defineCustomElement(Test);
customElements.define('px-element', MyCustomElement);


</script>