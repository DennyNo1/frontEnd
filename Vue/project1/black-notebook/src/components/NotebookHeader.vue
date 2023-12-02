<template>
      <!-- 输入框 -->
    <header class="header">
      <h1>小黑记事本</h1>
      <input v-model='newName' placeholder="请输入任务" class="new-todo" />
      <button @click='handleAdd' class="add" >添加任务</button>
    </header>
</template>

<script>
export default 
{
  data(){

    return{
      newName:''
    }
  },
  methods:{
    handleAdd(){
      this.$emit('add',this.newName);
      this.newName='';
    }
    
  }

}
</script>

<style>

</style>