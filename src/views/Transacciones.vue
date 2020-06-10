<template>
  <div class="container is-fluid mt-20">

    <div class="columns">
      <User></User>
      <div class="column">
        <div class="columns custom-columns">


<activo></activo>



        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import User from '@/components/Home/User.vue'
import Activo from '@/components/Transacciones/Activos'

export default {
  name: 'Transacciones',
  components: {
    User,
    Activo,

  },
  data()
  {
    return{
      animated: true
    }
  }
}
</script>
<style lang="css">
.mt-20{
  margin-top: 20px;
}


</style>
