import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test:1
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cart
  }
})
