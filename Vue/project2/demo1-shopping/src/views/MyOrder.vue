<template>
  <div class="order">
    
      <van-nav-bar title="我的订单" left-arrow  @click-left="$router.go(-1)" right-text="主页" @click-right="backHome"
    />    
    

    
    
    
    
    <van-tabs  v-model="active" >
      <van-tab name="all" title="全部"></van-tab>
      <van-tab name="payment" title="待支付"></van-tab>
      <van-tab name="delivery" title="待发货"></van-tab>
      <van-tab name="received" title="待收货"></van-tab>
      <van-tab name="comment" title="待评价"></van-tab>
    </van-tabs>

    <OrderListItem v-bind:list="list"></OrderListItem>
  </div>
</template>

<script>
import OrderListItem from '@/components/OrderListItem.vue'
import {getDataType} from '@/api/order'
export default {
  name: 'OrderPage',
  components: {
    OrderListItem
  },
  data () {
    return {
     
      list:[]
      
    }
  },
  computed:{
    active: {
    get() {
      return this.$route.query.dataType;
    },
    set(value) {
     
      this.$router.push({ query: { dataType: value } });
      this.getData()
    },
  },
    
  },
  async created(){
    this.getData()
  },
  methods:{
      async getData(){
     const res=await getDataType(this.active)
      console.log(res)
      this.list=res.data.list
      },
      backHome(){
        //console.log('test')
        this.$router.push('/myhome')
      }
  }
  // methods:{

  //   async handleDataChange(value) {
  //     // 在这里执行在 myData 变化时想要进行的操作
  //     this.$router.push(
  //       {
  //         path:'/myorder',
  //         query:{dataType: value}
  //       }
  //     )
  //     const res=await getDataType(value)
  //     console.log(res)
  //     this.list=res.data.list
      
  //   },
    
  // },
  // watch: {
  //   active(newValue, oldValue) {
  //     //这里active的值不变，不会触发下面的逻辑，也就做到了对重复的判断。
  //     console.log(newValue===oldValue)
  //     this.handleDataChange(newValue);

  //   }
  // },


  
}
</script>

<style lang="less" scoped>
.order {
  background-color: #fafafa;
}
.van-tabs {
  position: sticky;
  top: 0;
}
</style>