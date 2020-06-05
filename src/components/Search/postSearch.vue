<template>
  <div class="column">
    <div class="box">
      <Search :info="true"></Search>
    </div>
    <div class="box">
      <div class="box" v-if="animated">
            <b-skeleton width="20%" :animated="animated"></b-skeleton>

          <b-skeleton width="40%" :animated="animated"></b-skeleton>

          <b-skeleton width="80%" :animated="animated"></b-skeleton>

          <b-skeleton :animated="animated"></b-skeleton>
      </div>
      <div class="box " style="background-color: #f7f8fc" v-for="post in posts"  :key="post.id">
         <button class="button is-info is-pulled-right" @click="sendPost(post)">Cambiar Posts</button>

        <h3 class="title is-5"> <b-tooltip :label="post.currency_from.name">{{ post.currency_from.iso }}  </b-tooltip> a <b-tooltip :label="post.currency_to.name">{{ post.currency_to.iso }}</b-tooltip></h3>
        <p class="title is-6">Tasa: <span class="has-text-danger	">{{ post.price | currency }}</span></p>
        <p> min: <span class="has-text-danger	">{{ post.min }}</span>  max: <span class="has-text-danger	">{{ post.max }}</span></p>
        <div class="is-pulled-right">
          <p>{{ post.user.username }}</p>
        </div>
        <p class="subtitle is-6">{{ post.title }}</p>

      </div>
    </div>
    <b-modal :active.sync="isComponentModalActive"
                has-modal-card
                trap-focus
                :width="640"
                :destroy-on-hide="false"
                aria-role="dialog"
                aria-modal>
           <modal-entrar :info="info"></modal-entrar>
       </b-modal>
  </div>
</template>

<script>
import {HTTP} from '@/helpers/apiHost'
import Search from '@/components/Home/Search'
import modalEntrar from '@/components/Search/modalEntrar'
export default {
  components: {
    Search,
    modalEntrar
  },
  data(){
    return{
      posts: [],
      info: {},
      isComponentModalActive: false,
      animated: true
    }
  },
  methods:{
    sendPost(post)
    {
      this.isComponentModalActive= true
      this.info =post
    },
    getQuery()
    {
      var that = this
      HTTP.get('/from/' + this.$route.query.from + '/to/' + this.$route.query.to)
        .then(function (response){
          // Getting Data from respon

          console.log(response.data)
          that.posts = response.data.data.data
          that.animated = false
        })
        .catch(function (error){
          console.log(error);
        });
    }
  },
  created(){
    this.getQuery();

  }
}
</script>

<style lang="css" scoped>
</style>
