<template>
  <div>
    <div class="CadastreExpense">
      <h4>Cadastrar Despesa</h4>
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
          type="text"
        />
        <br /><br />
        <div class="button">
          <button v-on:click.prevent="submit()">Cadastrar</button>
          <button v-on:click.prevent="reset()" class="reset" type="reset">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  data: () => ({
    title: "",
    value: "",
    user: {},
  }),
  mounted: function () {
    this.user = this.$route.params.user;
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
      const header = {
        headers: {
          Authorization: "bearer " + this.user.token,
          "Content-Type": "application/json",
        },
      };
      await axios
        .post(
          "http://localhost:3000/expenses",
          {
            userId: this.user.id,
            name: this.title,
            value: Number(this.value),
            paid: false,
            date: new Date(),
          },
          header
        )
        .catch((msg) => console.log(msg));

      this.$router.push({
        name: "UserHome",
        params: {
          user: this.user,
        },
      });
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
  background: linear-gradient(to right, #3c608b, #22354b);
  padding: 30px;
  margin-bottom: 50px;
  overflow: hidden;
  padding-top: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  border-radius: 15px;
}

.CadastreExpense button {
  margin-top: 20px;
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
</style>