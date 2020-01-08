import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import ls from '@/utils/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: ls.getItem('auth'),
    user: ls.getItem('user'),
    article: ls.getItem('article'),
    // article: {}
  },
  mutations: {
    //自动登录
    UPDATE_AUTH(state, auth) {
      state.auth = auth;
      ls.setItem('auth', auth)
    },
    login(state, user) {
      state.user = user
      ls.setItem('user', user)
    },

    updateUser(state, user) {
      state.user._id = user._id
      state.user.avatar = user.avatar
      state.user.email = user.email
      state.user.username = user.username
      state.user.sex = user.sex
      state.user.hobbies = user.hobbies
      state.user.introduction = user.introduction
      ls.setItem('user', user)
    },

    CreateArticle(state, article) {
      state.article = article
      ls.setItem('user', article)
    },
    // createArticle(state, article) {
    //   state.article = article
    //   state.articles.unshift(article)
    // },
    // getSelfArticles(state, articles) {
    //   state.articles = articles
    // },
    removeArticle(state, aid) {
      for (let i = state.articles.length - 1; i >= 0; i--) {
        if (state.articles[i]._id === aid) {
          state.articles.splice(i, 1)
          break
        }
      }
    },
    // updateArticle(state, article) {
    //   state.article = article;
    // },
    // updateArticles(state, article) {
    //   state.articles.map(item => {
    //     if (article._id == item._id) {
    //       item['title'] = article.title;
    //       item['content'] = article.content;
    //     }
    //     return item
    //   })
    // }

  },
  actions: {
    // auth
    login(context, params) {
      return axios.post('http://192.168.0.106:3001/user/login', params);

    },
    register(context, params) {
      return axios.post('http://192.168.0.106:3001/user/register', params)
    },


    //user
    updateUser(context, params) {
      console.log("params", params)
      return axios.post('http://192.168.0.106:3001/user/userUpdate', params)
    },

    //article
    createArticle(context, params) {
      return axios.post('http://192.168.0.106:3001/article/create', params);
    },
    getArticle(context, params) {
      return axios.get('http://192.168.0.106:3001/article/getArticle/' + params)
    },
    updateArticle(context, params) {
      return axios.post('http://192.168.0.106:3001/article/update', params)
    },

    getSelfArticles(context, params) {
      console.log(context)
      return axios.post('http://192.168.0.106:3001/article/getArticles/' + params)
    },
    // articles
    isLogin(context) {
      axios.post('http://192.168.0.106:3001/user/isLogin').then(res => {
        if (res.data.code === 1) {
          context.commit("login", res.data.info);
          console.log("islogin", res)
        } else {
          console.log("islogin1", res)
        }
      })
    },
  },
  modules: {
  }
})
