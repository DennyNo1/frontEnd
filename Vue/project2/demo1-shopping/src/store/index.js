import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import cartNumber from './modules/cartNumber'
import cartlist from './modules/cartlist'

Vue.use(Vuex)
//这个是主模块
export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,cartNumber,cartlist
  }
})
