<template>
  <div class="container is-fluid" style="margin-top: 100px">
    <div class="columns">
      <div class="column is-two-thirds">
          <img src="/img/bg/imgLogin.png" alt="">
      </div>
      <div class="column">
        <div class="box">
            <small>Cambia tu clave</small>
          <h2 class="subtitle">Hola {{ user.username }}</h2>

            <form class="" action="" method="post">
              <div class="">
                <b-field >
                  <b-input  v-model="form.password" type="password" placeholder="Coloca tu clave"></b-input>
                </b-field>

                <b-field >
                  <b-input  v-model="form.password_confirmation" type="password" placeholder="Confirma tu clave"></b-input>
                </b-field>

                    <b-button type="is-success" expanded @click="sendPassword()" >Resetear clave</b-button>
              </div>
              <div class="field" v-if="!isLoggin">
                <div class="control">
                  <div class="padding-t-2">
                    <router-link to="/">Entra ahora</router-link>
                  </div>


                </div>
              </div>
            </form>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import {HTTP} from '@/helpers/apiHost'
import {mapState} from 'vuex'
export default {
  data()
  {
    return{
      form: {
        password: '',
        password_confirmation: ''
      },
      user: {}
    }
  },
  methods:{
    getUser()
    {
      var that = this
      HTTP.get('/password/reset/' + this.$route.params.codigo)
        .then(function (response){
          // Getting Data from response
          that.user = response.data.data
          console.log(response.data.data)
        })
        .catch(function (error){
          console.log(error);
        });
    },
    sendPassword()
    {
      var that =this
      HTTP.put('/password/reset/' + this.$route.params.codigo,this.form)
        .then(function (response){
         //Getting data from response
         that.$buefy.toast.open({
                    message: 'Se ha clave ha sido cambiada conrrectamente',
                    type: 'is-success'
                })
                console.log(response.data)
         that.$router.push("/")
        })
        .catch( function (error){
          // Describe error!
          console.log(error)
        });
    }
  },
  created()
  {
    this.getUser();

  },
  computed:
  {
    ...mapState('auth', ['isLoggin'])
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
