<template>
  <div class="CadastreExpenseButton">
    <button v-on:click.prevent ="onclick" type="submit">Adicionar Despesa</button>
  </div>
</template>

<script>
export default {
    props:{
        user: Object
    },
    methods: {
    onclick() {
        this.$router.push({
                  name: "CadastreExpense",
                  params:{
                      user: this.user
                  }
                })
    },
  },
};
</script>

<style>
.CadastreExpenseButton{
  text-align: center;
  width: 100%;
  background: linear-gradient(to left, #fdfc47, #24fe41); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  margin-bottom: 5px;
}
.CadastreExpenseButton button{
  padding: 10px;
  width: 100%;
  height: 100%;
}
.CadastreExpenseButton button:hover{
  background: linear-gradient(to left, #dfdf3e, #1ed437);
}
</style>