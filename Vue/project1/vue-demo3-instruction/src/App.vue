<template>

  <div  id="app">
    <h1>自定义指令</h1>
  <!--使用自定义指令-->
    <h1 v-changeColor="color1">用于被局部自定义指令修改的标题</h1>
  <input v-focus>
  </div>
</template>

<script>
export default 
{
  //局部自定义指令
  directives:{
    //该指令的名字
    changeColor:{
      inserted(el,binding){
        el.style.color=binding.value;
      },
      update(el,binding){
        //修改元素的元素为指令绑定的变量
        el.style.color=binding.value;
      }
      //inserted和update的区别在于是，
      //inserted只负责元素第一次被添加到页面时的操作的逻辑，
      //而update只负责指令附带变量改变时的操作逻辑

    }
  },
  data(){
    return {
      color1:'red'
    }
    
  }
}
</script>

<style>

</style>
