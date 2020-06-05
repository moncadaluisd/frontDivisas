<template >
  <div class="container is-fluid mt-20">

    <div class="columns">
      <User></User>
      <PostSearch></PostSearch>
    </div>
  </div>
</template>

<script>
import User from '@/components/Home/User.vue'
import PostSearch from '@/components/Search/postSearch.vue'
export default {
  components: {
    User,
    PostSearch
  },
  name: 'Search',
  created(){
      console.log( this.$route.query)
  }
}
</script>

<style lang="css" scoped>
</style>
