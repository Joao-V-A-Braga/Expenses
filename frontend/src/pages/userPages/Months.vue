<template>
  <div class="MonthPage">
    <div class="monthList" v-for="month in months" :key="month.id">
      <button v-on:click.prevent="onClick(month)" :class="month.positiveOrNot">
        {{ month.name }}
        <div class="year">{{ month.year }}</div>
      </button>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  data: () => ({
    user: {},
    months: [],
    header: {},
    billsList: [],
  }),
  methods: {
    getMonths: async function () {
      await axios
        .get("http://localhost:3000/months/" + this.user.id, this.header)
        .then((res) => {
          this.months = res.data.sort((a, b) => {
            console.log(`1/${a.month+1}/${a.year}`,['a'])
            console.log(`1/${b.month+1}/${b.year}`,['b'])
            if (new Date(`1/${a.month+1}/${a.year}`) < new Date(`1/${b.month+1}/${b.year}`)){
              return 1;
            } else {
              return -1;
            }
          });
        });
      this.months = await Promise.all(
        this.months.map( async (value) => {
          await axios
            .post(
              "http://localhost:3000/expenses/" + this.user.id,
              { month: value.month, year: value.year},
              this.header
            )
            .then((res) => {
              this.billsList = [...res.data].sort((a, b) =>
                a.id > b.id ? 1 : -1
              );
            })
            .catch((err) => {
              console.log("O esse mês não possui despesas!");
            });
          const sumExp = this.billsList.reduce((a, b) => a +=  b.paid ? b.value : 0, 0);
          console.log('salario:',value.monthIncome, 'soma:',sumExp)
          const positiveOrNot = (value.monthIncome - sumExp) < 0 ? "monthButton red" : 'monthButton'
          return { ...value, positiveOrNot };
        })
        ) 
    },
    onClick(month) {
      this.$router.push({
        name: "Month",
        params: {
          month,
          user: this.user,
        },
      });
    },
  },
  mounted: async function () {
    this.user = this.$route.params.user;
    if(!this.user) this.$router.push({name: 'Login'})
    this.header = {
      headers: {
        Authorization: "bearer " + this.user.token,
        "Content-Type": "application/json",
      },
    };

    await this.getMonths();

    this.$emit("State", {
      title: "Meses",
      ifUser: true,
    });

    this.$emit("getRemaining", {
      stat: false,
    });
  },
};
</script>

<style>
.MonthPage {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}
.monthList .monthButton {
  font-size: 1em;
  color: rgb(29, 138, 1);
  margin: 20px;
  margin-bottom: 10px;
  margin-top: 10px;
  text-align: start;
  width: 100%;
  padding: 10px;
}
.monthList .red {
 color: red;
}
.monthList .monthButton:hover {
  background: linear-gradient(to right, #ddd, whitesmoke);
}
.monthList {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}
</style>