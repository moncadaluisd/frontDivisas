<template>

    <div class="column">
      <div class="bd-tabs box">
        <div class="tabs">
          <ul>
            <li @click="nav = 1">General</li>
            <li  @click="nav = 2">Mis Posts</li>
            <li  @click="nav = 3">Transacciones</li>
          </ul>
        </div>
      </div>

      <div class="columns custom-columns"  v-if="nav == 1">







        <div class="column is-9">
          <div class="is-danger left-border"  style="background-color: rgba(236, 167, 75, 0.62);margin-bottom: 20px;padding: 10px;boder-bo">
              <h2 class="subtitle is-4">Transacciones activas</h2>
          </div>
          <div class="box" v-if="animated">
            <b-skeleton width="20%" :animated="animated"></b-skeleton>

          <b-skeleton width="40%" :animated="animated"></b-skeleton>

          <b-skeleton width="80%" :animated="animated"></b-skeleton>

          <b-skeleton :animated="animated"></b-skeleton>
          </div>

          <div class="">

      <div class="" v-if="requests.length > 0">
          <div class="box " style="background-color: #f7f8fc" v-for="da in requests"  :key="da.id">
             <button class="button is-danger is-pulled-right" @click.prevent="goToChat(da.id)">Ir al Cambio</button>

  <h3 class="title is-5"> <b-tooltip :label="da.currencyFromName">{{ da.currencyFromIso}}  </b-tooltip> a <b-tooltip :label="da.currencyToName">{{ da.currencyToIso }}</b-tooltip></h3>
            <p class="title is-5" style="margin-bottom: 0.5rem;"> <span class="has-text-danger	">{{ da.amount | currency }} {{ da.currencyFromIso}}</span></p>
            <div class="is-pulled-right">
              <p>{{ da.username }}</p>
            </div>
            <p class="subtitle is-6">{{ da.title }}</p>

          </div>

        </div>

            <div class="box" v-else>
                <h3 class="title is-3">No hay nada por aqui todavia...</h3>
                <h4 class="subtitle is-4"> Comienza ahora.</h4>
            </div>

      </div>





      </div>
            <Wallet :tipo="1"></Wallet>

    </div>


      <div class="column custom-columns" v-if="nav == 2">
      <MisPosts></MisPosts>
      </div>

      <div class="" v-if="nav == 3">
        <Transacciones></Transacciones>
      </div>
</div>
</template>

<script>
import MisPosts from './part/MisPosts'
import Transacciones from './part/Transacciones'
import Wallet from '@/components/Pagos/Wallet.vue'
import {mapState} from 'vuex'
export default {
  components: {
    MisPosts,
    Wallet,
    Transacciones
  },
  data(){
    return{
      isComponentModalActive: false,
      isComponentModalActiveEdit: false,
      animated: true,
      post: {},
      nav: 1
    }

  },
  methods: {

    getRequests()
    {
      var that = this
      this.$store.dispatch('comprador/getRequests')
      .then(function(response){
          console.log(response)
          that.animated = false
      }).catch(function(error){
        console.log(error)

      })
    },
    goToChat(id)
    {
      this.$router.push({ path: 'chat/'+ id})
      this.$router.go({ path: 'chat/'+ id})
    },

  },
  computed: {
    ...mapState('comprador', ['posts', 'requests'])
  },
   created(){
     this.getRequests();
   }
}
</script>

<style lang="css" scoped>
.left-border{
  border-left: 5px solid rgba(236, 167, 75, 1);
}
.tabs ul li {
  margin: 10px;
}
</style>
