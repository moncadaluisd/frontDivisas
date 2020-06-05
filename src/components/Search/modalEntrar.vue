<template>
  <form action="">
                 <div class="modal-card" style="width: 650px">
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
                          <div class="" style="margin-top: 20px;">
                            <b-field>
                               <b-input :placeholder="info.min"
                                   v-model="form.amount"
                                   icon="credit-card">
                               </b-input>
                            </b-field>
                          </div>
                          <div class="">
                            <p class="title is-3">{{ getMoney | currency}}</p>

                          </div>
                        </div>


                     </section>
                     <footer class="modal-card-foot">
                         <button class="button" type="button" @click="$parent.close()">Close</button>
                         <button class="button is-info" @click.prevent="sendRequest()">Entrar</button>
                     </footer>
                 </div>
             </form>
</template>

<script>
export default {
  props: ['info'],
  data(){
    return{
      form:{
        amount: 0,
        id_announcement: this.info.id
      }
    }
  },
  methods:{
    sendRequest()
    {
      var that = this
      this.$store.dispatch('requests/storeRequest', this.form)
                  .then(function(response){
                    console.log(response)
                    that.$buefy.toast.open({
                 message: 'Se ha creado correctamente',
                 type: 'is-success'
             })
                    that.$router.push({ path: 'chat/'+ response.id})
                    that.$router.go({ path: 'chat/'+ response.id})
                  })
                  .catch(function(error) {
                      console.log(error)
                      this.$buefy.toast.open({
     duration: 5000,
     message: error,
     position: 'is-bottom',
     type: 'is-danger'
 })
                  })
    }
  },
    computed: {
      getMoney(){
        return this.info.price * this.form.amount
      },
    },
}
</script>

<style lang="css" scoped>
</style>
