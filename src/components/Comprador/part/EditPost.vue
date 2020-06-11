<template >
  <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Editar Post</p>
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
                              <h3 class="title is-4" style="margin-left: 40px;"> {{ currencyFrom.name }}</h3>
                          </b-field>
                          </div>
                          <div class="column">

                            <b-field label="Por">
                                <h3 class="title is-4" style="margin-left: 40px;"> {{ currencyTo.name }}</h3>
                          </b-field>
                          </div>


                    </div>
                  </div>

                  <b-field label="Elige Categoria">
           <b-select placeholder="Selecciona una categoria" v-model="form.id_category" expanded>
             <option value=""> Selecciona una categoria</option>
               <option
                   v-for="da in category"
                   :value="da.id"
                   :key="da.id">
                   {{ da.name }}
               </option>
           </b-select>
       </b-field>

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
    <button class="button is-danger" style="margin-left: 20px;" @click.prevent="destroy">Eliminar</button>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$parent.close()">Close</button>

                </footer>
            </div>
</template>

<script>
import {HTTP} from '@/helpers/apiHost'
export default {
  props: ['info'],
  name: 'EditPost',
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
        id_currency_from: this.info.id_currency_from,
        id_currency_to: this.info.id_currency_to,
        id_category:  this.info.id_category,
        title:  this.info.title,
        description:  this.info.description,
        price:  this.info.price,
        min:  this.info.min,
        max: this.info.max,
}
    }
  },
  methods: {

    store()
    {
      var that = this
      HTTP.put('/announcement/create/' + this.info.id,this.form)
        .then(function (response){
         //Getting data from response
         console.log(response)
         that.$store.dispatch('comprador/showAccess')
         that.$buefy.toast.open({
                    message: 'Se ha actualizado correctamente',
                    type: 'is-success'
                })
         that.$parent.close()
        })
        .catch( function (error){
          // Describe error!
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
    },
    destroy()
    {
      var that = this
      HTTP.delete('/announcement/create/' + this.info.id)
        .then(function (response){
          // Getting Data from response
          console.log(response)
          that.$buefy.toast.open({
                     message: 'Se ha eliminado correctamente',
                     type: 'is-success'
                 })
                 that.$store.dispatch('comprador/showAccess')
          that.$parent.close()
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
             },
             currencyFrom()
             {
               var da = this.data.find(currency => {
                  return currency.id === this.form.id_currency_from
               })
               return da
             },

             currencyTo()
             {
               var da = this.data.find(currency => {
                  return currency.id === this.form.id_currency_to
               })
               return da
             }

       },

}
</script>

<style lang="css" scoped>
</style>
