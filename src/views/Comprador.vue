<template>
  <div class="container is-fluid mt-20">

    <div class="columns">
      <User></User>
      <Posts></Posts>
    </div>
  </div>
</template>

<script>
import User from '@/components/Home/User.vue'
import Posts from '@/components/Comprador/Posts.vue'

export default {
  name: 'Comprador',
  components: {
    User,
    Posts
  },
  data()
  {
    return{

    }
  },
  methods:
  {
    getBuyer()
    {
      
      this.$store.dispatch('comprador/showAccess')
           .then(response => {
             console.log(response)
           })

    }
  },
  created(){
    this.getBuyer();
  }

}
</script>

<style lang="css" scoped>
.mt-20{
  margin-top: 20px;
}
</style>
