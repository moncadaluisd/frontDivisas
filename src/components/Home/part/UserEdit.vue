<template >
  <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Editar {{ username }}</p>
                </header>
                <section class="modal-card-body">


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
                            v-model="form.password"
                            password-reveal
                            placeholder="Repetir Clave"
                            required>
                        </b-input>
                    </b-field>
  <button class="button is-primary">Guardar</button>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$parent.close()">Close</button>

                </footer>
            </div>
</template>

<script>
export default {
  props: [''],
  name: 'UserEdit',
  data(){
    return{
      form: {
        oldPassword: '',
        password: '',
        password_confirmation: ''
      }
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
