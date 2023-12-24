<template>
  <div>
    LayOut
    <router-view></router-view>
  <van-tabbar route active-color="#ee0a24" inactive-color="#000">
    <van-tabbar-item to="/MyHome" icon="home-o" >首页</van-tabbar-item>
    <van-tabbar-item to="/MyType" icon="search">分类</van-tabbar-item>
    <van-tabbar-item to="/MyShoppingCart" icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item to="/MyMine" icon="manager-o">我的</van-tabbar-item>
  </van-tabbar>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>