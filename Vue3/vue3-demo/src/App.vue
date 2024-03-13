<script setup>
// reactive:接收一个对象类型的数据，返回一个响应式的对象
// ref:接收简单类型或者对象类型的数据的传入，并返回一个响应式的对象。
// 本质是将简单类型的数据转换成对象，该对象.value接收原数据。
import {reactive,ref,computed,watch,onMounted,provide} from 'vue'
import Computed from './components/Computed.vue'
import Watch from './components/Watch.vue'
import Son from './components/Son.vue'
import Middle from './components/Middle.vue'
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
    const fatherMoney=ref(150)

    const addMoney=()=>{
        fatherMoney.value+=1
    }

    //subMoney用newValue接收子组件传递的数据
    const subMoney=(newValue)=>{
        fatherMoney.value-=newValue
    }

    const inp=ref(null)
    const com=ref(null)
    const getCom=()=>{
        console.log(com.value)
    }

    onMounted(() => {console.log(inp.value)})  
    
    provide('theme-color','pink')





    
</script>
<template>
<div>
        <h3>父组件</h3>
        <button @click="addMoney">加钱</button>
    </div>

    <!-- 第一段：显示对象属性和按钮 -->
    <div>
        {{ object.count }}
        {{ object1 }}
        <button @click="addObject">+1</button>
    </div>

    <!-- 第二段：使用计算属性的子组件 -->
    <div>
        <Computed></Computed>
    </div>

    <!-- 第三段：使用 watch 监听的子组件 -->
    <div>
        <Watch></Watch>
    </div>

    <!-- 第四段：嵌套子组件.多个传值，千万不能用逗号隔开。 -->
    <div>
        <Son car="benz" :fatherMoney="fatherMoney" @Money="subMoney"
        ref="com">
        <!--两者绑定了，所以父组件的值改变，子组件也会跟随改变-->
        <!--@Money即监听子组件的Money事件，并将该事件的变量传递到subMoney函数中-->
        </Son>
        <button  @click="getCom">获取Son</button>
    </div>
    <div>
        <input type="text" ref="inp">
    </div>

    <Middle></Middle>
        

    
</template>