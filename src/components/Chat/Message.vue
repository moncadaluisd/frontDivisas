<template>
  <div class="column is-9 box" style="margin-top: 0.75rem">

    <div class="is-danger" style="border-bottom: 1px solid #f6f6f6;padding-bottom: 10px;">
        <h2 class="subtitle is-4">Chat </h2>



    </div>
    <div class="columns">
        <div class="column is-8" style="border-right: 1px solid #f6f6f6;margin-top: 10px;">
          <div class="mensajes">
            <ol class="chat" v-chat-scroll>

    <li v-for="message in request.message"  :key="message.id" :class="message.id_user === username.id ? 'self': 'other'">
        <div class="avatar"><img src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div>
      <div class="msg">
        <p>{{ message.message }}</p>

        <time>20:17</time>
      </div>
    </li>


    </ol>
          </div>
          <div class="Escribir" v-if="request.state == 1">
            <b-field label="">
                <b-input maxlength="400" type="textarea" v-model="form.message"></b-input>
            </b-field>
            <div class="" style="display:flex; justify-content: flex-start">
                <button type="button" class="button is-success" name="button" style="margin-right: 10px;" @click="sendMessage()">Enviar</button>
                <b-field class="file">
    <b-upload v-model="form.file"  @input="getImage($event)">
        <a class="button is-info">
            <b-icon icon="upload"></b-icon>
            <span>Subir Foto</span>
        </a>
    </b-upload>
    <span class="file-name" v-if="form.file">
        {{ form.file.name }}
    </span>
</b-field>
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="image">

              <figure class="image is-128x128" style="text-align: center;margin: auto">
                <img class="is-rounded" src="/img/logo-divisastogo-color.png">
              </figure>
              <div class="title is-6" style="text-align:center">
                <b>Comprador: </b>
              {{ userComprador }} <b-icon
                icon="account"
                size="is-small">
            </b-icon>
            <br>
            <hr>
            <b>Vendedor: </b>
          {{ userVendedor }} <b-icon
            icon="account"
            size="is-small">
        </b-icon>

              </div>
              <div class="" style="border-bottom: 1px solid #f6f6f6;padding-bottom: 10px;text-align:center">
                <b>Monto: </b> <br> {{ request.amount | currency }} USD
              </div>
              <div class="" style="border-bottom: 1px solid #f6f6f6;padding-bottom: 10px;text-align:center;margin-top: 10px">
                <b>A pagar: </b> <br>{{ aPagar | currency }} VES
              </div>
          </div>
          <div class="" v-if="request.state === 1 && terminado == 0">


          <div class="" style="border-bottom: 1px solid #f6f6f6;padding-bottom: 10px;text-align:center;margin-top: 10px" v-if="request.announcement.user.id === username.id">
            <button type="button" class="button is-danger" name="button" @click="isComponentModalActive = true; mode = 'cancelar'"  >Cancelar Transaccion</button>
          </div>

          <div class="" v-if="request.id_user_issuer === username.id && mostrarTerminar == 0 ">
            <div class="" style="border-bottom: 1px solid #f6f6f6;padding-bottom: 10px;text-align:center;margin-top: 10px" v-if="!terminarEmisor">
              <button type="button" class="button is-success" name="button" @click="isComponentModalActive2 = true">Terminar transaccion</button>
            </div>

            <div class="" style="border-bottom: 1px solid #f6f6f6;padding-bottom: 10px;text-align:center;margin-top: 10px" v-else>
              <button type="button" class="button is-success" name="button" disabled>Terminar transaccion</button>
            </div>
          </div>

          <div class="" v-if="request.announcement.user.id === username.id && mostrarTerminar == 0 " >
            <div class="" style="border-bottom: 1px solid #f6f6f6;padding-bottom: 10px;text-align:center;margin-top: 10px" v-if="!terminarReceptor">
              <button type="button" class="button is-success" name="button" @click="isComponentModalActive2 = true">Terminar transaccion</button>
            </div>

            <div class="" style="border-bottom: 1px solid #f6f6f6;padding-bottom: 10px;text-align:center;margin-top: 10px" v-else>
              <button type="button" class="button is-success" name="button" disabled>Terminar transaccion</button>
            </div>
          </div>



            </div>

            <div class="" style="border-bottom: 1px solid #f6f6f6;padding-bottom: 10px;text-align:center;margin-top: 10px">
              <button type="button" class="button is-warning" name="button" @click="isComponentModalActive = true; mode = 'reportar'">Informar Problema</button>
            </div>
          <div class="" style="border-bottom: 1px solid #f6f6f6;padding-bottom: 10px;text-align:center;margin-top: 10px">
            <button type="button" class="button is-info" name="button" @click="isComponentModalActive = true; mode = 'informar'">Ver informacion</button>
          </div>




        </div>
    </div>
    <b-modal :active.sync="isComponentModalActive"
                has-modal-card
                trap-focus
                :width="640"
                :destroy-on-hide="false"
                aria-role="dialog"
                aria-modal>
           <Informacion :info="request.announcement" :amount="request.amount" :mode="mode"></Informacion>
       </b-modal>
       <b-modal :active.sync="isComponentModalActive2"
                   has-modal-card
                   trap-focus
                   :destroy-on-hide="false"
                   aria-role="dialog"
                   aria-modal>
              <Terminar :request="request" :username="username" @verificar="getData($event)"></Terminar>
          </b-modal>
