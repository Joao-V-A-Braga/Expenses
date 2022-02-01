<template>
  <div>
    <div class="bill">
      <div class="value">R$ {{ bill.value }}</div>
      <div class="nameAndDate">
        <div class="name">{{ bill.billName }}</div>
        <div class="date">{{ getFormatedData(bill.date) }}</div>
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
  </div>
</template>

<script>
export default {
  props: {
    bill: Object,
    index: Number,
  },
  data: () => ({ paid: true }),
  methods: {
    changePaid() {
      this.$emit("getPaid", { index: this.index, paid: !this.bill.paid });
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
  align-items: center;
  width: 100%;
  height: 30px;
  padding: 10px;
}
.bill:hover {
  background-color: rgba(0, 0, 0, 0.151);
}
.value {
  display: flex;
  color: black;
  background-color: chartreuse;
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
  width: 100%;
}
.date {
  color: rgb(88, 86, 86);
  font-size: 0.7em;
}
.check {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 50px;
}
.ifPaid{
    width: 180px;
}
.ifNotPaid{
    width: 90px;
    color: crimson;
}
</style>