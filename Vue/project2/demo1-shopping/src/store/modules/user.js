import { getData } from "@/utils/storage"
export default{
    namespaced:true,
    state:{
            userInfo: getData()//vuex在初始化的时候，会调用一次getData()。
            //假设我们一直运行，其实也没意义。这个的意义在于，重启项目的时候，能获得之前的数据。
    },
    mutations:{
        clear(state){
            console.log('hi')
            state.userInfo={};
            localStorage.removeItem('shopping_userInfo')
            localStorage.removeItem('history_search')

        }
    },
    actions:{
        logout(context)
        {
            context.commit('clear')
            context.commit('cartlist/clear',{root:true})
            context.commit('cartNumber/clear',{root:true})
        }
    },
    getters:{}
}