<template>
  <div>I am Son1
    <div>从vuex获取的数据：{{$store.state.count}}</div>
    <button @click="incrementCount(1)">让这个数据+1</button>
    <button @click="incrementCount(-1)">让这个数据-1</button>
    <button @click="addCountAfterOneSecond(1)">让这个数据1s后+1</button>
    <div>用了mapGetters的过滤后的数组{{filterList}}</div>
    <p></p>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  methods: {
    incrementCount(n) {
      this.$store.commit('addCount',n);
    },
    addCountAfterOneSecond(n){
      //调用那个actions
      this.$store.dispatch('setAsyncCount',n)
    }
  },
  computed:{
    ...mapGetters(['filterList'])//这里computed的名字不需要定义了，直接用getters里面的，毕竟映射了。
  }
}
</script>

<style>

</style>