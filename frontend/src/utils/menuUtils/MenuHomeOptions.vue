<template>
  <div class="menuHomeOptions">
      <h4>Opções</h4>
      <Option icon="fas fa-home" optionTitle = 'Home' nameComponentPage = "Home"/>
      <Option icon="fas fa-sign-in-alt" optionTitle = 'Login' nameComponentPage = "Login"/>
      <Option icon="fas fa-info-circle" optionTitle = 'Sobre' nameComponentPage = "About"/>
  </div>
</template>

<script>
import Option from '@/utils/menuUtils/Option.vue'
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