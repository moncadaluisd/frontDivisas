<template>
<div class="">
  <div class="" style="margin-bottom: 20px;">
    <router-link :to="{ name: 'Perfil', params: { usuario: username }}">
    <button class="button is-info" name="button">Ver todo</button>
    </router-link>
  </div>
    <Comprador :tipo="1"> </Comprador>
</div>


</template>

<script>
import Comprador from '@/components/Perfil/Comprador'
export default {
  components: {
    Comprador,
  },
  data()
  {
    return{

    }
  },
  methods: {

  }
}
</script>

<style lang="css" scoped>
</style>
