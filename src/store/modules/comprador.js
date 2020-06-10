import {HTTP} from '@/helpers/apiHost'

export default {
  namespaced: true,
  state: {
    posts: [],
    access: false,
    anuncios: 0,
    requests: [],

  },
  actions: {
    showAccess({commit}){
      return new Promise((resolve,reject) => {
        HTTP.get('/buyer')
          .then(function (response){
            // Getting Data from response
            console.log(response.data.data)
            commit('get_posts', response.data.data.data)
            resolve(response.data.data)
          })
          .catch(function (error){

            console.log(error.response.data);
            reject(error.response.data)
          });
      })
    },
    getRequests({commit})
    {
      return new Promise((resolve,reject) => {
        HTTP.get('/announcement/buyer')
          .then(function (response){
            // Getting Data from response
            console.log(response.data.data)
            commit('get_requests', response.data.data)
            resolve(response.data.data)
          })
          .catch(function (error){

            console.log(error.response.data);
            reject(error.response.data)
          });
      })
    },
    addPost({commit}, data)
    {
      commit('add_posts', data);
    }
  },
  mutations : {
    comprador_access(state){
      state.access = true
    },
    add_posts(state,data){
      state.posts.push(data)
    },
    get_posts(state,data){
      state.posts = data
    },
    get_requests(state,data){
      state.requests = data
    }
  },

}
