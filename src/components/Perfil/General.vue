<template>
  <div class="column is-9">
    <div class="columns">
        <div class="column is-12">
          <div class="usuario">
            <div class="usuario--username">
              <b-icon
                      icon="account"
                      size="is-medium">
                  </b-icon>
                  <h3 class="title is-3">{{ user.username }}</h3>

            </div>
            <div class="usuario--estadisitcas">
              <ul>
                <li class="box"> <b>1 </b> <p>Transacciones en Total</p> </li>
                <li class="box"> <b> 0</b> <p>Transacciones Canceladas</p> </li>
                <li class="box"> <b> 0</b> <p>Transacciones Repotadas</p> </li>
                <li class="box"> <b>1 </b> <p>Transacciones Exitosas</p> </li>


              </ul>
            </div>
          </div>
        </div>

    </div>
    <div class="trasancciones">
      <Comprador> </Comprador>
    </div>

  </div>
</template>

<script>
import Comprador from './Comprador'
import {HTTP} from '@/helpers/apiHost'
export default {
  components: {
    Comprador,
  },
  data(){
    return{
      user: '',

    }
  },
  methods: {

    getUser()
    {
      var that = this
      HTTP.get('/buyer/' + this.$route.params.usuario)
        .then(function (response){
          // Getting Data from response
          that.user = response.data.data

        })
        .catch(function (error){
          console.log(error);
        });
    }
  },
  created(){
    this.getUser();
    console.log(this.$route.params)
  }

}
</script>

<style lang="css" scoped>
.usuario--username{
  display:flex;
  border-bottom: 1px solid gray;
}
.usuario--estadisitcas ul {
  display: flex;
  justify-content: space-around;

}
.usuario--estadisitcas ul li{
text-align: center;
width: 25%;
margin: 10px;

}
@media (max-width: 660px){
  .usuario--estadisitcas ul {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .usuario--estadisitcas ul li{
  text-align: center;
  width: 50%;
  margin: 10px;

  }
}
</style>
