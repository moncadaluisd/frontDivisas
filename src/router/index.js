import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import Comprador from '@/views/Comprador.vue'
import Search from '@/views/Search.vue'
import Chat from '@/views/Chat.vue'
import ResetPassword from '../views/Auth/ResetPassword.vue'
//import store from '@/store/index.js'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
        NotrequiresAuth: true
      }
  },
  {
    path: '/resetar-clave',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: {
        requiresAuth: true
      }
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Register,
    meta: {
        NotrequiresAuth: true
      }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
        requiresAuth: true
      }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {
        requiresAuth: true
      }
  },
  {
    path: '/chat/:id',
    name: 'Chat',
    component: Chat,
    meta: {
        requiresAuth: true
      }
  },
  {
    path: '/comprador',
    name: 'Comprador',
    component: Comprador,
    meta: {
        requiresAuth: true,
        buyer: true
      }
  },

]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('token')) {
        next()
        return
      }
      next('/')
    } else {
      next()
    }
    })

export default router
