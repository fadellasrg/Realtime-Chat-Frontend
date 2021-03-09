import Vue from 'vue'
import Vuex from 'vuex'
import moduleAuth from './modules/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  state () {
    return {
      setURL: process.env.VUE_APP_URL
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: moduleAuth
  }
})

export default store
