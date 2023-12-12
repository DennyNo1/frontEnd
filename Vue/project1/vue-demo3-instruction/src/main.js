import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.directive('focus'//自定义指令的名字
,{
  inserted(el)
  //el就是使用这个指令的元素。
  //inserted会在指令所在的元素，被插入到页面中时触发。
  {
    el.focus();
  }
}
)

new Vue({
  render: h => h(App),
}).$mount('#app')
