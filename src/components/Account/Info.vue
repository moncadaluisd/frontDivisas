<template >
  <div class="column is-9">
    <div class="columns">
        <div class="column is-12">
          <div class="usuario">
            <div class="usuario--username">
              <b-icon
                      icon="account"
                      size="is-medium">
                  </b-icon>
                  <h3 class="title is-3">{{ user.username  }}</h3>

            </div>
            <div class="usuario--estadisitcas">
              <ul>
                <li class="box"> <b>Cambiar clave </b>   <div class="">
                  <button class="button is-danger"  @click="isComponentModalActive = true">Cambiar clave</button>
                </div>  </li>
                <li class="box"> <b> Verificar telefono</b>
                  <div class="" v-if="NumeroVerificado == 0">
                    <p class="has-text-success">Proximamente</p>
                </div>


              </li>
              <li class="box"> <b> Cuenta Verificada</b>
                <div class="" v-if="user.data">
                  <p class="has-text-success">Cuenta Verificada</p>
              </div>
              <div v-else>
                  <p class="has-text-danger">Cuenta Sin verificar</p>
              </div>

            </li>

              </ul>
            </div>
          </div>
        </div>

    </div>
    <div class="box" v-if="!user.data">
      <div class="header-info">
        <h2 class="title is-5">Datos de Usuarios</h2>
        <h3 class="subTitle is-6"> Para empezar a usar la plataforma tienes que llenar estos datos.</h3>
      </div>

      <div class="body">

        <div class="data-input">
          <b-field label="Nombre">
            <b-input v-model="formData.first_name"></b-input>
          </b-field>
        </div>

        <div class="data-input">
          <b-field label="Apellido">
            <b-input v-model="formData.last_name"></b-input>
          </b-field>
        </div>

      <div class="data-input">
        <b-field label="Selecciona el dia de tu cumple">
              <input type="date" name="" v-model="formData.birth_date" class="input" value="">

         </b-field>
      </div>

        <div class="data-input">
          <b-field label="DNI/CI">
            <b-input v-model="formData.dni"></b-input>
          </b-field>
        </div>

        <div class="data-input">
          <b-field label="Escribe tu pais">
            <b-input v-model="formData.country"></b-input>
          </b-field>
        </div>



        <div class="data-input">
          <b-field label="Estado o provincia">
            <b-input v-model="formData.state"></b-input>
          </b-field>
        </div>

        <div class="data-input">
          <b-field label="Codigo ZIP">
            <b-input v-model="formData.zip"></b-input>
          </b-field>
        </div>


        <div class="data-input">
          <b-field label="Direccion">
            <b-input maxlength="400" v-model="formData.address" type="textarea"></b-input>
          </b-field>
        </div>



        <div class="data-input">
          <button class="button is-success" name="button" @click.prevent="enviarData()">Guardar</button>
        </div>


      </div>
    </div>
    <b-modal :active.sync="isComponentModalActive"
       has-modal-card full-screen :can-cancel="false">
       <UserEdit></UserEdit>
   </b-modal>
  </div>
</template>

<script>
import UserEdit from '@/components/Home/part/UserEdit.vue'
import {mapState} from 'vuex';
import {HTTP} from '@/helpers/apiHost'

export default {
  components: {
           UserEdit
       },
  data(){
    return{
      isComponentModalActive: false,
      NumeroVerificado: 0,
      formData: {
        first_name: '',
        last_name: '',
        birth_date: Date,
        dni: '',
        country: '',
        state: '',
        zip: '',
        address: '',
      },

    }
  },
  methods: {
    birth(e)
    {
      console.log(e)
    },
    enviarData()
    {
      this.dataVerificado = 1;
      var that = this
      HTTP.post('/user/data',this.formData)
        .then(function (response){
         //Getting data from response
         that.$store.dispatch('auth/me')
              .then(response => {
                console.log(response)
              })
              .catch(error => {
                console.log(error)
                that.router.push('/')

              })
         that.$buefy.toast.open({
      message: 'Se ha guardado tu informacion correctamente',
      type: 'is-success'
  })
  console.log(response)
  that.dataVerificado = 1;
        })
        .catch( function (error){
          // Describe error!
          console.log(error)
        });
    }
  },
  created()
  {

  },
  computed: {
    ...mapState('auth', {
     user: 'user'
   }),

  }
}
</script>

<style lang="css" scoped>
.usuario--username{
  display:flex;
  border-bottom: 1px solid gray;
}
.usuario--estadisitcas ul {
  display: flex;
  justify-content: space-around;

}
.usuario--estadisitcas ul li{
text-align: center;
width: 50%;
margin: 10px;

}
@media (max-width: 660px){
  .usuario--estadisitcas ul {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .usuario--estadisitcas ul li{
  text-align: center;
  width: 50%;
  margin: 10px;

  }
}
.box div{
  margin-top: 20px;
}
</style>
