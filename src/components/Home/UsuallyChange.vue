<template >



  <div class="column">
    <Search></Search>
    <div class="columns custom-columns">

      <div class="column is-8">
        <div class="box " style="background-color: #f7f8fc">
           <button class="button is-info is-pulled-right">Ir al Cambio</button>

          <h3 class="subtitle is-4">Paypal a Bolivares</h3>
          <p class="subtitle is-5"> <span class="has-text-danger	">200.00</span>$</p>
          <div class="is-pulled-right">
            <p>Moncadaluisd</p>
          </div>
          <p class="subtitle is-6">Compro al mejor precio</p>

        </div>
        <div class="box " style="background-color: #f7f8fc">
           <button class="button is-info is-pulled-right">Ir al Cambio</button>

          <h3 class="title is-4">Paypal a Bolivares</h3>
          <p class="title is-5"> <span class="has-text-danger	">200.00</span>$</p>
          <div class="is-pulled-right">
            <p>Moncadaluisd</p>
          </div>
          <p class="subtitle is-6">Compro al mejor precio</p>

        </div>
        <div class="box " style="background-color: #f7f8fc">
           <button class="button is-info is-pulled-right">Ir al Cambio</button>

          <h3 class="title is-4">Paypal a Bolivares</h3>
          <p class="title is-5"> <span class="has-text-danger	">200.00</span>$</p>
          <div class="is-pulled-right">
            <p>Moncadaluisd</p>
          </div>
          <p class="subtitle is-6">Compro al mejor precio</p>

        </div>
      </div>


      <div class="column is-4">
        <div class="box">
          <div class="">

        </div>
      </div>
    </div>





    </div>
  </div>

</template>

<script>
import Search from '@/components/Home/Search'
export default {
  components: {
    Search
  },
  data(){
    return{
      data: [],

    }
  },

}
</script>

<style lang="css" scoped>

  .custom-columns {
    display: flex;
    flex-wrap: wrap
  }

</style>
