import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: [],
    user: {},
    article: []
  },
  mutations: {
    login(state, user) {
      state.user = user
      console.log(user);
    },
    creataArticle(state, article) {
      state.article = article
    },
    getSelfArticles(state, articles) {
      state.articles = articles
    },
    removeArticle(state, aid) {
      for (let i = state.articles.length - 1; i >= 0; i--) {
        if (state.articles[i]._id === aid) {
          state.articles.splice(i, 1)
          break
        }
      }
    },
    update(state, article) {
      console.log(article)
      state.article = article
      for (let i = state.articles.length - 1; i >= 0; i--) {
        if (state.articles[i]._id === article.aid) {
          state.articles.splice(i, 1, article);
        }
      }
    }

  },
  actions: {
    register(context, params) {
      console.log(axios)
      return axios.post('http://192.168.0.113:3001/user/register', params)
      // context.commit('register',res,err)
    },
    login(context, params) {
      return axios.post('http://192.168.0.113:3001/user/login', params)
    },
    // articles
    createArticle(context, params) {
      return axios.post('http://192.168.0.113:3001/article/create', params)
      // return axios.post('',parmas)
    },
    isLogin(context) {
      axios.post('http://192.168.0.113:3001/user/isLogin').then(res => {
        if (res.data.code === 1) {
          context.commit("login", res.data.info);
        } else {
          console.log(res)
        }
      })
    },
    updateArticle(context, params) {
      return axios.post('http://192.168.0.113:3001/article/update', params)
    }
    // showAreticle(context,params){

    // }
  },
  modules: {
  }
})
