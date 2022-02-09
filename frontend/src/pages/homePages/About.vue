<template>
   <div class="about">
       <p><span class="space"/>O problema a ser resolvido consiste na dificuldade que as pessoas possuem em organizar seus gastos (contas de casa, compras de produtos, compras em mercados e outros tipos de gastos). As pessoas que sofrem com esses problemas normalmente são adultas de diversos gêneros, que por mais que tentem registrar o uso de seu dinheiro em cadernos, ou semelhantes, muitas vezes elas se perdem, além do registro poder se tornar uma missão cansativa.
   <br/><br/><span class="space"/> Esse problema poderá ser resolvido facilmente, com o nosso site, que registra e organiza os gastos, a partir de um formulário de cadastro de uma compra realizada, onde o usuário preenche com facilidade. Informando qual o valor do sumpto, o título e a data.</p>
   </div>
</template>

<script>
export default {
mounted: function(){
      this.$emit('State', {title: 'Sobre nosso site -'})
      this.$emit("getRemaining", {
      value: ((this.monthlyIncome-50).toString().replace('.',',')),
      stat: false
    })
    },
}
</script>

<style>
    .about{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px;
    }
    p{
        text-align: justify;
    }
    .space{
        margin-left: 1cm;
    }
</style>