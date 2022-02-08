<template>
  <div class="Months">
    <div class="title">Histórico</div>
    <div v-for="(value,valueIndex) in monthsAndBills" :key="valueIndex">
    <div class="monthAndYear"><div class="year">{{value.year}}</div><div class="monthName">{{value.name}}</div> </div>
    <div class="bills">
      <div v-for="(bill, index) in value.bills" :key="index">
        <Bills
          :class="index % 2 == 0 ? 'odd' : ''"
          :index="index"
          :bill="bill"
          :user="user"
          :notActive='true'
        />
      </div>
    </div>


    </div>
  </div>
</template>

<script>
import Bills from "@/utils/userUtils/Bills.vue";
const axios = require("axios");
export default {
  components: {
    Bills,
  },
  data: () => ({
    billsList: [],
    user: {},
    header: {},
    monthsAndBills: {},
    months: []
  }),
  methods: {
    getExpanses: async function () {
      this.header = {
        headers: {
          Authorization: "bearer " + this.user.token,
          "Content-Type": "application/json",
        },
      };
      await axios
        .post("http://localhost:3000/expenses/" + this.user.id,{}, this.header)
        .then((res) => {
          this.billsList = [...res.data].sort((a, b) => (a.id > b.id ? 1 : -1));
        })
        .catch((err) => {
          console.log("O usuário não possui despesas!");
        });
    },
    getMonths: async function (){
      await axios
        .get("http://localhost:3000/months/"+this.user.id, this.header)
        .then(res => {
          this.months = res.data
          })
    },
    mountMonthsAndBills(){
      this.monthsAndBills = this.months.map((month)=>{
        const bills = this.billsList.filter((bill)=> bill.month == month.month)

        return {
          name: month.name,
          monthIncome: month.monthIncome,
          year: month.year,
          bills
        }
      })
    }
  },

  mounted: async function () {
    this.user = this.$route.params.user;
    await this.getExpanses();
    await this.getMonths()
    console.log(this.months)
    console.log(this.billsList)
    this.mountMonthsAndBills()
    console.log(this.monthsAndBills)

    this.$emit("State", {
      title: "",
      ifUser: true,
    });
    
    this.$emit("getRemaining", {
      stat: false,
    });
  },
};
</script>

<style>
.monthAndYear{
  padding: 20px;
  padding-top: 10px;
}
.monthName{
  font-size: 1.2em;
}
.year{
  font-size: .8em;
  color: rgb(90, 90, 90);
}
.Months .title{
    display: flex;
    justify-content: center;
    font-size: 1.5em;
    width: 100%;
}
</style>