</div>
</template>

<script>
import {HTTP} from '@/helpers/apiHost'
import Informacion from './Informacion'
import Terminar from './Part/Terminar'
export default {
  components: {
  Informacion,
  Terminar
  },
  data(){
    return{
      mode: '',
      messages: [],
      isComponentModalActive: false,
      isComponentModalActive2: false,
      user: {},
      request: {},
      form: {
        id_request: '',
        file: null,
        message: '',
        upload: ''
      },
      mostrarTerminar: 0,
      terminado: 0
    }
  },
  methods:{
    getInfo(){
      var that = this
      that.form.id_request = this.$route.params.id
      HTTP.get('/announcement/message/' + this.$route.params.id)
        .then(function (response){
          // Getting Data from response
          that.request = response.data.data
          console.log(response)

        })
        .catch(function (error){
          console.log(error);
        });
    },
/*    getMensajes()
    {
      axios.get('/user?ID=12345')
        .then(function (response){
          // Getting Data from response
        })
        .catch(function (error){
          console.log(error);
        });
    },*/
    sendMessage()
    {
      var that = this;
      HTTP.post('/announcement/message/create/' + this.$route.params.id, this.form)
        .then(function (response){
         //Getting data from response
         that.form.message = ''
         console.log(response);

        })
        .catch( function (error){
          // Describe error!
          console.log(error.response);
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


    },
    getData(data)
    {
      this.mostrarTerminar = data;
    }


  },
  computed:{
    aPagar()
    {
      return this.request.amount * this.request.price
    },
    username()
    {
      return this.$store.state.auth.user
    },
    userComprador()
    {
      return this.request.announcement.user.username
    },
    userVendedor()
    {
      return this.request.user.username
    },
    terminarEmisor()
    {

    return this.request.user.id === this.username.id && this.request.stateIssuer === 1;

  },

    terminarReceptor()
    {
      console.log(this.request.announcement.user.id === this.username.id);
      return this.request.announcement.user.id === this.username.id && this.request.stateRecipient === 1;
    }



  },
  created()
  {
    this.getInfo();
window.Echo.private('chat.'+this.$route.params.id)
       .listen('AnnouncementMessage', (e) => {
        console.log(e)
          this.request.message.push(e.message);


   });
console.log(window.Echo.options)
  }
}
</script>

<style scoped>
.left-border{
border-left: 5px solid rgba(75, 130, 236, 1);
}
/* M E S S A G E S */

.chat {
    list-style: none;
    background: none;
    margin: 0;
    padding: 0 0 50px 0;
    margin-top: 60px;
    margin-bottom: 10px;
    overflow-y: scroll;
    height: 50vh;
}
.chat li {
    padding: 0.5rem;
    overflow: hidden;
    display: flex;
}
.chat .avatar {
    width: 40px;
    height: 40px;
    position: relative;
    display: block;
    z-index: 2;
    border-radius: 100%;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    -ms-border-radius: 100%;
    background-color: rgba(255,255,255,0.9);
}
.chat .avatar img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    -ms-border-radius: 100%;
    background-color: rgba(255,255,255,0.9);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
.chat .day {
    position: relative;
    display: block;
    text-align: center;
    color: #f6f6f6;
    height: 20px;
    text-shadow: 7px 0px 0px #e5e5e5, 6px 0px 0px #e5e5e5, 5px 0px 0px #e5e5e5, 4px 0px 0px #e5e5e5, 3px 0px 0px #e5e5e5, 2px 0px 0px #e5e5e5, 1px 0px 0px #e5e5e5, 1px 0px 0px #e5e5e5, 0px 0px 0px #e5e5e5, -1px 0px 0px #e5e5e5, -2px 0px 0px #e5e5e5, -3px 0px 0px #e5e5e5, -4px 0px 0px #e5e5e5, -5px 0px 0px #e5e5e5, -6px 0px 0px #e5e5e5, -7px 0px 0px #e5e5e5;
    box-shadow: inset 20px 0px 0px #e5e5e5, inset -20px 0px 0px #e5e5e5, inset 0px -2px 0px #d7d7d7;
    line-height: 38px;
    margin-top: 5px;
    margin-bottom: 20px;
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.other .msg {
    order: 1;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2)!important;
    border: none;
    margin-left: 8px;
    background-color: rgba(156, 199, 135, 1);

}
.other:before {
    content: "";
    position: relative;
    top: 0px;
    right: 0px;
    left: 40px;
    width: 0px;
    height: 0px;
    border: 5px solid #fff;


}

.self {
    justify-content: flex-end;
    align-items: flex-end;
}
.self .msg {
    order: 1;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2)!important;
    border: none;
    margin-right: 8px;

    background-color: rgba(168, 188, 255, 1);
}
.self .avatar {
    order: 2;
}
.self .avatar:after {
    content: "";
    position: relative;
    display: inline-block;
    bottom: 19px;
    right: 0px;
    width: 0px;
    height: 0px;
    border: 5px solid #fff;

}

.msg {
    background: white;
    min-width: 50px;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2)!important;
}
.msg p {
    font-size: 0.8rem;
    margin: 0 0 0.2rem 0;
    color: #f6f6f6;
}
.msg img {
    position: relative;
    display: block;
    width: 450px;
    border-radius: 5px;
    box-shadow: 0px 0px 3px #eee;
    transition: all .4s cubic-bezier(0.565, -0.260, 0.255, 1.410);
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
@media screen and (max-width: 800px) {
    .msg img {
    width: 300px;
}
}
@media screen and (max-width: 550px) {
    .msg img {
    width: 200px;
}
}

.msg time {
    font-size: 0.7rem;
    color: #f6f6f6;
    margin-top: 3px;
    float: right;
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
.msg time:before{
    content:"\f017";
    color: #ddd;
    font-family: FontAwesome;
    display: inline-block;
    margin-right: 4px;
}



@-webikt-keyframes pulse {
  from { opacity: 0; }
  to { opacity: 0.5; }
}

/* Tamaño del scroll */
.chat::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

 /* Estilos barra (thumb) de scroll */
.chat::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

.chat::-webkit-scrollbar-thumb:active {
  background-color: #999999;
}

.chat::-webkit-scrollbar-thumb:hover {
  background: #b3b3b3;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}

 /* Estilos track de scroll */
.chat::-webkit-scrollbar-track {
  background: #e1e1e1;
  border-radius: 4px;
}

.chat::-webkit-scrollbar-track:hover,
.chat::-webkit-scrollbar-track:active {
  background: #d4d4d4;
}


</style>
