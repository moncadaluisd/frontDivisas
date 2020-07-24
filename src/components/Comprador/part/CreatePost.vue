<template >
  <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Crear nuevo posts</p>
                </header>
                <section class="modal-card-body">
                  <b-notification
                  v-if="validationErrors"
         type="is-danger"
         aria-close-label="Close notification"
         role="alert">
         <ul class="alert alert-danger">
             <li v-for="(value,index) in validationErrors" :key="index">@{{ value }}</li>
         </ul>
     </b-notification>


                  <div class="" style="margin-bottom: 10px;">
                    <div class="columns">

                          <div class="column">

                            <b-field label="Compro">
                              <b-autocomplete

                                  placeholder="Paypal, zelle..."
                                  :keep-first="keepFirst"
                                  :open-on-focus="openOnFocus"
                                  :data="fromToObj"
                                  field="name"
                                  @select="option => form.id_currency_from = option.id">
                              </b-autocomplete>
                          </b-field>
                          </div>
                          <div class="column">

                            <b-field label="Por">
                              <b-autocomplete

                                  placeholder="Zelle, Bolivares..."
                                  :keep-first="keepFirst"
                                  :open-on-focus="openOnFocus"
                                  :data="toToObj"
                                  field="name"
                                  @select="option => form.id_currency_to = option.id">
                              </b-autocomplete>
                          </b-field>
                          </div>


                    </div>
                  </div>


                    <b-field label="Titulo del post">
                        <b-input
                            type="text"
                            v-model="form.title"
                            placeholder="Titulo"
                            required>
                        </b-input>
                    </b-field>

                    <div class="columns">
                      <div class="column">
                        <b-field label="Tasa">
                          <b-numberinput :editable="true" v-model="form.price"></b-numberinput>
                        </b-field>
                      </div>

                      <div class="column ">
                        <b-field label="Min">
                          <b-numberinput :editable="true" v-model="form.min"></b-numberinput>
                        </b-field>
                      </div>

                      <div class="column">
                        <b-field label="Max">
                          <b-numberinput :editable="true" v-model="form.max"></b-numberinput>
                        </b-field>
                      </div>

                    </div>

                    <b-field label="Descripcion y Terminos / Condiciones">
                      <b-input maxlength="200" type="textarea" v-model="form.description"></b-input>
                  </b-field>
  <button class="button is-primary" @click.prevent="store">Guardar</button>
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
  name: 'CreatePost',
  data(){
    return{
      category: [],
      data: [],
      errors: '',
      keepFirst: false,
openOnFocus: true,
selected: null,
      form: {
              //
              id_currency_from:'',
              id_currency_to: '',
              id_category:  '',
              title:  '',
              description:  '',
              price:  0,
              min:  0,
              max: 0,
      }
    }
  },
  methods: {
    store()
    {
      if (this.form.id_currency_to === this.form.id_currency_from) {
      return  this.$buefy.toast.open({
                   message: 'No puedes tener dos monedas iguales',
                   type: 'is-danger'
               })
      }
      var that = this
      HTTP.post('/announcement/create',this.form)
        .then(function (response){
         //Getting data from response
         that.$store.dispatch('comprador/addPost',response.data.data)
         that.$buefy.toast.open({
                    message: 'Se ha actualizado correctamente',
                    type: 'is-success'
                })
         that.$parent.close()
        })
        .catch( function (error){
          // Describe error!
          that.$buefy.toast.open({
                     message: error.response.data.message,
                     type: 'is-danger'
                 })
          if (error.response.status == 422){
            that.errors = error.response.data.errors;
     }
        });
    },
    getCurrency()
    {
      var that = this
      HTTP.get('/currency')
        .then(function (response){
          // Getting Data from response
          console.log(response.data.data)
          that.data = response.data.data
        })
        .catch(function (error){
          console.log(error);
        });
    },
    getCategory()
    {
      var that = this
      HTTP.get('/category')
        .then(function (response){
          // Getting Data from response
          console.log(response.data.data)
          that.category = response.data.data
        })
        .catch(function (error){
          console.log(error);
        });
    }

},
created(){
  this.getCurrency();
  this.getCategory();
},
computed: {
           toToObj() {
               return this.data.filter((option) => {
                   return option.id
               })
           },
           fromToObj() {
               return this.data.filter((option) => {
                   return option.id
               })
           },

             validationErrors(){
                 let errors = Object.values(this.errors);
                 errors = errors.flat();
                 return errors;
             }

       },

}
</script>

<style lang="css" scoped>
</style>
