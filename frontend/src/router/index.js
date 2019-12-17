import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( '../views/Register.vue')
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import( '../views/Forget.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
