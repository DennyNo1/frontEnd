<script setup>
import Son1Com from './components/Son1Com.vue';
import Son2Com from './components/Son2Com.vue';

import { useCounterStore } from './store/counter';//导入仓库
import { useChannelStore } from './store/channel';

//这里不用挂载的原因是因为，上面的代码和main.js中是重复的
// 使用 store
//这个名字不要乱改，否则会无效
const counterStore = useCounterStore();
const channelStore = useChannelStore();
console.log(counterStore.count)

</script>

<template>
<div>
  <h3>App.vue根组件</h3>
  <Son1Com></Son1Com>
  <Son2Com></Son2Com>
  {{counterStore.count}}
  <hr>
  <button @click="channelStore.getList">获取频道的数据</button>
  <ul>
    <li v-for="item in channelStore.channelList" :key="item.id">{{item.name}}</li>
  </ul>
</div>
</template>


