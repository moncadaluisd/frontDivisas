<template >
  <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Agrega Un Pago</p>
                </header>
                <section class="modal-card-body">


                  <b-field label="Monto a enviar">
                    <b-numberinput :controls="false" step="0.01" v-model="form.amount"></b-numberinput>
                  </b-field>


                  <b-field class="file">
                    <b-upload v-model="form.img" @input="getImage($event)">
                        <a class="button is-primary">
                            <b-icon icon="upload"></b-icon>
                            <span>Sube la foto de tu transaccion</span>
                        </a>
                    </b-upload>
                    <span class="file-name" v-if="form.img">
                        {{ form.img.name }}

                    </span>
                </b-field>
                <img :src="form.upload" alt="">
  <button class="button is-primary" @click.prevent="sendPost">Guardar</button>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$parent.close()">Close</button>

                </footer>
            </div>
</template>

<script>
import {HTTP} from '@/helpers/apiHost'
export default {
  data(){
    return{
      form: {
        amount: 0.00,
        upload: null,
        img: null
      }
    }
  },
  computed: {
  },
  methods: {
    sendPost()
    {
      HTTP.post('/buyer/payments',this.form)
        .then(function (response){
         //Getting data from response
         console.log(response)
        })
        .catch( function (error){
          // Describe error!
          console.log(error)
        });
    },
    getImage(a)
    {
      const image = a
      const reader = new FileReader();
       reader.readAsDataURL(image);
       reader.onload = e =>{
           this.form.upload = e.target.result;

       };


    }


  },


}
</script>

<style lang="css" scoped>
</style>
