<template>
  <div class="box">
    <h2 class="subtitle">Inciar Sesion</h2>
    <p class="help is-danger" v-if="error.message  !== ''">
      {{ error.message }}
    </p>
      <form class="" action="" method="post">
        <div class="">
          <b-field :type="error.message  !== '' ? 'is-danger' : ''">
            <b-input v-model="form.email" placeholder="Coloca tu correo"></b-input>
          </b-field>


                <b-field :type="error.message  !== '' ? 'is-danger' : ''">
                    <b-input type="password"
                        placeholder="Coloca tu clave"
                        v-model="form.password"
                        password-reveal>
                    </b-input>
                </b-field>

              <b-button type="is-success" expanded @click.prevent="loginUser">Entrar Ahora</b-button>
        </div>
        <div class="field">
          <div class="control">
            <div class="padding-t-2">
              <router-link to="/resetar-clave">Olvidaste tu Clave?</router-link>
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
export default {
    name: 'LoginForm',
  data(){
    return{
      form: {
        email: '',
        password: ''
      },
      error: {
        password: '',
        email: '',
        message: '',
      }

    }
  },
  methods: {
    loginUser(){
      var that = this
      this.$store.dispatch('auth/login', this.form)
          .then(() => {
            that.$router.go({path: 'home'})
          })
          .catch(error => {
            console.log(error)
            that.error.message = error.data.message
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
