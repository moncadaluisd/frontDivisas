<template>
  <div class="container is-fluid mt-20">

    <div class="columns">
      <User></User>
      <Message></Message>
    </div>
  </div>
</template>

<script>
import User from '@/components/Home/User'
import Message from '@/components/Chat/Message.vue'
export default {
  components: {
    User,
    Message
  }
}
</script>

<style lang="css" scoped>
.mt-20{
  margin-top:20px;
}
</style>
