<template>
  <div class="container is-fluid" style="margin-top: 100px">
    <div class="columns">
      <div class="column is-two-thirds">
          <img src="img/bg/imgLogin.png" alt="">
      </div>
      <div class="column">
        <ResetForm></ResetForm>
      </div>
    </div>
</div>
</template>

<script>
import ResetForm from '@/components/Auth/ResetForm.vue'
export default {
  name: 'ResetPassword',
  components: {
    ResetForm
  }
}
</script>

<style lang="css" scoped>

</style>
