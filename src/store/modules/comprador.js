import {HTTP} from '@/helpers/apiHost'

export default {
  namespaced: true,
  state: {
    posts: [],
    access: false,
    anuncios: 0,

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
    }
  },

}
