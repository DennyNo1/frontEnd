<template>
  <div class="category">
    <!-- 分类 -->
    <van-nav-bar title="全部分类" fixed />

    <!-- 搜索框 -->
    <van-search
      readonly
      shape="round"
      background="#f1f1f2"
      placeholder="请输入搜索关键词"
      @click="$router.push('/searchpage')"
    />

    <!-- 分类列表 -->
    <div class="list-box">
      <div class="left">
        <ul>
          <li v-for="item in typeData.list" :key="item.category_id">
            <a :class="{ 'active': selected === item.category_id }" 
            @click="selectItem(item)">{{item.name}}</a>
          </li>

        </ul>

      </div>

      <div class="right">
        <div v-for="item in childtype" :key="item.category_id" class="cate-goods" 
        @click="selectType(item.name)">
          <img :src="item.image.external_url" alt="">
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
 
  import {getTypeData} from '@/api/type'
 
  export default {
  data(){
    return{
      typeData:[],
      selected:'',
      childtype:[]
    }
    
  },
  methods:{
    selectItem(item){
      this.selected=item.category_id
      this.childtype=item.children

    },
    selectType(name){
      this.$router.push(`/searchlist?name=${name}`);
    }
  },
  async created(){
    const response=await getTypeData();
    
    this.typeData=response.data
    console.log(this.typeData)
  }
  }
  </script>
  
  <style lang="less" scoped>
  // 主题 padding
  .category {
    padding-top: 100px;
    padding-bottom: 50px;
    height: 100vh;
    .list-box {
      height: 100%;
      display: flex;
      .left {
        width: 85px;
        height: 100%;
        background-color: #f3f3f3;
        overflow: auto;
        a {
          display: block;
          height: 45px;
          line-height: 45px;
          text-align: center;
          color: #444444;
          font-size: 12px;
          &.active {
            color: #fb442f;
            background-color: #fff;
          }
        }
      }
      .right {
        flex: 1;
        height: 100%;
        background-color: #ffffff;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: flex-start;
        padding: 10px 0;
        overflow: auto;
  
        .cate-goods {
          width: 33.3%;
          margin-bottom: 10px;
          img {
            width: 70px;
            height: 70px;
            display: block;
            margin: 5px auto;
          }
          p {
            text-align: center;
            font-size: 12px;
          }
        }
      }
    }
  }
  
  // 导航条样式定制
  .van-nav-bar {
    z-index: 999;
  }
  
  // 搜索框样式定制
  .van-search {
    position: fixed;
    width: 100%;
    top: 46px;
    z-index: 999;
  }
  </style>