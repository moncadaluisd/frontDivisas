<template>
  <div id="app">
    <router-view/>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from '@/layouts/footer'
import {mapActions} from 'vuex'
export default {
  data(){
    return{
      logueado: false
    }
  },
  components: {

    Footer
  },
  methods:{
    ...mapActions('auth', ['me'])
  },
  created()
  {

      this.me();


  }
}
</script>
<style>

.box {
box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2)!important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f6f6f6;
  padding: 10px;
}



#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.logo img{
  width: 120px;
  height: 100px;
}

.textarea:not([rows]) {
    max-height: 120px!important;
    min-height: 80px!important;
}

</style>
