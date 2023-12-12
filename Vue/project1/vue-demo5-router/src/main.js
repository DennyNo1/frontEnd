import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Find from './views/Find.vue'
import My from './views/My.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)//插件的安装初始化
const router=new VueRouter(
  {
    routes:[
      {
        //绑定地址栏路径和组件
        path:'/find',component:Find
      },
      {
        path:'/my',component:My
      }
    ]
  }
)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
