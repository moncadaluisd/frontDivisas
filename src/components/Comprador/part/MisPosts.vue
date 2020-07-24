<template>
  <div class="column is-12 box" style="margin-top: 0.75rem;">



    <div class="" style="margin-bottom: 50px;">
      <button class="button is-info is-pulled-right" @click.prevent="isComponentModalActive = true">Crear mas Posts</button>
    </div>
    <div class="" v-if="posts.length > 0">
        <div class="box " style="background-color: #f7f8fc" v-for="post in posts"  :key="post.id">
           <button class="button is-info is-pulled-right" @click="editPost(post)">Cambiar Posts</button>

          <h3 class="title is-5"> <b-tooltip :label="post.currency_from.name">{{ post.currency_from.iso }}  </b-tooltip> a <b-tooltip :label="post.currency_to.name">{{ post.currency_to.iso }}</b-tooltip></h3>
          <p class="title is-6">Tasa: <span class="has-text-danger	">{{ post.price }}</span>$</p>
          <p> min: <span class="has-text-danger	">{{ post.min }}</span>  max: <span class="has-text-danger	">{{ post.max }}</span></p>
          <div class="is-pulled-right">
            <p>{{ post.user.username }}</p>
          </div>
          <p class="subtitle is-6">{{ post.title }}</p>

        </div>
  </div>
  <div class="box" v-else>
      <h3 class="title is-3">No hay nada por aqui todavia...</h3>
      <h4 class="subtitle is-4"> Comienza ahora.</h4>
  </div>

  <pagination
    v-if="pagination.last_page > 1"
    :pagination="pagination"
    :offset="5"
    @paginate="getInfo()"
  ></pagination>



      <b-modal :active.sync="isComponentModalActive"
      has-modal-card full-screen :can-cancel="false">
      <CreatePost></CreatePost>
  </b-modal>

  <b-modal :active.sync="isComponentModalActiveEdit"
  has-modal-card full-screen :can-cancel="false">
  <EditPost :info="post"></EditPost>
</b-modal>
  </div>
</template>

<script>
import CreatePost from './CreatePost'
import EditPost from './EditPost'
import {HTTP} from '@/helpers/apiHost'
import Pagination from '@/components/Partials/Pagination'
export default {
  components: {
           CreatePost,
           EditPost,
           Pagination
       },
  data(){
    return{
      isComponentModalActive: false,
      isComponentModalActiveEdit: false,
      animated: true,
      post: {},
      posts: [],
      pagination: {
          current_page: 1
          }
    }
  },
  watch: {
  state: function() {

      this.getInfo();
  }
},
  methods: {

    editPost(post)
    {
      this.post = post
      this.isComponentModalActiveEdit= true
    },
    getInfo()
    {
      var that = this;
      HTTP.get('/buyer/?page=' + this.pagination.current_page)
        .then(function (response){
          // Getting Data from response
          that.posts = response.data.data.data
          that.pagination = response.data.data

          that.animated = false
        })
        .catch(function (error){
          console.log(error);
        });
    }
  },
  created()
  {
    this.getInfo()
  }
}
</script>

<style lang="css" scoped>
</style>
