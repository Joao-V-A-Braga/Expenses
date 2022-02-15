<template>
  <div class="CadastreExpense">
    <h4>Cadastrar Despesa</h4>
    <div class="invalid" :v-if="msg">
      <i v-if="msg" class="fa fa-exclamation-triangle"></i> {{ msg }}
    </div>
    <form>
      <label for="title">Título:</label>
      <input
        v-model="title"
        placeholder="Digite o título da despesa..."
        type="text"
      />

      <br /><br /><label for="valor">Valor:</label>
      <input
        v-model="value"
        placeholder="Digite o valor da despesa..."
        type="number"
      />

      <br /><br /><label for="date">Data:</label>
      <input v-model="date" type="date" />
      <br />

      <div class="pay">
        <label for="pay">Pagou?</label>
        <input v-model="paid" type="checkbox" />
        <span v-if="paid"> - Sim</span> <span v-else> - Não</span>
      </div>

      <div class="button">
        <button v-on:click.prevent="submit()">Cadastrar</button>
        <button v-on:click.prevent="reset()" class="reset" type="reset">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  data: () => ({
    title: "",
    value: "",
    date: "",
    user: {},
    months: [],
    header: {},
    paid: false,
    msg: "",
  }),
  mounted: function () {
    this.user = this.$route.params.user;

    this.$emit("State", {
      title: "Adicionar Despesa:",
      ifUser: true,
    });
    this.$emit("getRemaining", {
      stat: false,
    });
  },
  methods: {
    reset() {
      this.$router.push({
        name: "UserHome",
        params: {
          user: this.user,
        },
      });
    },
    submit: async function () {
      this.header = {
        headers: {
          Authorization: "bearer " + this.user.token,
          "Content-Type": "application/json",
        },
      };

      this.date =
        this.date[this.date.length - 2] == "0"
          ? this.date.slice(0, this.date.length - 2) +
            this.date.slice(this.date.length - 1)
          : this.date;

      this.getMonths();

      const matched = this.months.filter(
        (month) =>
          month.month == new Date(this.date).getMonth() &&
          month.year == new Date(this.date).getFullYear()
      );

      if (matched.length !== 0) {
        await axios
          .post(
            "http://localhost:3000/expenses",
            {
              userId: this.user.id,
              name: this.title,
              value: this.value,
              paid: this.paid,
              date: new Date(this.date),
              month: new Date(this.date).getMonth(),
              year: new Date(this.date).getFullYear(),
            },
            this.header
          )
          .then((res) => {
            this.$router.push({
              name: "UserHome",
              params: {
                user: this.user,
              },
            });
          })
          .catch((e) => (this.msg = e.response.data));
      } else {
        await this.mountMonth();

        await axios
          .post(
            "http://localhost:3000/expenses",
            {
              userId: this.user.id,
              name: this.title,
              value: this.value,
              paid: this.paid,
              date: new Date(this.date),
              month: new Date(this.date).getMonth(),
              year: new Date(this.date).getFullYear(),
            },
            this.header
          )
          .then((res) => {
            this.$router.push({
              name: "UserHome",
              params: {
                user: this.user,
              },
            });
          })
          .catch((e) => (this.msg = e.response.data));
      }
    },
    async getMonths() {
      await axios
        .get("http://localhost:3000/months/" + this.user.id, this.header)
        .then(async (res) => {
          this.months = res.data;
        });
    },
    async mountMonth() {
      const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];
      const body = {
        name: months[new Date(this.date).getMonth()],
        userId: this.user.id,
        year: new Date(this.date).getFullYear(),
        month: new Date(this.date).getMonth(),
        monthIncome: 0,
      };
      await axios
        .post("http://localhost:3000/months", body, this.header)
        .then((res) => res.status(201).send())
        .catch((e) => console.log("ERR: a hora de publi"));
    },
  },
};
</script>

<style scoped>
h4 {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
.CadastreExpense input {
  margin-left: 10px;
}
.CadastreExpense {
  border: solid white;
  color: white;
  background: linear-gradient(to right, #161f29, #161f29);
  padding: 30px;
  margin: 20px;
  overflow: hidden;
  padding-top: 10px;
  padding-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  border-radius: 15px;
}

.CadastreExpense button {
  margin-top: 10px;
  width: 100px;
  height: 30px;
  font-size: 11px;
  font-weight: 500;
  color: #000;
  background-color: rgb(255, 255, 255);
  border: none;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  align-self: center;
}

.CadastreExpense button:hover {
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  transform: translateY(-4px);
}

.CadastreExpense button:hover {
  box-shadow: 0px 15px 20px rgba(92, 84, 165, 0.589);
  transform: translateY(-2px);
  background-color: rgb(133, 194, 41);
}
.CadastreExpense .reset:hover {
  color: white;
  background-color: rgb(100, 100, 100);
}

.reset {
  margin-left: 10px;
}
.invalid {
  font-family: Helvetica, sans-serif;
  font-size: 0.6em;
  color: rgb(253, 61, 61);
  margin-bottom: 10px;
}
span {
  font-size: 0.8em;
  margin-left: 5px;
}
.pay {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
</style>