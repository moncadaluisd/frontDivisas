<template>
  <div class="container is-fluid mt-20">

    <div class="columns">
      <User></User>
      <Changes></Changes>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import User from '@/components/Home/User.vue'
import Changes from '@/components/Home/UsuallyChange.vue'

export default {
  name: 'Home',
  components: {
    User,
    Changes,


  }
}
</script>
<style lang="css">
.mt-20{
  margin-top: 20px;
}


</style>
