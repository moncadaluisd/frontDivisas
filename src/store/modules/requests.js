import {HTTP} from '@/helpers/apiHost'

export default {
  namespaced: true,
  state: {
    request: [],

  },
  actions: {
    storeRequest({commit}, request){
      return new Promise((resolve,reject) => {
        HTTP.post('/announcement/request', request)
          .then(function (response){
            // Getting Data from response
            console.log(response.data.data)
            commit('request_push', response.data.data)
            resolve(response.data.data)
          })
          .catch(function (error){


            reject(error)
          });
      })
    },
    addPost({commit}, data)
    {
      commit('add_posts', data);
    }
  },
  mutations : {
    request_push(state, data){
      state.request.push(data)
    },

  },

}
