
<script>
//1.setup的执行时机，比beforeCreate还早
//2.setup函数中，获取不到this，因为时间太早了，this即组件实例还没被创建出来
//3. 数据和函数，需要在setup最后return，才能在模板中应用
export default {
  
  
  setup(){
    //console.log('setup函数')

    //变量
    const message='hello world'
    //函数
    const logMessage=()=>{
      console.log(message)
    }
    return{
      message,logMessage
    }
  },
  beforeCreate(){
    console.log('beforeCreate函数')
  }
}
</script>
<template>
  <div>
    {{ message }}
  </div>
  <button @click="logMessage">打印信息</button>
</template>