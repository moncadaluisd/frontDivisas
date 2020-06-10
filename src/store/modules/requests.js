import {HTTP} from '@/helpers/apiHost'

export default {
  namespaced: true,
  state: {
    request: [],
    requestInactive: [],

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


            reject(error.response.data)
          });
      })
    },
    getRequest({commit})
    {
      return new Promise((resolve,reject) => {
        HTTP.get('/announcement/request')
          .then(function (response){
            // Getting Data from response
            commit('requests_get', response.data.data)
            resolve(response.data.data)
          })
          .catch(function (error){

            console.log(error);
            reject(error.response.data.message)
          });
      })
    }
  },
  mutations : {
    request_push(state, data){
      state.request.push(data)
    },
    requests_get(state, data)
    {
      state.request = data
    },
    requests_inactive(state,data){
      state.requestInactive = data;
    }

  },

}
