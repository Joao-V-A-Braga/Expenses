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
      title: `Cadastro`,
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

<style scoped>
  
</style>