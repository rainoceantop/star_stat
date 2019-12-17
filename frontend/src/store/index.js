import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    register() {
      // console.log(res)
    }
  },
  actions: {
    register(context, params) {
      console.log(params)
      this.$axios.post('', {}).then(res => res.data).catch(err => console.error(err))
      // context.commit('register',res,err)
    }
  },
  modules: {
  }
})
