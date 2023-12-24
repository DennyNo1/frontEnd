<template>
  <div>I am Son2
    <div>modules.state分数：{{$store.state.user.score}}。</div>

    <button @click="minusScore(1)">按一下加上一分</button>
    <div>modules.getters: {{$store.getters['user/uppercase']}}{{$store.getters.uppercase}}</div>
    
    <div>从vuex获取的数据：{{$store.state.count}}。我想在输入框即使更新vuex的数据</div>
    <input v-model="newValue" @input="update">
  </div>
</template>

<script>
export default {
  created(){
    console.log(this.$store.getters)
  },
  data() {
    return {
      newValue: ''
    };
  },
  methods:{
    update(event){
      this.$store.commit('updateCount',event.target.value)
    },
    minusScore(n)
    {
      this.$store.commit('addScore',n)
    }
  }
}
</script>

<style>

</style>