<template>
  <div class="app-container">
    <!-- Header 区域 -->
    <cart-header></cart-header>

    <!-- 商品 Item 项组件 -->
    <div v-for="(i,id) in item" :key=id>
      <cart-item :array="i"></cart-item>
    </div>
    


    <!-- Foote 区域 -->
    <cart-footer></cart-footer>
  </div>
</template>

<script>
import CartHeader from '@/components/cart-header.vue'
import CartFooter from '@/components/cart-footer.vue'
import CartItem from '@/components/cart-item.vue'

export default {

  name: 'App',
  components: {
    CartHeader,
    CartFooter,
    CartItem
  },
  created(){
    this.$store.dispatch('getData')
    console.log(this.$store.state.test)
  },
  computed:{
    item(){ 
      return this.$store.state.cart.res
    }

  }


}
</script>

<style lang="less" scoped>
.app-container {
  padding: 50px 0;
  font-size: 14px;
}
</style>
