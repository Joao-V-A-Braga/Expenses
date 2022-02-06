<template>
  <div class="content">
    <div class="titleAndStat">
      <h2 v-if="title">{{ title }}</h2>
      <div v-if="stat" class="stat">
        <div class="month">
          Fevereiro
        </div>
          <hr>
        <div class="monthlyIncome">
          <label for="monthlyIncome">Saldo do mês</label>
            <span
              >R$
              <input type="number" v-model="monthlyIncome" placeholder="00,00"
            /></span>
        </div>
        <div class="remainingIncome">
          <label for="remainingIncome">Restante</label>
          <div class="valueRemaining">{{ remainingIncome }}</div>
        </div>
      </div>
    </div>
    <div class="contentMain">
      <router-view
        :monthlyIncome="monthlyIncome"
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
    monthlyIncome: "",
    stat: false,
  }),
  methods: {
    onGetState(state) {
      this.title = state.title;
      this.$emit("ifUser", state.ifUser);
    },
    onGetRemaining(obj) {
      this.remainingIncome = obj.value;
      this.stat = obj.stat;
      
      if(Number(this.remainingIncome.replace('R$','').replace(',','.')) >= 0) {
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
  width: 100%;
  overflow-y: auto;
}
.content .contentMain {
  display: flex;
  justify-content: center;
  margin-right: 20px;
  height: 78%;
}
h2 {
  padding-left: 30px;
  padding-top: 30px;
  margin-bottom: 20px;
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