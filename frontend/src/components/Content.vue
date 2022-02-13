<template>
  <div class="content">
    <div class="titleAndStat">
      <div class="title" v-if="title">{{ title }}</div>
      <div v-if="stat" class="stat">
        <div class="month">
          {{this.month.name || 'Mês'}}
        </div>
          <hr>
        <div class="monthlyIncome">
          <label for="monthlyIncome">Saldo do mês</label>
            <span
              >R$
              <input v-on:keyup.prevent="insertIncome" type="number" v-model="monthlyIncome" placeholder="Inserir"/>
              
            </span>
        </div>
        <div class="remainingIncome">
          <label for="remainingIncome">Restante</label>
          <div class="valueRemaining">{{ remainingIncome }}</div>
        </div>
      </div>
    </div>
    <div class="contentMain">
      <router-view
        :monthlyIncome="monthlyIncome || month.monthIncome"
        @getRemaining="onGetRemaining"
        @State="onGetState"
      ></router-view>
    </div>
  </div>
</template>

<script>
import router from "@/config/routes.js";

export default {
  router,
  components: {},
  data: () => ({
    title: null,
    remainingIncome: "0",
    monthlyIncome: '',
    stat: false,
    month: {},
    aux: ''
  }),
  methods: {    
    insertIncome(e){

      this.monthlyIncome = this.monthlyIncome ? this.monthlyIncome : ''

      if(e.which == 8 && !this.monthlyIncome){
        this.monthlyIncome = this.aux.toString().length < 2 ? '0' : this.aux.slice(0,-2)
        this.aux = this.monthlyIncome
      }else{
        this.aux = this.monthlyIncome
      }
    },
    selectAll: function(event) {
            // Workaround for Safari bug
            // http://stackoverflow.com/questions/1269722/selecting-text-on-focus-using-jquery-not-working-in-safari-and-chrome
            setTimeout(function() {
              event.target.select();
            }, 0);
          },
    onGetState(state) {
      this.title = state.title;
      this.$emit("ifUser", state.ifUser);
    },
    onGetRemaining(obj) {
      this.remainingIncome = obj.value || '';
      this.stat = obj.stat || false;
      this.month = obj.month || false
      this.monthlyIncome = this.month && this.month.monthIncome != 0 ? this.month.monthIncome : ''
      if(Number(this.remainingIncome.replace('R$','').replaceAll('.','').replace(',','.')) >= 0) {
        document.getElementsByClassName('valueRemaining')[0].style.color = 'rgb(104, 153, 30)'
        }
      else{
        document.getElementsByClassName('valueRemaining')[0].style.color = 'rgb(255,0,0)'
      }
    },
  }
};
</script>

<style>
.content {
  grid-area: content;
  background-color: whitesmoke;
  height: 80vh;
  width: 80vw;
  overflow-y: auto;
}
.content .contentMain {
  display: flex;
  justify-content: center;
  height: 78%;
  width: 100%;
  zoom:150%;
}
.title {
  font-size: 1.5em;
  margin-left: 5%;
  display: flex;
  align-items: center;
  padding-top: 30px;
  zoom:150%;

}
.titleAndStat {
  display: flex;
  justify-content: space-between;
}
.stat {
  display: flex;
  padding-top: 30px;
  justify-content: start;
  margin-right: 8%;
  zoom:150%;
}
.monthlyIncome {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
  width: 100px;
}
.monthlyIncome span{
  padding-left: 20px;
  width: 100%;
}
.monthlyIncome input {
  width: 70%;
  color: black;
  font-size: 1em;
  background-color: rgba(0, 0, 0, 0);
  border: none;
}
.monthlyIncome textarea:focus,
.monthlyIncome input:focus {
  outline: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}
.remainingIncome {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.valueRemaining {
  width: 100%;
  text-align: center;
}
.month{
  font-size: 1.3em;
  margin-right: 20px;
  display: flex;
  align-items: center;
}
</style>