<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search v-model="searchInput"  show-action placeholder="请输入搜索关键词" clearable>
      <template #action>
        <div @click=historySearch(searchInput)>搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history">
      <div class="title">
        <span>最近搜索</span>
        <van-icon @click="clearHistory()" name="delete-o" size="36" />
      </div>
      <div  class="list">
        <div v-for="item in historyData" :key="item" class="list-item" @click="historySearch(item)">{{item}}</div>
        
      </div>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
data(){
  return{
    historyData:[],
    searchInput:''
  }
  
},
created(){
  const historyDataString = localStorage.getItem('history_search');
  this.historyData = historyDataString ? historyDataString.split(',') : [];
},
methods:{
  async historySearch(i){
    if(i==='')
    {
      Toast("请输入搜索内容")
      return
    }
      
    if(this.historyData.includes(i)){
      const indexToRemove = this.historyData.findIndex(item => item === i);
      this.historyData.splice(indexToRemove,1)
    }

    await this.historyData.unshift(i)
    //页面跳转到searchlist
    this.$router.push(`/searchlist?name=${i}`);
    //每次更新都存到本地
    localStorage.setItem("history_search",this.historyData)//序列化

  },
  clearHistory(){
    localStorage.removeItem("history_search");
    this.historyData=[]
  }
}
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>