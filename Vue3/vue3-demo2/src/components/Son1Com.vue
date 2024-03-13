<script setup>
//导入仓库
import { useCounterStore } from 'E:/FrontEnd/Vue3/vue3-demo2/src/store/counter.js';
    //用对象接收仓库
    const counterStore=useCounterStore()
</script>
<template>
    <div>{{counterStore.count}}{{counterStore.double}}</div>
    <div>Son1</div>
    <button @click="counterStore.addCount">+1</button>
</template>