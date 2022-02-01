<template>
   <div class="about">
       <h1>Tela explicando sobre a aplicão web.</h1>
   </div>
</template>

<script>
export default {
mounted: function(){
      this.$emit('State', {title: null})
    },
}
</script>

<style>

</style>