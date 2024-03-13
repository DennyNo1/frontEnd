<script setup>
import { ref,watch } from 'vue'
const count = ref(55)
const name = ref('zhangsan')
const userInfo=ref(
    {
        id:1,
        name:'lisi',
        age:55
    }
)
const changeCount = () => {
  count.value++
}
const changeName=()=>{
    name.value='denny'
}
const changeAge=()=>{
    userInfo.value.age++
}
//watch，以及computed，ref，reactive都可以理解成vue自带的函数。
//watch功能就是，一旦监视的对象发生改变，就执行{}的逻辑
watch(count,(newValue,oldValue)=>{
    console.log(newValue)
    console.log(oldValue)
})
//监视多个对象
watch(
    [count,name],
    (
        newValues,oldValues
    )=>{
        
        console.log(newValues)
        console.log(oldValues)
        
    },{
        //进入页面就来一次监视
        immediate:true,
        //不开启的话，无法监视到对象的属性的变化，只能监视到基本数据类型数据的变化。
        deep:true
    }
)
//精确监听对象的某个属性
watch(
    //回调函数的特殊写法
    ()=>userInfo.value.age,(newV,oldV)=>{
        console.log(newV)
    }
)


</script>
<template>
    <div>
        <!--反而写对象，写对象.value不显示-->
        {{ count}}
        <button @click="changeCount">+1</button>
    </div>
    <div>
        {{ name}}
        <button @click="changeName">修改名字为一个固定值</button>
    </div>
    <div>
        {{userInfo}}
        <button @click="changeAge">修改userInfo的年龄属性</button>
    </div>
</template>