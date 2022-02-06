<template>
   <div class="about">
       <h1>Tela explicando sobre a aplicão web.</h1>
   </div>
</template>

<script>
export default {
mounted: function(){
      this.$emit('State', {title: null})
      this.$emit("getRemaining", {
      value: ((this.monthlyIncome-50).toString().replace('.',',')),
      stat: false
    })
    },
}
</script>

<style>

</style>