import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {
    login(state, user) {
      state.user = user
    },
    creataArticle(state, article) {
      console.log('commit success')
      state.article = article
    }
  },
  actions: {
    register(context, params) {
      console.log(axios)
      return axios.post('http://192.168.0.112:3000/user/register', params)
      // context.commit('register',res,err)
    },
    login(context, params) {
      return axios.post('http://192.168.0.112:3000/user/login', params)
    },
    // articles
    createArticle(context, params) {

      return axios.post('http://192.168.0.112:3000/article/create', params)
      // return axios.post('',parmas)
    },
    // showAreticle(context,params){

    // }
  },
  modules: {
  }
})
