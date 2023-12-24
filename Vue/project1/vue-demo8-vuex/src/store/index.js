import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title:'nihao',
    count:100,
    list:[1,2,3,4,5]
  },
  getters: {
    filterList(state){
      return state.list.filter(item => item>3)
    }
  },
  mutations: {
    addCount(state,n)//记得把state放在()中的参数列表
    {
      state.count+=n
    },
    updateCount(state,n)
    {
      state.count=n
    }
  },
  actions: {
    //context可以理解成store
    setAsyncCount(context,n)
    {
      //这个函数的逻辑就是，1s后触发这个addCount这个mutations
      setTimeout(
      () => {
        context.commit('addCount',n)
      },1000        
      )
    }
  },
  modules: {
    user
  }
})
