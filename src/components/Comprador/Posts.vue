<template>

    <div class="column">
      <div class="columns custom-columns">

        <div class="column is-6 box" style="margin-top: 0.75rem;">



          <div class="" style="margin-bottom: 50px;">
            <button class="button is-info is-pulled-right" @click.prevent="isComponentModalActive = true">Crear mas Posts</button>
          </div>
          <div class="" v-if="posts.length > 0">
              <div class="box " style="background-color: #f7f8fc" v-for="post in posts"  :key="post.id">
                 <button class="button is-info is-pulled-right">Cambiar Posts</button>

                <h3 class="title is-5"> <b-tooltip :label="post.currency_from.name">{{ post.currency_from.iso }}  </b-tooltip> a <b-tooltip :label="post.currency_to.name">{{ post.currency_to.iso }}</b-tooltip></h3>
                <p class="title is-6">Tasa: <span class="has-text-danger	">{{ post.price }}</span>$</p>
                <p> min: <span class="has-text-danger	">{{ post.min }}</span>  max: <span class="has-text-danger	">{{ post.max }}</span></p>
                <div class="is-pulled-right">
                  <p>{{ post.user.username }}</p>
                </div>
                <p class="subtitle is-6">{{ post.title }}</p>

              </div>
        </div>

            <div class="box" v-else>
                <h3 class="title is-3">No hay nada por aqui todavia...</h3>
                <h4 class="subtitle is-4"> Comienza ahora.</h4>
            </div>


        </div>


        <div class="column is-6">
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
          <div class="box " style="background-color: #f7f8fc" v-for="da in requests"  :key="da">
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
      <b-modal :active.sync="isComponentModalActive"
      has-modal-card full-screen :can-cancel="false">
      <CreatePost></CreatePost>
  </b-modal>
    </div>
</div>
</template>

<script>
import CreatePost from './part/CreatePost'
import {mapState} from 'vuex'
export default {
  components: {
           CreatePost
       },
  data(){
    return{
      isComponentModalActive: false,
      animated: true,


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
    }
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
</style>
