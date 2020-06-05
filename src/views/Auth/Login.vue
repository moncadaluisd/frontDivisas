<template>
  <div class="container is-fluid" style="margin-top: 100px">
    <div class="columns">
      <div class="column is-two-thirds">
          <img src="img/bg/imgLogin.png" alt="">
      </div>
      <div class="column">
        <LoginForm></LoginForm>
      </div>
    </div>
</div>
</template>

<script>
import LoginForm from '@/components/Auth/LoginForm.vue'
export default {
  name: 'Login',
  components: {
    LoginForm
  }
}
</script>

<style lang="css" scoped>

</style>
