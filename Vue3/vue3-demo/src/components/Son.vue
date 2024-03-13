<script setup

>
//定义并且接收父组件传过来的对象，再通过对象.属性获取需要的数据
const props=defineProps(
    {
        car:String,
        fatherMoney:Number
    }
)


//定义事件名
const emit=defineEmits(['Money'])
//定义一个函数，触发会执行传递事件和数据的逻辑。
//emit 是一个用于触发自定义事件的方法，主要用于组件间的通信，特别是从子组件向父组件传递数据。
const subMoney=()=>{
    emit('Money',10)
}
console.log(props.fatherMoney)


</script>
<template>
    <div>我是子组件</div>
    <div>{{ props.car }}</div>
    <div>{{props.fatherMoney}}</div>
    <button @click="subMoney">减钱</button>

    
    </template>