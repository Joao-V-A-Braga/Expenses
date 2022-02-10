<template>
  <div class="home">
      <Register />
  </div>
</template>

<script>
import Register from '@/utils/homeUtils/Register.vue'
export default {
    components: {
		Register
	},
    data: () => ({
      
    }),
    mounted: function(){
      this.$emit("State", {
      title: `Faça o seu cadastro no nosso site!!`,
      ifUser: false
    })
    this.$emit("getRemaining", {
      value: ((this.monthlyIncome-50).toString().replace('.',',')),
      stat: false
    });
    },
    methods:{
      
    }
}
</script>

<style>
  .home{
    margin-top: 10px;
  }
</style>