<template>
  <div class="modal-card" style="width: 650px">
      <header class="modal-card-head">
          <p class="modal-card-title">Terminar la transaccion</p>
      </header>
      <section class="modal-card-body">
          <div class="estado">
              <div class="columns" style="margin-top: 50px;" v-if="slide == 0">
                <div class="column is-6">
                  <div class="box ">
                    <div class="d-flex">
                      <div class="">
                        <b-icon
                icon="check"
                size="is-large"
                  :type="siVerifico ? 'is-success' : 'is-danger'">>
            </b-icon>


                      </div>
                      <div class="">
                        <b-icon
                icon="account"
                size="is-large"
                  :type="siVerifico ? 'is-success' : 'is-danger'">
            </b-icon>

                      </div>
                    </div>
                    <div class="text-center">
                      <div class="" v-if="siVerifico">
                        <p>Ya verifico</p>
                      </div>
                      <div class="" v-else>
                        <p>No ha verificado</p>
                      </div>
                      <h3>{{ otroUsuario }}</h3>
                    </div>
                  </div>
                </div>

                <div class="column is-6">
                  <div class="box d-flex">

                  <button type="button" name="button" class="button is-success" @click="slide = 1">Terminar Transaccion</button>
                  </div>

                </div>
              </div>

              <div class="columns" v-if="slide == 1">
                <div class="column is-12 box">
                  <b-field label="Escribe una review">
                    <b-input maxlength="200" type="textarea" v-model="review.message"></b-input>
                  </b-field>

                  <div class="block">
                       <b-radio v-model="review.punto"
                           name="name"
                           native-value="1">
                           Positivo
                       </b-radio>
                       <b-radio v-model="review.punto"
                           name="name"
                           native-value="2">
                           Neutral
                       </b-radio>
                       <b-radio v-model="review.punto"
                           name="name"
                           native-value="3">
                           Negativo
                       </b-radio>
                    </div>

                    <div class="">
                      <button type="button" class="button is-info" name="button" @click="enviarReview()">Enviar Review</button>
                    </div>
                </div>
              </div>
          </div>




      </section>
      <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close(); slide=0">Close</button>

      </footer>
  </div>

</template>

<script>
import {HTTP} from '@/helpers/apiHost'
export default {
  props: ['request', 'username'],
  data()
  {
    return{
      slide: 0,
      review: {
        message: '',
        punto: ''
      }
    }
  },
  methods: {
    enviarReview()
    {
      this.$emit('verificar', 1);
      var that = this
      HTTP.post('/announcement/request/qualify/' + this.$route.params.id, this.review)
        .then(function (response){
         //Getting data from response
         console.log(response)
         that.$buefy.toast.open({
      message: 'Tu calificacion se enviado correctamente',
      type: 'is-success'
  })
  that.$parent.close()
        })
        .catch( function (error){
          // Describe error!
          console.log(error)
          that.$buefy.toast.open({
duration: 5000,
message: error.response.data.message,
position: 'is-bottom',
type: 'is-danger'
})
that.$parent.close()
        });
    }
  },
  computed: {
    otroUsuario()
    {
      var username;
      if (this.request.user.id === this.username.id) {
        username = this.request.announcement.user.username
      }else{
        username = this.request.user.username
      }

      return username
    },
    siVerifico()
    {
      var final;
      if (this.request.user.id === this.username.id) {
         if (this.request.stateRecipient === 1) {
           final = true
         }else{
           final = false
         }
      }else{
        if (this.request.stateIssuer === 1) {
          final = true
        }else{
          final = false
        }
      }
      return final
    }
  }
}
</script>

<style lang="css" scoped>
.d-flex{
  display: flex;
  justify-content: center;
}
.text-center{
  text-align:center;
}

</style>
