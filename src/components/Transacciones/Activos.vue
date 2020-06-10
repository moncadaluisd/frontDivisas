<template >
  <div class="column is-12">
    <div class="is-danger left-border"  style="background-color: rgba(236, 167, 75, 0.62);margin-bottom: 20px;padding: 10px;boder-bo">
        <h2 class="subtitle is-4">Transacciones Recientes</h2>
    </div>
    <div class="state" style="margin-bottom: 20px;">
      <button :class="state == 'abierto' ? 'button is-info' : 'button is-success'" @click.prevent="state = 'abierto'" name="button">Transacciones Abiertas</button>
      <button :class="state == 'terminado' ? 'button is-info' : 'button is-success'" name="button" @click.prevent="state = 'terminado'">Transacciones Terminados</button>
      <button :class="state == 'cancelado' ? 'button is-info' : 'button is-success'" @click.prevent="state = 'cancelado'">Transacciones Canceladas</button>
    </div>
    <div class="box" style="background-color: rgba(#ec671c, 0.72)" v-if="animated">
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

    <div class="" v-if="requests.length> 0">
      <div class="box " style="background-color: #f7f8fc" v-for="da in requests"  :key="da">
         <button class="button is-danger is-pulled-right" @click.prevent="goToChat(da.id)">Ir al Cambio</button>

         <h3 class="title is-5"> <b-tooltip :label="da.announcement.currency_from.name">{{ da.announcement.currency_from.iso }}  </b-tooltip> a <b-tooltip :label="da.announcement.currency_to.name">{{ da.announcement.currency_to.iso }}</b-tooltip></h3>
         <p class="subtitle is-5"> <span class="has-text-danger	">{{ da.amount | currency }}</span></p>
         <div class="is-pulled-right">
         <p>{{ da.announcement.user.username }}</p>
         </div>
         <p class="subtitle is-6">{{ da.announcement.title }}</p>

      </div>
    </div>
    <div class="box" v-else>
        <h3 class="title is-3">No hay nada por aqui todavia...</h3>
        <h4 class="subtitle is-4"> Comienza ahora.</h4>
    </div>

    <pagination
      v-if="pagination.last_page > 1"
      :pagination="pagination"
      :offset="5"
      @paginate="getInfo()"
    ></pagination>

</div>
</template>

<script>

import {HTTP} from '@/helpers/apiHost'
import Pagination from '@/components/Partials/Pagination'
export default {
  components: {
    Pagination
  },
  data()
  {
    return{
      animated: true,
      state: 'abierto', //abierto, cancelado, terminado,
      requests: [],
      pagination: {
          current_page: 1
          }
    }
  },
  watch: {
  state: function() {

      this.getInfo();
  }
},
  methods:{
    getInfo()
    {
      var that = this;
      HTTP.get('/announcement/request/get/' + this.state + '?page=' + this.pagination.current_page)
        .then(function (response){
          // Getting Data from response
          that.requests = response.data.data.data
          that.pagination = response.data.data

          that.animated = false
        })
        .catch(function (error){
          console.log(error);
        });
    }
  },
  created()
  {
    this.getInfo()
  }
}
</script>

<style lang="css" scoped>
.state  .button {
  margin-left: 5px;
  margin-right:  5px;
}
</style>
