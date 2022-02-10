<template>
  <div class="Login">
      <LogIn />
  </div>
</template>

<script>
import LogIn from '@/utils/homeUtils/LogIn.vue'
export default {
    components: {
		LogIn
	},
    data: () => ({
      
    }),
    mounted: function(){
      this.$emit("State", {
      title: `Login`,
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
  .Login{
    margin-top: 30px;
  }
</style>