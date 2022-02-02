<template>
  <div class="menuHomeOptions">
      <h4>Opções</h4>
      <Option optionTitle = 'Home' nameComponentPage = "Home"/>
      <Option optionTitle = 'Login' nameComponentPage = "Login"/>
      <Option optionTitle = 'Sobre' nameComponentPage = "About"/>
  </div>
</template>

<script>
import Option from '@/utils/Option.vue'
export default {
  components:{
    Option
  }
}
</script>

<style>
  .menuHomeOptions{
    width:100%;
    height:100%;
  }
  h4{
    padding-left: 10px;
    margin-bottom: 20px;
  }
</style>