import Vue from 'vue'
import App from './App.vue'
import MyButton from './components/MyButton.vue'

Vue.config.productionTip = false
//全局注册
Vue.component('MyButton',MyButton)

//为了基于App.vue渲染index.html
new Vue({
  el: '#app',
  render:(createElement) => {
    return createElement(App)
  }

  //render: h => h(App)，同render
})//.$mount('#app')，这与el效果一样
