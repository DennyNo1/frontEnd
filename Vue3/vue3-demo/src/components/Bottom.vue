<script setup>
import { inject } from "vue";
const themeColor=inject("theme-color")
</script>
<template><h3>这是底层组件-{{themeColor}}</h3></template>