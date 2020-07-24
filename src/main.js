import Vue from 'vue'
import router from './router'
import Axios from 'axios'
import store from './store'
import Buefy from 'buefy'
import App from './App.vue'
import 'buefy/dist/buefy.css'
import Vue2Filters from 'vue2-filters'
import Multiselect from 'vue-multiselect'
import VueChatScroll from 'vue-chat-scroll'


Vue.use(VueChatScroll)

// register globally
Vue.component('multiselect', Multiselect)


import Echo from 'laravel-echo'

window.Pusher = require('pusher-js');

window.Echo = new Echo({
  authEndpoint : 'http://localhost:8000/broadcasting/auth',
    broadcaster: 'pusher',
    key: '93effa87d855ac67af0e',
    cluster: 'us2',
    encrypted: false,
    auth: {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
}
});


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
