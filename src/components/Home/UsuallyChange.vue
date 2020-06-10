<template >



  <div class="column">
    <Search></Search>
    <div class="columns custom-columns">

      <div class="column is-8">
        <div class="is-danger left-border"  style="background-color: rgba(236, 167, 75, 0.62);margin-bottom: 20px;padding: 10px;boder-bo">
            <h2 class="subtitle is-4">Transacciones activas</h2>
        </div>
        <div class="box" v-if="animated">
              <b-skeleton width="20%" :animated="animated"></b-skeleton>

            <b-skeleton width="40%" :animated="animated"></b-skeleton>

            <b-skeleton width="80%" :animated="animated"></b-skeleton>

            <b-skeleton :animated="animated"></b-skeleton>
        </div>

        <div class="box" v-if="animated">
              <b-skeleton width="20%" :animated="animated"></b-skeleton>

            <b-skeleton width="40%" :animated="animated"></b-skeleton>

            <b-skeleton width="80%" :animated="animated"></b-skeleton>

            <b-skeleton :animated="animated"></b-skeleton>
        </div>

        <div class="box" v-if="animated">
              <b-skeleton width="20%" :animated="animated"></b-skeleton>

            <b-skeleton width="40%" :animated="animated"></b-skeleton>

            <b-skeleton width="80%" :animated="animated"></b-skeleton>

            <b-skeleton :animated="animated"></b-skeleton>
        </div>
        <div class="box " style="background-color: #f7f8fc" v-for="da in data"  :key="da.id">
           <button class="button is-info is-pulled-right" @click.prevent="goToChat(da.id)">Ir al Cambio</button>

            <h3 class="title is-5"> <b-tooltip :label="da.announcement.currency_from.name">{{ da.announcement.currency_from.iso }}  </b-tooltip> a <b-tooltip :label="da.announcement.currency_to.name">{{ da.announcement.currency_to.iso }}</b-tooltip></h3>
          <p class="subtitle is-5"> <span class="has-text-danger	">{{ da.amount | currency }}</span></p>
          <div class="is-pulled-right">
            <p>{{ da.announcement.user.username }}</p>
          </div>
          <p class="subtitle is-6">{{ da.announcement.title }}</p>

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
import Search from './Search'
export default {
  components: {
    Search
  },
  data(){
    return{
      animated: true,
      data: []

    }
  },
  methods: {
    getData(){
     var that = this
      this.$store.dispatch('requests/getRequest')
      .then(function(response){
        that.data = response
          that.animated  =false

      })
      .catch(function(error){
        this.$buefy.toast.open({
  duration: 5000,
  message: error,
  position: 'is-bottom',
  type: 'is-danger'
  })
      })


    },
    goToChat(id){
      this.$router.push({ path: 'chat/'+ id})
      this.$router.go({ path: 'chat/'+ id})
    }
  },
  computed:{

  },
  mounted(){
    this.getData()
  }

}
</script>

<style lang="css" scoped>

  .custom-columns {
    display: flex;
    flex-wrap: wrap
  }
  .left-border{
    border-left: 5px solid rgba(236, 167, 75, 1);
  }
</style>
