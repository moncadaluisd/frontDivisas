<template>
  <div class="box " style="background-color: #f7f8fc" v-for="post in posts"  :key="post.id">
     <button class="button is-info is-pulled-right">Cambiar Posts</button>

    <h3 class="title is-5"> <b-tooltip :label="post.currency_from.name">{{ post.currency_from.iso }}  </b-tooltip> a <b-tooltip :label="post.currency_to.name">{{ post.currency_to.iso }}</b-tooltip></h3>
    <p class="title is-6">Tasa: <span class="has-text-danger	">{{ post.price }}</span>$</p>
    <p> min: <span class="has-text-danger	">{{ post.min }}</span>  max: <span class="has-text-danger	">{{ post.max }}</span></p>
    <div class="is-pulled-right">
      <p>{{ post.user.username }}</p>
    </div>
    <p class="subtitle is-6">{{ post.title }}</p>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
