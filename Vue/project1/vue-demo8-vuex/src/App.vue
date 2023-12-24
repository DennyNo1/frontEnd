<template>
  <div>
    <h1>{{$store.state.title}}</h1>
    <Son1>

    </Son1>
    <Son2>

    </Son2>
  </div>

</template>

<script>
import Son1 from './components/SonComponent1.vue'
import Son2 from './components/SonComponent2.vue'
export default {
  components:{
    Son1,
    Son2,
  }
}
</script>

<style>

</style>