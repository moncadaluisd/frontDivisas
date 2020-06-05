<template>

    <div class="column">
      <div class="columns custom-columns">

        <div class="column is-6 box" style="margin-top: 0.75rem;">



          <div class="" style="margin-bottom: 50px;">
            <button class="button is-info is-pulled-right" @click.prevent="isComponentModalActive = true">Crear mas Posts</button>
          </div>
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


        <div class="column is-6">
          <div class="is-danger left-border"  style="background-color: rgba(236, 167, 75, 0.62);margin-bottom: 20px;padding: 10px;boder-bo">
              <h2 class="subtitle is-4">Transacciones activas</h2>
          </div>
          <div class="box " style="background-color: #f7f8fc">
             <button class="button is-danger is-pulled-right" style="">Cambiar Posts</button>

            <h3 class="title is-4" style="margin-bottom: 0.5rem;">Paypal a Bolivares</h3>
            <p class="title is-5" style="margin-bottom: 0.5rem;"> <span class="has-text-danger	">200.00</span>$</p>
            <div class="is-pulled-right">
              <p>Moncadaluisd</p>
            </div>
            <p class="subtitle is-6">Compro al mejor precio</p>

          </div>

          <div class="box " style="background-color: #f7f8fc">
             <button class="button is-danger is-pulled-right">Ir al Cambio</button>

            <h3 class="title is-4" style="margin-bottom: 0.5rem;">Paypal a Bolivares</h3>
            <p class="title is-5" style="margin-bottom: 0.5rem;"> <span class="has-text-danger	">200.00</span>$</p>
            <div class="is-pulled-right">
              <p>Moncadaluisd</p>
            </div>
            <p class="subtitle is-6">Compro al mejor precio</p>

          </div>

          <div class="box " style="background-color: #f7f8fc">
             <button class="button is-danger is-pulled-right">Ir al Cambio</button>

            <h3 class="title is-4" style="margin-bottom: 0.5rem;">Paypal a Bolivares</h3>
            <p class="title is-5" style="margin-bottom: 0.5rem;"> <span class="has-text-danger	">200.00</span>$</p>
            <div class="is-pulled-right">
              <p>Moncadaluisd</p>
            </div>
            <p class="subtitle is-6">Compro al mejor precio</p>

          </div>

      </div>





      </div>
      <b-modal :active.sync="isComponentModalActive"
      has-modal-card full-screen :can-cancel="false">
      <CreatePost></CreatePost>
  </b-modal>
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
    }
  },
  computed: {
    ...mapState('comprador', ['posts'])
  }
}
</script>

<style lang="css" scoped>
.left-border{
  border-left: 5px solid rgba(236, 167, 75, 1);
}
</style>
