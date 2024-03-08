<script setup>
// reactive:接收一个对象类型的数据，返回一个响应式的对象
// ref:接收简单类型或者对象类型的数据的传入，并返回一个响应式的对象。
// 本质是将简单类型的数据转换成对象，该对象.value接收原数据。
import {reactive,ref,computed,watch} from 'vue'
import Computed from './components/Computed.vue'
//大括号代表对象
    const object = reactive({
        count:100
    })
    const addObject = ()=>{
        object.count++;
        object1.value++;
    }
    const object1= ref(0)

    const name=ref(0)

    watch(){
        
    }


    
</script>
<template>
    <div>
        {{object.count}}
        {{object1}}
        <button @click="addObject">+1</button>
    </div>
    <Computed></Computed>
    <div>

    </div>
</template>