<template>
  <div class="box">
    <h2 class="subtitle">Registrate Ahora</h2>
      <form class="" action="" method="post">
        <div class="">
          <b-field :type="errors.email !== '' ? 'is-danger' : ''" :message="errors.email">
            <b-input v-model="form.email" placeholder="Coloca tu correo"></b-input>
          </b-field>
          <div class="field">
            <div class="control is-clearfix">
              <VuePhoneNumberInput v-model="form.movil" @update="getNumber($event)" />
            </div>
            <p class="help is-danger" v-if="errors.phone  !== ''">
              {{ errors.phone }}
            </p>
          </div>




          <b-field :type="errors.username  !== '' ? 'is-danger' : ''" :message="errors.username">
            <b-input v-model="form.username" placeholder="Coloca tu Usuario"></b-input>
          </b-field>


                <b-field :type="errors.password  !== '' ? 'is-danger' : ''" :message="errors.password">
                    <b-input type="password"
                        placeholder="Coloca tu clave"
                        v-model="form.password"
                        password-reveal>
                    </b-input>
                </b-field>

                <b-field >
                    <b-input type="password"
                        placeholder="Confirma tu clave"
                        v-model="form.password_confirmation"
                        password-reveal>
                    </b-input>
                </b-field>

              <b-button type="is-success" expanded @click.prevent="registerUser">Registrate</b-button>
        </div>
        <div class="field">
          <div class="control">
            <div class="padding-t-2">
              <router-link to="/resetar-clave">Olvidaste tu Clave?</router-link>
            </div>

            <div class="padding-t-2 d-flex">
              <p>¿Ya tienes una cuenta?</p>
              <router-link to="/">Inicia sesion ahora</router-link>
            </div>
          </div>
        </div>
      </form>
  </div>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
export default {
  components: {
    VuePhoneNumberInput
  },
  data(){
    return{
      form: {
        email: '',
        password: '',
        movil: '',
        phone: '',
        username: '',
        password_confirmation: ''
      },
      errors: {
        email: '',
        password: '',
        username: '',
        phone: ''
      }
    }
  },
  methods: {
    getNumber(e){
      this.phone= e.e164
    },
    registerUser()
    {
      this.errors = {
        email: '',
        password: '',
        username: '',
        phone: ''
      }
      var that = this
      this.$store.dispatch('auth/register', this.form)
        .then(() => {
          this.$router.push("/")
        }).catch(error => {
          console.log(error)
          that.errors.email = error.email[0]
          that.errors.password = error.password[0]
          that.errors.phone = error.phone[0]
          that.errors.username = error.username[0]
        });
    }
  },
  mutations: {

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
