import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter: (to, from, next) => {
      if (!Reflect.has(store.state.user, '_id')) {
        next()
      } else {
        next('/')
      }
    },
    component: () => import('../views/users/Login.vue')
  },
  {
    path: '/register',
    name: 'register',

    component: () => import('../views/users/Register.vue')
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('../views/users/Forget.vue')
  }
  ,
  {
    path: '/edit',
    name: 'edit',
    component: () => import('../views/users/Edit.vue')
  }
  ,
  {
    path: '/user/:uid',
    name: 'index',
    component: () => import('../views/users/Index.vue')
  }
  ,
  {
    path: '/articles/create',
    name: 'create',
    component: () => import('../views/articles/create.vue'),
    props: true
  }
  ,

  {
    path: '/articles/update/:aid',
    name: 'update',
    component: () => import('../views/articles/create.vue'),
    props: true
  }
  ,
  {
    path: '/articles/list/:author',
    name: 'list',
    component: () => import('../views/articles/list.vue'),
    props: true
  }
  ,
  {
    path: '/articles/:aid',
    name: 'show',
    // beforeEnter: (to, from, next) => {
    //   console.log(store.state.article)
    //   if (!store.state.article) {
    //     next()
    //   } else {
    //     next('/')
    //   }
    // },
    component: () => import('../views/articles/show.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
