<template>
  <div class="container is-fluid" style="margin-top: 100px">
    <div class="columns">
      <div class="column is-two-thirds">
          <img src="img/bg/imgLogin.png" alt="">
      </div>
      <div class="column">
        <RegisterForm></RegisterForm>
      </div>
    </div>
</div>
</template>

<script>
import RegisterForm from '@/components/Auth/RegisterForm.vue'
export default {
  name: 'Register',
  components: {
    RegisterForm
  }
}
</script>

<style lang="css" scoped>

</style>
