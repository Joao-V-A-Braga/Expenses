<template>
  <div class="userHome">
    <div class="bills">
      <div v-for="(bill, index) in billsList" :key="index">
        <Bills
          :class="index % 2 == 0 ? 'odd' : ''"
          @getPaid="getPaid"
          @getIfDel="getIfDel"
          :index="index"
          :bill="bill"
          :user="user"
        />
      </div>
    </div>
    <CadastreExpenseButton :user="user" />
  </div>
</template>

<script>
import Bills from "@/utils/userUtils/Bills.vue";
import CadastreExpenseButton from "@/utils/userUtils/CadastreExpenseButton.vue";
const axios = require("axios");

export default {
  props:{
    monthlyIncome: String
  },
  data: () => ({
    user: {},
    billsList: [],
    valueSumExpanses: 0,
    header: {},
    month: {}
  }),
  components: {
    Bills,
    CadastreExpenseButton,
  },
  methods: {
    getIfDel(obj){
      this.billsList = this.billsList.filter((item, index) => index !== obj.index)
      this.changeRemaining()
    },
    getPaid(obj) {
      this.billsList[obj.index].paid = obj.paid;
      this.changeRemaining()
    },
    async mountMonth(){
      const months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho', 'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
      const body = {
        name: months[(new Date().getMonth())],
        userId: this.user.id,
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        monthIncome: 0,
      }
      await axios.post("http://localhost:3000/months", body, this.header)
      .then(res=> res.status(201))
      .catch(_ => _)
    },
    async getMonths(){
      await axios
        .get("http://localhost:3000/months/"+this.user.id, this.header)
        .then(async res => {
          this.month = res.data.filter(value => value.month === new Date().getMonth())[0]
            if(!this.month|| this.month.month == undefined){
              await this.mountMonth()
              await this.getMonths()
            }
          })
          
    },
    getExpanses: async function () {
      this.header = {
        headers: {
          Authorization: "bearer " + this.user.token,
          "Content-Type": "application/json",
        },
      }
      await this.getMonths()
      
      await axios
        .post("http://localhost:3000/expenses/"+this.user.id, {month: this.month.month, year: this.month.year}, this.header)
        .then((res) => {
          this.billsList = [...res.data].sort((a,b) => a.id > b.id ? 1 : -1)
        })
        .catch((e) => e);
    },
    changeRemaining: function (){
      this.valueSumExpanses = this.billsList.reduce((current,prev) => {
        if(prev.paid) return (prev.value + current)
          return current
      },0)
      
      const remaining = this.monthlyIncome -this.valueSumExpanses
      this.$emit("getRemaining", {
      value: remaining.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
      stat: true,
      month: this.month
    });
    }
  },
  mounted: async function () {
    this.user = this.$route.params.user;
    if(!this.user) this.$router.push({name: 'Login'})

    await this.getExpanses();

    this.$emit("State", {
      title: `Olá ${this.user.name}!`,
      ifUser: true,
    })
    this.changeRemaining()
  },
  watch: {
    async monthlyIncome(){
      this.month.monthIncome = this.monthlyIncome
      this.changeRemaining()

      await axios.patch("http://localhost:3000/months/"+this.month.id, this.month, this.header)
    },
    valueSumExpanses(){
      this.changeRemaining()
    }
  }
};
</script>

<style>
.userHome {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 10px;
}
.bills {
  overflow-y: scroll;
  width: 100%;
}
/* width */
::-webkit-scrollbar {
  display: none;
}
</style>