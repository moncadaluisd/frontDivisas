<template >
  <div class="column is-one-quarter ">
    <div class="box card">
      <div class="image">

          <figure class="image is-128x128" style="text-align: center;margin: auto">
            <img class="is-rounded" src="/img/logo-divisastogo-color.png">
          </figure>
      </div>
      <div class="" style="text-align:center">
       <p>{{ username }}</p>
      </div>
      <div class="mt-20">
        <b-menu class="is-custom-mobile">
                        <b-menu-list label="Menu">

                          <router-link :to="{ name: 'Home' }"><b-menu-item label="Inicio" icon="home-variant" ></b-menu-item></router-link>


                            <b-menu-item icon="account" type="is-primary" label="Mi Cuenta">
                                <b-menu-item icon="account-box" label="Editar Cuenta"  @click="isComponentModalActive = true"></b-menu-item>
                                <b-menu-item icon="home-account" label="Segur Contra Estafa"></b-menu-item>
                                <router-link :to="{ name: 'Perfil' , param: {username: this.username} }"><b-menu-item icon="shield-account" label="Perfil"></b-menu-item></router-link>
                            </b-menu-item>

                            <b-menu-item icon="account-lock-outline" type="is-info" label="Cajero" v-if="comprador || admin">
                            <router-link :to="{ name: 'Comprador' }">    <b-menu-item icon="account-box" label="Panel de compradores"  ></b-menu-item></router-link>
                              <router-link :to="{ name: 'Pagos' }">    <b-menu-item icon="bank-transfer-in" label="Pagos"></b-menu-item></router-link>

                            </b-menu-item>

                        </b-menu-list>
                        <b-menu-list>
                          <b-menu-item label="Notificaciones" icon="bell"></b-menu-item>
                          <router-link :to="{ name: 'Transacciones' }"><b-menu-item label="Transacciones" icon="card-bulleted"></b-menu-item></router-link>
                          <router-link :to="{ name: 'Soporte' }"><b-menu-item label="Soporte" icon="face-agent"></b-menu-item></router-link>
                        </b-menu-list>


                        <b-menu-list label="Actions">
                            <b-menu-item icon="logout" label="Salir de la cuenta" @click.prevent="logout"></b-menu-item>
                        </b-menu-list>
                    </b-menu>
      </div>
    </div>
    <b-modal :active.sync="isComponentModalActive"
    has-modal-card full-screen :can-cancel="false">
    <UserEdit></UserEdit>
</b-modal>
  </div>

</template>

<script>
import UserEdit from './part/UserEdit.vue'
import {mapState} from 'vuex'
export default {
  components: {
           UserEdit
       },
  data(){
    return{
      isComponentModalActive: false,
    }
  },
  methods:{
    logout(){
      var that = this
      this.$store.dispatch('auth/logout')
          .then(() => {
              that.$router.push("/")
          })

    }
  },
  computed: {
    username(){
      return this.$store.state.auth.user.username
    },
    ...mapState('auth', ['comprador', 'admin'])
  }
}
</script>

<style lang="css" scoped>
.mt-20{
  margin-top: 30px;
}
.menu-list a.is-active {
    background-color: #167df0!important;
    color: white;
}
.menu-list li a {
    border-radius: 2px;
    color: #4a4a4a;
    display: block;
    padding: 0.5em 0.75em;
}
.menu-list a {
    border-radius: 2px;
    color: #4a4a4a;
    display: block;
    padding: 0;
}
</style>
