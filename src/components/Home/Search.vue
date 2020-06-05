<template >
    <div class="box">
      <div class="columns">
        <div class="column is-10">
          <div class="columns">
            <div class="column">

              <b-field label="Tengo" :type="error.from ? 'is-danger' : ''">
                <b-autocomplete
                    v-model="from"
                    placeholder="Paypal, zelle..."
                    :keep-first="keepFirst"
                    :open-on-focus="openOnFocus"
                    :data="fromToObj"
                    field="name"
                    @select="option => selectedFrom = option.iso">
                </b-autocomplete>
            </b-field>
            </div>
            <div class="column">

              <b-field label="Quiero" :type="error.to? 'is-danger' : ''">
                <b-autocomplete
                    v-model="to"
                    placeholder="Zelle, Bolivares..."
                    :keep-first="keepFirst"
                    :open-on-focus="openOnFocus"
                    :data="toToObj"
                    field="name"
                    @select="option => selectedTo = option.iso">
                </b-autocomplete>
            </b-field>
            </div>
          </div>
        </div>

        <div class="column">
           <button class="button is-info is-pulled-right" @click.prevent="sendSearch">Buscar</button>
        </div>
      </div>
    </div>
</template>

<script>
import {HTTP} from '@/helpers/apiHost'
export default {
  data(){
    return{
      data: [],
      keepFirst: false,
openOnFocus: true,
from: '',
to: '',
selectedFrom: null,
error: {
  from: false,
  to: false
},
selectedTo: null
    }
  },
  methods: {
    whiteSpace: function (a) {
            return a.replace(/ /g,"-");
        },
    getCurrency()
    {
      var that = this
      HTTP.get('/currency')
        .then(function (response){
          // Getting Data from response
          //console.log(response.data.data)
          that.data = response.data.data
        })
        .catch(function (error){
          console.log(error);
        });
    },
    sendSearch()
    {

      if (this.selectedFrom == null) {
          this.error.from = true
      }else if (this.selectedTo == null) {
      this.error.to = true

    }else{
      this.$router.push({path: "/search", query: { from: this.selectedFrom, to: this.selectedTo }})
      this.$router.go({path: "/search", query: { from: this.selectedFrom, to: this.selectedTo }})
    }

    }

},
created(){
  this.getCurrency();

},
computed: {
           toToObj() {
               return this.data.filter((option) => {
                   return option.name
                       .toString()
                       .toLowerCase()
                       .indexOf(this.to.toLowerCase()) >= 0
               })
           },
           fromToObj() {
               return this.data.filter((option) => {
                   return option.name
                       .toString()
                       .toLowerCase()
                       .indexOf(this.from.toLowerCase()) >= 0
               })
           }
       }
}
</script>

<style lang="css" scoped>
</style>
