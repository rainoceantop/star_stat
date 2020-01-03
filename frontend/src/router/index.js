import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store/index'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  //登录与注册
  {
    path: '/login',
    name: 'Login',
    // beforeEnter: (to, from, next) => {
    //   if (!Reflect.has(store.state.user, '_id')) {
    //     next()
    //   } else {
    //     next('/')
    //   }
    // },
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/auth/Register.vue')
  },
  //用户信息修改
  {
    path: '/users/:uid/edit',
    name: 'EditUsers',
    redirect: '/users/:uid/edit_profile',
    default: 'EditProfile',
    props: true,
    component: () => import('@/views/users/Edit.vue'),
    children: [
      {

        path: '/users/:uid/edit_profile',
        name: 'EditProfile',
        component: () => import('@/views/users/Profile.vue'),
        meta: { auth: true }
      },
      {
        path: '/users/:uid/edit_avatar',
        name: 'EditAvatar',
        component: () => import('@/views/users/Avatar.vue'),
        meta: { auth: true }
      },
      // EditPassword
      {
        path: '/users/:uid/edit_password',
        name: 'EditPassword',
        component: () => import('@/views/users/Password.vue'),
        meta: { auth: true }
      }
    ]
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('../views/auth/Forget.vue')
  },
  // Create
  {
    path: '/articles/create',
    name: 'Create',
    component: () => import('@/views/articles/Create.vue'),
    meta: { auth: true }
  },
  // Content
  {
    path: '/articles/:articleId/edit',
    name: 'Edit',
    component: () => import('@/views/articles/Create.vue'),
    props: true,
    meta: { auth: true }
  },
  // Column
  {
    path: '/:uid',
    name: 'Column',
    props: true,
    redirect: '/:uid',
    default: 'list',
    component: () => import('@/views/articles/Column.vue'),
    children: [
      {
        path: '/:uid',
        name: 'list',
        props: true,
        component: () => import('@/views/articles/List.vue')
      },
      {
        path: '/articles/:articleId/content',
        name: 'Content',
        props: true,
        component: () => import('@/views/articles/Content.vue')
      }
    ]
  },
  // 全局重定向
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
