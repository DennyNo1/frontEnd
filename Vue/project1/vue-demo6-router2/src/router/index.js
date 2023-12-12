import Home from '@/views/Home'
import Search from '@/views/Search'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter) // VueRouter插件初始化

// 创建了一个路由对象
const router = new VueRouter({
  routes: [
    {path:'/',redirect:'/home'},
    { path: '/home', component: Home },
    { name:'routername',path: '/search/:words?', component: Search }//words就可以理解成变量了。在路径中，原本words这个变量必须存在，加了？就可以不存在了。
  ]
})

export default router