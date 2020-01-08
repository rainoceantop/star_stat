import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router' //引入路由
import store from './store' //引入vuex
import axios from 'axios'//导入axios
import moment from 'moment'; //导入模块
import { Button, Input, Upload, Icon, Modal, Radio, notification, Popconfirm, Dropdown, Menu } from "ant-design-vue";
Vue.prototype.$notification = notification;
Vue.prototype.$confirm = Modal.confirm;
//配置moment到vue原型
Vue.use(Dropdown)
Vue.use(Menu)
Vue.use(Button)
Vue.use(Input)
Vue.use(Upload)
Vue.use(Icon)
Vue.use(Modal)
Vue.use(Radio)
Vue.use(Popconfirm);


Vue.prototype.$moment = moment;
moment.locale('zh-cn')
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
