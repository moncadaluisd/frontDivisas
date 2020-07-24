<template >
  <div class="transacciones-activas">
    <div class="bd-tabs box">
      <div class="tabs">
        <ul>
          <li class="pointer" @click="subMenu = 0">Transacciones</li>
          <li  class="pointer" @click="subMenu = 1">Comentarios</li>

        </ul>
      </div>
    </div>

    <div class="box" v-if="animated">
      <b-skeleton width="20%" :animated="animated"></b-skeleton>

    <b-skeleton width="40%" :animated="animated"></b-skeleton>

    <b-skeleton width="80%" :animated="animated"></b-skeleton>

    <b-skeleton :animated="animated"></b-skeleton>
    </div>

    <div class="box" v-if="animated">
      <b-skeleton width="20%" :animated="animated"></b-skeleton>

    <b-skeleton width="40%" :animated="animated"></b-skeleton>

    <b-skeleton width="80%" :animated="animated"></b-skeleton>

    <b-skeleton :animated="animated"></b-skeleton>
    </div>

    <div class="box" v-if="animated">
      <b-skeleton width="20%" :animated="animated"></b-skeleton>

    <b-skeleton width="40%" :animated="animated"></b-skeleton>

    <b-skeleton width="80%" :animated="animated"></b-skeleton>

    <b-skeleton :animated="animated"></b-skeleton>
    </div>

    <div class="box" v-if="animated">
      <b-skeleton width="20%" :animated="animated"></b-skeleton>

    <b-skeleton width="40%" :animated="animated"></b-skeleton>

    <b-skeleton width="80%" :animated="animated"></b-skeleton>

    <b-skeleton :animated="animated"></b-skeleton>
    </div>

    <div class="" v-if="subMenu == 0">

  <div class="" v-if="requests.length > 0">
    <div class="box " style="background-color: #f7f8fc" v-for="da in requests"  :key="da.id">

  <h3 class="title is-5"> <b-tooltip :label="da.currencyFromName">{{ da.currencyFromIso}}  </b-tooltip> a <b-tooltip :label="da.currencyToName">{{ da.currencyToIso }}</b-tooltip></h3>
      <p class="title is-5" style="margin-bottom: 0.5rem;"> <span class="has-text-danger	">{{ da.amount | currency }} {{ da.currencyFromIso}}</span></p>
      <div class="is-pulled-right">
        <div class="" v-if="tipo == 1">
          <button class="button is-danger" name="button" @click="$router.push({ path: 'chat/'+ da.id})">Terminar Transaccion</button>
        </div>
        <p>con {{ da.username }}</p>
      </div>
      <div class="" v-if="tipo==1">
        <span class="tag is-warning" v-if="da.state === 1">Transaccion Pendinete</span>
      </div>
      <span class="tag is-info" v-if="da.state === 3">Transaccion Cancelada</span>
      <span class="tag is-success" v-if="da.state === 2">Transaccion Exitosa</span>
      <span class="tag is-danger" v-if="da.state === 4">Transaccion Reportada</span>
      <p class="subtitle is-6">{{ da.title }}</p>

    </div>

  </div>

      <div class="box" v-else>
          <h3 class="title is-3">No hay nada por aqui todavia...</h3>
          <h4 class="subtitle is-4"> Comienza ahora.</h4>
      </div>

      <pagination
        v-if="paginationPost.last_page > 1"
        :pagination="pagination"
        :offset="5"
        @paginate="getInfo()"
      ></pagination>
  </div>
    <div class="" v-if="subMenu == 1">

      <div class="" v-if="comments.length > 0">
        <div class="box " style="background-color: #f7f8fc" v-for="da in comments"  :key="da.id">

      <h3 class="title is-5"> <b-icon size="is-medium" icon="message-arrow-right"></b-icon> {{ da.emitter.username }}</h3>
          <h4 class="subTitle is-4">{{ da.message }}</h4>
          <span class="tag is-warning">Comentario</span>
        </div>

      </div>

      <div class="box" v-else>
          <h3 class="title is-3">No hay nada por aqui todavia...</h3>
          <h4 class="subtitle is-4"> Comienza ahora.</h4>
      </div>

      <pagination
        v-if="paginationComment.last_page > 1"
        :pagination="pagination"
        :offset="5"
        @paginate="getInfo()"
      ></pagination>
    </div>
  </div>



</template>

<script>
import {HTTP} from '@/helpers/apiHost'

export default {
  props: ['tipo'],
  data(){
    return{
      animated: true,
      requests: [],
      paginationPost: {
          current_page: 1
        },
      comments: [],
      paginationComment: {
        current_page: 1
      },
    subMenu: 0
    }
  },
  methods: {
    getRequests(){
      var that = this
      if (this.tipo == 1) {
        HTTP.get('/announcement/buyer')
          .then(function (response){
            // Getting Data from response
            console.log(response);
            that.requests = response.data.data.data
            that.paginationPost = response.data.data

          })
          .catch(function (error){
            console.log(error);
          });
      }else{
      HTTP.get('/buyer/' + this.$route.params.usuario + '/requests')
        .then(function (response){
          // Getting Data from response
          console.log(response);
          that.requests = response.data.data.data
          that.paginationPost = response.data.data

        })
        .catch(function (error){
          console.log(error);
        });


        }
        that.animated = false
    },
    getComments()
    {
      var that = this;
      HTTP.get('/profile/' + this.$route.params.usuario)
        .then(function (response){
          // Getting Data from response
          that.comments = response.data.data.data
          that.paginationComment = response.data.data
        })
        .catch(function (error){
          console.log(error);
        });
    }
  },
  created(){
    this.getRequests();
    this.getComments();
  }
}
</script>

<style lang="css" scoped>
.tabs ul li {
  margin: 10px;
}
.pointer{
  cursor: pointer;
}
</style>
