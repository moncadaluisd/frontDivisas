<template>
  <div class="column is-7">
    <div class="is-danger left-border"  style="background-color: rgba(75, 135, 236, 0.62);margin-bottom: 20px;padding: 10px;color:white">
        <h2 class="subtitle is-4">Chat con <b>Moncadaluisd</b></h2>
    </div>
    <div class="" style="height: 54vh;overflow-y: scroll;padding: 10px;">
      <div class="box"  style="padding-bottom: 3.5rem;">
          <div class="columns" style="margin-bottom: 0">
            <div class="column is-2">
                  <figure class="image is-50x50" style="">
                    <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" style="max-width: 50px">
                  </figure>

            </div>
            <div class="column is-10">
              <p style="font-size: 14px;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
          <div class="is-pulled-right" style="margin-bottom: 10px">
            <small>19 de junio del 2020</small>
            <p>Moncadaluisd</p>

          </div>
      </div>

      <div class="box"  style="padding-bottom: 3.5rem;">
          <div class="columns" style="margin-bottom: 0">
            <div class="column is-2">
                  <figure class="image is-50x50" style="">
                    <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" style="max-width: 50px">
                  </figure>

            </div>
            <div class="column is-10">
              <p style="font-size: 14px;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, </p>
            </div>
          </div>
          <div class="is-pulled-right" style="margin-bottom: 10px">
            <small>19 de junio del 2020</small>
            <p>Moncadaluisd</p>

          </div>
      </div>

      <div class="box"  style="padding-bottom: 3.5rem;">
          <div class="columns" style="margin-bottom: 0">
            <div class="column is-2">
                  <figure class="image is-50x50" style="">
                    <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" style="max-width: 50px">
                  </figure>

            </div>
            <div class="column is-10">
              <p style="font-size: 14px;">ok </p>
            </div>
          </div>
          <div class="is-pulled-right" style="margin-bottom: 10px">
            <small>19 de junio del 2020</small>
            <p>Moncadaluisd</p>

          </div>
      </div>
    </div>
    <div class="" style="padding: 15px">
      <b-field>
    <b-input type="textarea"
        minlength="10"
        maxlength="400"
        placeholder="Maxlength automatically counts characters">
    </b-input>
</b-field>

   <button class="button is-success is-pulled-right">Entrar</button>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return{
      messages: [],
      user: []
    }
  },
  methods:{

  },
  computed:{

  }
}
</script>

<style scoped>
.left-border{
border-left: 5px solid rgba(75, 130, 236, 1);
}
</style>
