import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faUserSecret ,faUser} from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// library.add(faUserSecret,faUser)
 
// Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.prototype.$axios = axios
Vue.prototype.store = store

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
