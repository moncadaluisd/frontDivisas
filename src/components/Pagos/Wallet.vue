<template >
<div class="column is-3">
  <div class="is-danger left-border"  style="background-color: rgba(75, 236, 116, 0.62);margin-bottom: 20px;padding: 10px;boder-bo">
      <h2 class="subtitle is-4">Billetera</h2>
  </div>
  <div class="box">
      <div class="Wallet" style="text-align:center;">
          <h3 class="title is-4">{{wallet | currency}} <b-icon
                icon="wallet-giftcard"
                size="is-medium">
            </b-icon></h3>
      </div>
      <div class="" style="text-align:center;margin-top: 20px">
        <button  name="button" class="button is-info" @click="isComponentModalActive = true" >Agregar un Pago</button>
      </div>
  </div>
  <b-modal :active.sync="isComponentModalActive"
  has-modal-card full-screen :can-cancel="false">
  <crear-pago></crear-pago>
</b-modal>
</div>
</template>

<script>
import {HTTP} from '@/helpers/apiHost'
import CrearPago from './CrearPago'
export default {
  components: {
    'crear-pago': CrearPago
  },
  data()
  {
    return{
      wallet: '',
      isComponentModalActive: false
    }
  },
  methods: {
    getWallet()
    {
      var that = this
      HTTP.get('/buyer/payments/wallet')
        .then(function (response){
          // Getting Data from response
          console.log(response)
          that.wallet = response.data.data.wallet
        })
        .catch(function (error){
          console.log(error);
        });
    }
  },
  computed: {
  },
  created()
  {
    this.getWallet();
  }

}
</script>

<style lang="css" scoped>
</style>
