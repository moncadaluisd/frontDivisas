<template>
  <form action="" >
                 <div class="modal-card" style="width: 650px" v-if="mode === 'informar'">
                     <header class="modal-card-head">
                         <p class="modal-card-title">{{ info.user.username }}</p>
                     </header>
                     <section class="modal-card-body">
                        <h1 class="title is-4">{{ info.title}}</h1>
                        <div class="" style="margin-left: 20px;">
                            <h3 class="title is-5"> <b-tooltip :label="info.currency_from.name">{{ info.currency_from.iso }}  </b-tooltip> a <b-tooltip :label="info.currency_to.name">{{ info.currency_to.iso }}</b-tooltip></h3>
                        </div>
                        <p>{{ info.description }}</p>
                        <div class="is-pulled-right">
                          <p class="title is-6">Tasa: <span class="has-text-danger	">{{ info.price | currency }}</span></p>
                          <p> min: <span class="has-text-danger	">{{ info.min }}</span>  max: <span class="has-text-danger	">{{ info.max }}</span></p>
                        </div>
                        <div class="" style="margin-top: 50px;">
                          <div class="" style="padding-top: 50px;">
                            <p class="title is-3">
                              {{ amount | currency }} {{info.currency_from.iso}}
                            </p>
                          </div>
                          <div class="">
                            <p class="title is-3">{{ getMoney | currency}} {{info.currency_to.iso}}</p>

                          </div>
                        </div>


                     </section>
                     <footer class="modal-card-foot">
                         <button class="button" type="button" @click="$parent.close()">Close</button>

                     </footer>
                 </div>

                 <div class="modal-card" style="width: 650px" v-if="mode === 'cancelar'">
                     <header class="modal-card-head">
                         <p class="modal-card-title">Cancelar Transaccion</p>
                     </header>
                     <section class="modal-card-body">
                        <h1 class="title is-4">Quieres cancelar esta transaccion?</h1>

                      <button class="button is-danger" name="button" @click.prevent="cancelRequest()">Cancelar Transaccion</button>



                     </section>
                     <footer class="modal-card-foot">
                         <button class="button" type="button" @click="$parent.close()">Close</button>


                     </footer>
                 </div>


                 <div class="modal-card" style="width: 650px" v-if="mode === 'reportar'">
                     <header class="modal-card-head">
                         <p class="modal-card-title">Reportar Problema</p>
                     </header>
                     <section class="modal-card-body">
                        <h1 class="title is-4">Reportar Problema</h1>

                        <b-field>
                           <b-input placeholder="Titulo del problema"
                               v-model="reportar.titulo"
                               icon="lifebuoy">
                           </b-input>
                        </b-field>

                        <b-field>
           <b-select placeholder="Selecciona" icon="help" expanded>
               <option :value="ticketCategory[0].id">{{ticketCategory[0].name}}</option>

           </b-select>
       </b-field>

       <button class="button is-danger" name="button">Reportar</button>


                     </section>
                     <footer class="modal-card-foot">
                         <button class="button" type="button" @click="$parent.close()">Close</button>

                     </footer>
                 </div>
             </form>
</template>

<script>
import {HTTP} from '@/helpers/apiHost'
export default {
  props: ['info', 'amount', 'mode'],
  data(){
    return{
      form:{
        amount: 0,
        id_announcement: this.info.id
      },
      reportar: {
        id_category: '',
        message: ''
      },
      ticketCategory: []
    }
  },
  methods:{
    cancelRequest()
    {
      var that = this

      HTTP.put('/announcement/message/' + this.$route.params.id+'/cancel',{
        id_announcement: that.$route.params.id,
        amount: that.amount
      })
        .then(function (){
         //Getting data from response
         that.$buefy.toast.open({
           message: 'Se ha creado correctamente',
           type: 'is-success'
  })
  that.$router.push({ path: '/chat/'+ that.$route.params.id})
  that.$router.go({ path: '/chat/'+ that.$route.params.id})
        })
        .catch( function (error){
          // Describe error!
          console.log(error)
          that.$buefy.toast.open({
duration: 5000,
message: error.message,
position: 'is-bottom',
type: 'is-danger'
})
        });
    },
    getTicketCategory(){
      var that = this;
      HTTP.get('/ticket/category')
        .then(function (response){
          // Getting Data from response
          that.ticketCategory = response.data.data

        })
        .catch(function (error){
          console.log(error);
        });
    }
  },
    computed: {
      getMoney(){
        return this.info.price * this.amount
      },
    },

    created(){
      this.getTicketCategory()
    }
}
</script>

<style lang="css" scoped>
.modal-card {
  width: 100% !important;
}
</style>
