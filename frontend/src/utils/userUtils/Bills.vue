<template>
    <div class="bill">
      <div class="value">R$ {{ bill.value }}</div>
      <div class="nameAndDate">
        <div class="name">{{ bill.name }}</div>
        <div class="date">{{ getFormatedData(new Date(bill.date)) }}</div>
      </div>
      <div class="check">
        <button v-on:click.prevent="changePaid">
          <input
            type="checkbox"
            v-model="bill.paid"
            :id="index"
            
          />
        </button>
      </div>
      <div class="ifPaid">
          <label v-if="bill.paid" :for="index">
            Pago
        </label>

        <label class="ifNotPaid" v-else :for="index">
            Devendo
        </label>
      </div>
    </div>
</template>

<script>
const axios = require('axios')
export default {
  props: {
    bill: Object,
    index: Number,
    user: Object
  },
  methods: {
    async changePaid() {
      this.$emit("getPaid", { index: this.index, paid: !this.bill.paid })
      const header = {
        headers: {
          Authorization: "bearer " + this.user.token,
          "Content-Type": "application/json",
        },
      };
      await axios.put('http://localhost:3000/expenses/'+this.bill.id, {paid: this.bill.paid}, header).catch(err => console.log(err))
    },
    getFormatedData(date) {
      const meses = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ];
      return (
        date.getDate() + " " + meses[date.getMonth()] + " " + date.getFullYear()
      );
    },
  },
};
</script>

<style>
/* bills */
.bill {
  display: flex;
  width: 100%;
  height: 30px;
  padding-bottom: 10px;
  padding-top: 10px;
  background-color: rgb(245, 245, 245);
  
}
.odd{
  background-color: rgba(0, 0, 0, 0.096);
}
.bill:hover {
  background-color: rgba(0, 0, 0, 0.151);
}
.value {
  display: flex;
  color: black;
  background-color: chartreuse;
  margin-left: 20px;
  width: 260px;
  height: 90%;
  justify-content: center;
  align-items: center;
  border: black solid 1px;
}
.nameAndDate {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 20px;
  width: 30%;
}
.date {
  color: rgb(88, 86, 86);
  font-size: 0.7em;
}
.check {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 20px;
}
.ifPaid{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 180px;
  color: rgb(133, 194, 41);
}
.ifNotPaid{
    color: crimson;
}
</style>