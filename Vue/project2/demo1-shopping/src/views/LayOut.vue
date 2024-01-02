<template>
  <div>
    LayOut
    <router-view></router-view>
    <van-tabbar route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/MyHome" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/MyType" icon="search">分类</van-tabbar-item>
      <van-tabbar-item
        @click="viewCart"
        to="/MyShoppingCart"
        icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item to="/MyMine" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  methods: {
    viewCart() {
      //从vuex取token
      if (!this.$store.state.user.userInfo.token) {
        //如果用户没有登录
        Dialog.confirm({
          title: "温馨提示",
          message: "您还没有登录",
          confirmButtonText: "去登录",
          cancelButtonText: "再逛逛",
        })
          .then(() => {
            const currentPath = this.$route.fullPath;
            this.$router.push({ path: "/login", query: { from: currentPath } });
          })
          .catch(() => {
            // on cancel.就是再逛逛，就是啥也不做，仅仅回退。
          });
      }
      else{
        this.$store.state.cartNumber.showCart=true
      }
    },
  },
};
</script>

<style></style>
