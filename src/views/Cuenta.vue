<template>
  <div class="container is-fluid mt-20">

    <div class="columns">
      <User></User>
      <Info></Info>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import User from '@/components/Home/User.vue'
import Info from '@/components/Account/Info.vue'

export default {
  name: 'Perfil',
  components: {
    User,
    Info


  }
}
</script>
<style lang="css">
.mt-20{
  margin-top: 20px;
}


</style>
