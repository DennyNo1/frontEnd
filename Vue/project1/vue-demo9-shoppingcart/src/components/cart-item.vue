<template>
  <div class="goods-container">
  <div  >
  <!-- 左侧图片区域 -->
    <div  lass="left">
      <img :src=array.thumb class="avatar" alt="" >
    </div>
    <!-- 右侧商品区域 -->
    <div class="right">
      <!-- 标题 -->
      <div class="title">{{array.name}}</div>
      <div class="info">
        <!-- 单价 -->
        <span class="price">￥{{array.price}}</span>
        <div class="btns">
          <!-- 按钮区域 -->
            <button @click="changeCount(-1)" class="btn btn-light">-</button>
            <span class="count">{{array.count}}</span>
            <button @click="changeCount(1)" class="btn btn-light">+</button>
          </div>
        </div>
    </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      newCount: this.array.count
    };
  },
  name: 'CartItem',
  methods: {
    async changeCount(n){
      if(this.newCount<1 && n===-1)
      {
        alert("数量已到达最小")
        return
      }
      
      this.newCount+=n
      const obj={
        id:this.array.id,
        newCount:this.newCount
      }//props是没法在子组件中更新的
      this.$store.dispatch('changeCount',obj)
      
      //这里更新完模拟后端的数据直接，再拉取一边数据到store不就好了
      await this.$store.dispatch('getData')

  } 
},
  props:{
    array:Array
  }
  
}

</script>

<style lang="less" scoped>
.goods-container {
  display: flex;
  padding: 10px;
  + .goods-container {
    border-top: 1px solid #f8f8f8;
  }
  .left {
    .avatar {
      width: 100px;
      height: 100px;
    }
    margin-right: 10px;
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    .title {
      font-weight: bold;
    }
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price {
        color: red;
        font-weight: bold;
      }
      .btns {
        .count {
          display: inline-block;
          width: 30px;
          text-align: center;
        }
      }
    }
  }
}

.custom-control-label::before,
.custom-control-label::after {
  top: 3.6rem;
}
</style>
