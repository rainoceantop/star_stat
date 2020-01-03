import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'//导入axios
import moment from 'moment'; //导入模块
//配置moment到vue原型
Vue.prototype.$moment = moment;
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faUserSecret ,faUser} from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// library.add(faUserSecret,faUser)

// Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
//配置axios到vue原型
Vue.prototype.$axios = axios


// Vue.prototype.store = store

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
