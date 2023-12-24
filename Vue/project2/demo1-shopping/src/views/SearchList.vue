<template>
    <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="key"
      show-action
      @click="$router.push('/searchpage')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item">综合</div>
      <div class="sort-item">销量</div>
      <div class="sort-item">价格 </div>
    </div >

    

    <div v-if="searchData.data " >
      <!--之所以在这里才将searchData一层一层解包，是因为提前解包会报错.xxx.data是定死的。-->
      <div v-for="item in searchData.data.list.data" :key="item.goods_id" class="goods-list">
      <GoodsItem   :childProps=item ></GoodsItem>
      </div>
    </div>
  </div>
    
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import {searchGoods} from '@/api/search'
export default {
data(){
  return{
    searchData:[],
    name:'',
    key: '',

    
  }
},

  async created(){
    this.name=this.$route.query.name
    
    if(typeof this.$route.query.name !== 'undefined' && this.$route.query.name !== '')
    {
      console.log('有搜索项')
      const response=await searchGoods('all',0,0,this.name,1);
      this.searchData=response
      console.log(response)
      return
    }
    
    //如果要实现分类里，用categoryid搜索的效果，这里写一下逻辑即可。我懒得写了，复用上面用name的逻辑。
    

  },
  methods:{
    
  },
  components:{
    GoodsItem
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>