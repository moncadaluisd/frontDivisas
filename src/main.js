import Vue from 'vue'
import router from './router'
import Axios from 'axios'
import store from './store'
import Buefy from 'buefy'
import App from './App.vue'
import 'buefy/dist/buefy.css'
import Vue2Filters from 'vue2-filters'






Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}





Vue.use(Buefy)

Vue.config.productionTip = false
Vue.use(Vue2Filters)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
