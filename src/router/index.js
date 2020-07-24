import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import Comprador from '@/views/Comprador.vue'
import Search from '@/views/Search.vue'
import Chat from '@/views/Chat.vue'
import Transacciones from '@/views/Transacciones.vue'
import Soporte from '@/views/Soporte.vue'
import Perfil from '@/views/Perfil.vue'
import Pagos from '@/views/Pagos.vue'
import Cuenta from '@/views/Cuenta.vue'
import Notificacion from '@/views/Notificacion.vue'
import Notificaciones from '@/views/Notificaciones.vue'
import ResetPassword from '../views/Auth/ResetPassword.vue'
import Reset from '../views/Reset.vue'
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
        NotrequiresAuth: true
      }
  },
  {
    path: '/reset/:codigo',
    name: 'Reset',
    component: Reset,
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
    path: '/transacciones',
    name: 'Transacciones',
    component: Transacciones,
    meta: {
        requiresAuth: true
      }
  },
  {
    path: '/notificaciones',
    name: 'Notificaciones',
    component: Notificaciones,
    meta: {
        requiresAuth: true
      }
  },
  {
    path: '/notificacion/:id',
    name: 'Notificacion',
    component: Notificacion,
    meta: {
        requiresAuth: true
      }
  },
  {
    path: '/soporte',
    name: 'Soporte',
    component: Soporte,
    meta: {
        requiresAuth: true
      }
  },
  {
    path: '/perfil/:usuario',
    name: 'Perfil',
    component: Perfil,
    meta: {
        requiresAuth: false
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
  {
    path: '/pagos',
    name: 'Pagos',
    component: Pagos,
    meta: {
        requiresAuth: true,
        buyer: true
      }
  },
  {
    path: '/cuenta',
    name: 'Cuenta',
    component: Cuenta,
    meta: {
        requiresAuth: true,
      }
  },

]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})







router.beforeEach((to, from, next) => {

     if (to.matched.some(record => record.meta.requiresAuth) && !localStorage.getItem('token')) {
       return next('/')
     }else if (to.matched.some(record => record.meta.NotrequiresAuth) && localStorage.getItem('token')) {
       return next('/home')
     }else{
       return next()
     }


  })


export default router
