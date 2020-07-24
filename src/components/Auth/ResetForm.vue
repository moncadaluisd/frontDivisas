<template>
  <div class="box">
    <h2 class="subtitle"> </h2>
      <form class="" action="" method="post">
        <div class="">
          <b-field >
            <b-input v-model="form.email" placeholder="Coloca tu correo"></b-input>
          </b-field>

              <b-button type="is-success" expanded @click.prevent="sendResetMail()">Resetear clave</b-button>
        </div>
        <div class="field">
          <div class="control">
            <div class="padding-t-2">
              <router-link to="/">Entra ahora</router-link>
            </div>

            <div class="padding-t-2 d-flex">
              <p>¿No tienes una cuenta?</p>
              <router-link to="/registro">Crea tu cuenta</router-link>
            </div>
          </div>
        </div>
      </form>
  </div>
</template>

<script>
import {HTTP} from '@/helpers/apiHost'
export default {
  name: 'ResetForm',
  data(){
    return{
      form: {
        email: '',
      }
    }
  },
  methods:{
    sendResetMail()
    {
      var that =this
      HTTP.post('/password/reset',this.form)
        .then(function (response){
         //Getting data from response
         that.$buefy.toast.open({
                    message: 'Se ha enviado un correo para cambiar la clave',
                    type: 'is-success'
                })
         that.$router.push("/")
         console.log(response)
        })
        .catch( function (error){
          // Describe error!
          console.log(error.message);
        });
    }
  }

}
</script>

<style lang="css" scoped>
.padding-t-2{
  margin-top: 20px;
}
.d-flex{
  display:flex;
}
.d-flex a{
  margin-left: 10px;
}

a{
  color: rgb(90, 207, 84)
}


</style>
