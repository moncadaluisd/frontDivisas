
import {HTTP} from '@/helpers/apiHost'
export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token') || '',
    user: {},
    message: '',
    isLoggin: false,
    comprador: false,
    admin: false


  },
  actions: {

    register({commit}, form)
    {
       return new Promise((resolve, reject) => {
      HTTP.post('/register',form)
        .then(function (response){
         //Getting data from response
        const message = response.data.message;
        console.log(message)
        commit('register_success', message)
          resolve(response)
        })
        .catch( function (error){
          // Describe error!

          reject(error.response.data.errors)
        });

      });

    },
    login({commit}, form){
      return new Promise((resolve,reject) => {
        HTTP.post('/login',form)
          .then(function (response){
           //Getting data from response
            const token = response.data.data.token
             localStorage.setItem('token', token)
             commit('is_admin', response.data.data.admin)
             commit('is_comprador', response.data.data.comprador)
            commit('auth_success')
            resolve(response.data.data)
          })
          .catch( function (error){
            // Describe error!
              reject(error.response)
          });
      })
    },
    me({commit}){
      return new Promise((resolve,reject) => {
        HTTP.get('/me')
          .then(function (response){
            // Getting Data from response
            console.log(response.data)
            commit('get_user', response.data.data.user)
            const data = true;
            commit('is_admin', response.data.data.admin)
            commit('is_comprador', response.data.data.comprador)
            commit('auth_success', data)
            resolve(response.data.data)
          })
          .catch(function (error){
            localStorage.removeItem('token')
            console.log(error.response.data);
            reject(error.response.data)
          });
      })
    },
    logout({commit})
    {
      return new Promise((resolve) => {
        localStorage.removeItem('token');
        commit('auth_error');
        resolve('Te has logueado correctamente');
      });
    }
  },
  mutations : {
    register_success(state, message)
    {
        state.message = message
    },
    auth_success(state, data){
      state.isLoggin = data
    },
    get_user(state,data)
    {
      state.user = data
    },
    auth_error(state)
    {
      state.isLoggin = false
    },
    is_admin(state, data){
      state.admin = data
    },
    is_comprador(state, data){
      state.comprador = data
    }



  },

}
