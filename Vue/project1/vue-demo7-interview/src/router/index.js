import Vue from 'vue'
import VueRouter from "vue-router";
import Layout from "@/views/Layout"
import ArticleDetail from '@/views/ArticleDetail'
import Article from '@/views/Article'
import Collect from '@/views/Collect'
import Like from '@/views/Like'
import User from '@/views/User'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: 
  [
    //两个一级页面
    {path:'/',//'/'就是默认首页
    component:Layout,
    redirect:'/article',
    children:[
      {
        path:'/article',component:Article
      },
      {
        path:'/collect',component:Collect
      },
      {
        path:'/like',component:Like
      },
      {
        path:'/user',component:User

      }
      
    ]
  },//在children里设置一级路由下的二级路由

    {path:'/detail',component:ArticleDetail}
  ]
})

export default router