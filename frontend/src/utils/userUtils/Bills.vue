<template>
  <div class="bill">
    <div class="value">{{ valueToReal(bill.value) }}</div>
    <div class="nameAndDate">
      <div class="name">{{ bill.name }}</div>
      <div class="date">{{ getFormatedData(new Date(bill.date)) }}</div>
    </div>
    <div class="check">
      <button v-on:click.prevent="changePaid">
        <input v-if="!notActive"  type="checkbox" v-model="bill.paid" :id="index" />
      </button>
    </div>
    <div class="ifPaid">
      <label  v-if="bill.paid" :for="index">
        Pago <i class="fa fa-check"></i>
      </label>

      <label class="ifNotPaid" v-else :for="index">
        Devendo <i class="fa fa-exclamation-triangle"></i>
      </label>
    </div>
    <div class="delete">
      <button v-if="!notActive" v-on:click.prevent="del()">
        <i class="fas fa-eraser"></i>
      </button>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  props: {
    bill: Object,
    index: Number,
    user: Object,
    notActive: Boolean
  },

  methods: {
    async del() {
      if(this.notActive) return
      const header = {
        headers: {
          Authorization: "bearer " + this.user.token,
          "Content-Type": "application/json",
        },
      };
      this.$emit("getIfDel", { index: this.index });
      await axios
        .delete("http://localhost:3000/expenses/" + this.bill.id, header)
        .catch((err) => console.log(err));
    },
    async changePaid() {
      if(this.notActive) return
      this.$emit("getPaid", { index: this.index, paid: !this.bill.paid });
      const header = {
        headers: {
          Authorization: "bearer " + this.user.token,
          "Content-Type": "application/json",
        },
      };
      await axios
        .put(
          "http://localhost:3000/expenses/" + this.bill.id,
          { paid: this.bill.paid },
          header
        )
        .catch((err) => console.log(err));
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
      ]
      return (
        date.getDate() + " " + meses[date.getMonth()] + " " + date.getFullYear()
      );
    },
    valueToReal(value){
      let newValue = value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
      return newValue
    }
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
  padding-bottom: 10px;
  margin-bottom: 5px;
  padding-top: 10px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
}
.odd {
  background-color: rgba(0, 0, 0, 0.096);
}
.bill:hover {
  background-color: rgba(0, 0, 0, 0.151);
}
.value {
  display: flex;
  color: whitesmoke;
    background-color: rgb(31, 63, 63); 
  margin-left: 20px;
  width: 200px;
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
  justify-content: flex-end;
  padding-right: 20px;
}
.ifPaid {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 180px;
  color: rgb(104, 153, 30);
}
.ifNotPaid {
  color: black;
}
.ifNotPaid i {
  font-size: 0.8em;
}

.delete {
  margin-right: 10px;
  margin-left: 50px;
}
.delete button {
  color: crimson;
  font-size: 1em;
}
.delete button:hover {
  color: rgb(200, 30, 30);
}
</style>