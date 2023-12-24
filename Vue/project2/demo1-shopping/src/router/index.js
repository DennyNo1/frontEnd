import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from '@/views/LogIn'

import LayOut from '@/views/LayOut'
import MyPay from '@/views/MyPay'
import SearchList from '@/views/SearchList'
import SearchPage from '@/views/SearchPage'
import MyHome from '@/views/MyHome'
import MyType from '@/views/MyType'
import MyShoppingCart from '@/views/MyShoppingCart'
import MyMine from '@/views/MyMine'
import MyOrder from '@/views/MyOrder'
import store from '@/store'
import ProDetail from '@/views/ProDetail'


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    
    {path: '/Login', component: LogIn },
    
    {path: '/LayOut', component: LayOut ,redirect:'/MyHome',
    children:[
      {path:'/MyHome',component:MyHome},
      {path:'/MyType',component:MyType},
      {path:'/MyShoppingCart',component:MyShoppingCart},
      {path:'/MyMine',component:MyMine},
    ]},
    {path: '/MyPay', component: MyPay },
    {path: '/SearchList', component: SearchList },
    {path: '/SearchPage', component: SearchPage },
    {path: '/MyOrder', component: MyOrder},
    {path:'/prodetail',component:ProDetail}
  ]
})
router.beforeEach((to, from, next) => {
  
 const authUrl=['/myshoppingcart','/mymine','/mypay','/myorder']
 if(!authUrl.includes(to.path)) 
 {
  
  next();//to.path比to.name多了/
 }
 //如果要访问需要登录的路径
 else {
  //先通过它有没有token来证明有没有登录
  console.log("认证")
  if(store.state.user.userInfo.token)//store和this.$store是等价的。但是这里的this并不是如同组件一样，指向vue实例。所以通过导入store。
  {
    next()
  }
  else{
    next('/Login')
  }
  
 }

})



export default router
