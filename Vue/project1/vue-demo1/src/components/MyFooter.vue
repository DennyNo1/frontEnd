<template>
    <div class="myfooter">这是我的新页脚
        <MyButton></MyButton>
    </div>
    
  </template>
  
  <script>
import MyButton from './MyButton.vue'
  export default {
  components: { MyButton },
  
  }
  </script>
  
  <style>
  .myfooter{
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: 30px;
      background-color: #009efa;
      color: white;
  }
  </style>