<template>
  <div class="container is-fluid mt-20">

    <div class="columns">
      <User></User>
      <General></General>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import User from '@/components/Home/User.vue'
import General from '@/components/Perfil/General.vue'

export default {
  name: 'Perfil',
  components: {
    User,
    General


  }
}
</script>
<style lang="css">
.mt-20{
  margin-top: 20px;
}


</style>
