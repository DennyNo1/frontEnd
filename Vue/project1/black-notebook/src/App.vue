<template>
  <!-- 主体区域 -->
  <section id="app">
    <NotebookHeader @add="addNew"></NotebookHeader>
    <NotebookMain :list="list" @delete="deleteOld"></NotebookMain>
    <NotebookFooter :count="count" @dA="deleteAll"></NotebookFooter>


    
    <!-- 统计和清空 -->

  </section>
</template>

<script>
import NotebookHeader from './components/NotebookHeader.vue'
import NotebookMain from './components/NotebookMain.vue'
import NotebookFooter from './components/NotebookFooter.vue'
export default {
  components:{
    NotebookHeader,
    NotebookMain,
    NotebookFooter
  },
  data () {
    return {
      count:JSON.parse(localStorage.getItem('count')),

      //list优先从本地读取数据
      list:JSON.parse(localStorage.getItem('list'))||[
      {id:1,name:'看雷军演讲',flag:'true'},
      {id:2,name:'去热浪打篮球',flag:'true'},
      {id:3,name:'下班时点外卖和打卡',flag:'true'}
      ]
    }

  },
  methods:
  {
    addNew(newName)
    {
      this.count++,
      this.list.push({ id: this.count, name: newName, flag: 'true' });
    },
    deleteOld(id){
      const item=this.list.find(item => item.id===id);
      this.list.splice(item, 1);
      this.count--;
    },
    deleteAll(){
      this.list=[];
      this.count=0;
    }

  },
  //本地持久化，先存到本地
  watch:{
    list:{
      deep:true,
      handler(newValue){
        localStorage.setItem('list',JSON.stringify(newValue))
      }
    },
    count:{
      deep:true,
      handler(newValue){
        localStorage.setItem('count',JSON.stringify(newValue))
      }
    }
  }
}
</script>

<style>

</style>
