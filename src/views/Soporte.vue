<template>
  <div class="container is-fluid mt-20">

    <div class="columns">
      <User></User>
      <Posts></Posts>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import User from '@/components/Home/User.vue'

export default {
  name: 'Soporte',
  components: {
    User,


  }
}
</script>
<style lang="css">
.mt-20{
  margin-top: 20px;
}


</style>
