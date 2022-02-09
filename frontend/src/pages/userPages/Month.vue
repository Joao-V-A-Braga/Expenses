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
    month: {},
    header: {},
  }),
  components: {
    Bills,
    CadastreExpenseButton,
  },
  methods: {
    getExpanses: async function () {
      
      
      await axios
        .post("http://localhost:3000/expenses/"+this.user.id, {month: this.month.month }, this.header)
        .then((res) => {
          this.billsList = [...res.data].sort((a,b) => new Date(a.date) > new Date(b.date) ? 1 : -1)
        })
        .catch((err) => {
          console.log("O usuário não possui desse mês!");
        });
    },
    changeRemaining: function (){
      const valueSumExpanses = this.billsList.reduce((current,prev) => {
        if(prev.paid) return (prev.value + current)
          return current
      },0)
      const remaining = this.monthlyIncome-valueSumExpanses
      this.$emit("getRemaining", {
      value: remaining.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
      stat: true,
      month: this.month
    });
    },
    getIfDel(obj){
      this.billsList = this.billsList.filter((item, index) => index !== obj.index)
      this.changeRemaining()
    },
    getPaid(obj) {
      this.billsList[obj.index].paid = obj.paid;
      this.changeRemaining()
    },
  },
  mounted: async function () {
    this.user = this.$route.params.user;
    this.month = this.$route.params.month;
    delete this.month.positiveOrNot
    this.header = {
        headers: {
          Authorization: "bearer " + this.user.token,
          "Content-Type": "application/json",
        },
      }
    console.log(this.month)
    
    await this.getExpanses();

    this.$emit("State", {
      title: ` `,
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
  }
};
</script>

<style>
.userHome {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 95%;
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