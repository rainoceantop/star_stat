import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    beforeEnter: (to, from, next) => {
      if (!store.state.user) {
        next()
      } else {
        next('/')
      }
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('../views/Forget.vue')
  }
  ,
  {
    path: '/articles/create',
    name: 'create',
    component: () => import('../views/articles/create.vue')
  }
  ,
  {
    path: '/articles/show/:Id',
    name: 'show',
    // beforeEnter: (to, from, next) => {
    //   console.log(store.state.article)
    //   if (!store.state.article) {
    //     next()
    //   } else {
    //     next('/')
    //   }
    // },
    component: () => import('../views/articles/show.vue')
  }
  ,
  {
    path: '/articles/list',
    name: 'list',
    component: () => import('../views/articles/list.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
