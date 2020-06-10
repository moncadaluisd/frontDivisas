<template>
  <div class="container is-fluid mt-20">

    <div class="columns">
      <User></User>
      <Pagar></Pagar>
      <Wallet></Wallet>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import User from '@/components/Home/User.vue'
import Pagar from '@/components/Pagos/Pagar.vue'
import Wallet from '@/components/Pagos/Wallet.vue'

export default {
  name: 'Pagos',
  components: {
    User,
    Pagar,
    Wallet


  }
}
</script>
<style lang="css">
.mt-20{
  margin-top: 20px;
}


</style>
