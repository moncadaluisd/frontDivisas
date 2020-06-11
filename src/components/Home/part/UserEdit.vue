<template >
  <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Editar {{ username }}</p>
                </header>
                <section class="modal-card-body">
                  <b-notification v-if="error.message || error.error"
        type="is-danger"
        aria-close-label="Close notification"
        role="alert">
        <span>{{error.message}}</span> <br>
        <span style="margin-left: 20px;">{{error.error}}</span>

    </b-notification>

                    <b-field label="Clave antigua">
                        <b-input
                            type="password"
                            v-model="form.oldPassword"
                            password-reveal
                            placeholder="Aqui tu antigua clave"
                            required>
                        </b-input>
                    </b-field>

                    <b-field label="Nueva Clave">
                        <b-input
                            type="password"
                            v-model="form.password"
                            password-reveal
                            placeholder="Clave"
                            required>
                        </b-input>
                    </b-field>

                    <b-field label="Repetir Clave">
                        <b-input
                            type="password"
                            v-model="form.password_confirmation"
                            password-reveal
                            placeholder="Repetir Clave"
                            required>
                        </b-input>
                    </b-field>
  <button class="button is-primary" @click.prevent="sendPassword">Guardar</button>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$parent.close()">Close</button>

                </footer>
            </div>
</template>

<script>
import {HTTP} from '@/helpers/apiHost'
export default {
  props: [''],
  name: 'UserEdit',
  data(){
    return{
      form: {
        oldPassword: '',
        password: '',
        password_confirmation: ''
      },
      error: {
        message: '',
        error: ''
      }

    }
  },
  methods: {
    sendPassword()
    {
      var that = this
      HTTP.put('/me',this.form)
        .then(function (response){
         //Getting data from response
         console.log(response)
         that.$parent.close()
         that.$buefy.toast.open({
                    message: 'Se ha actualizado correctamente',
                    type: 'is-success'
                })
        })
        .catch( function (error){
          // Describe error!
          that.error.message= ''
          that.error.error= ''
          console.log(error.response)


            that.error.message = error.response.data.message
            if (error.response.data.errors.password.length > 0) {
              that.error.error = error.response.data.errors.password[0]
            }

        });
    }
  },
  computed: {
    username()
    {
      return this.$store.state.auth.user.username
    }
  }

}
</script>

<style lang="css" scoped>
</style>
