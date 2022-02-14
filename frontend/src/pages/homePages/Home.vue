<template>
  <div class="home">
      <Register />
  </div>
</template>

<script>
import Register from '@/utils/homeUtils/Register.vue'

const axios = require('axios')
export default {
    components: {
		Register
	},
    data: () => ({
      usersCount: 0
    }),
    mounted: async function(){

      this.usersCount = await axios.get('http://localhost:3000/stat').then(resp => resp.data.users) 

      this.$emit("State", {
      title: `Somos cerca de ${this.usersCount} usuários, faça também o seu cadastro!!`,
      ifUser: false
    })
    this.$emit("getRemaining", {
      value: ((this.monthlyIncome-50).toString().replace('.',',')),
      stat: false
    });
    },
}
</script>

<style>
  .home{
    margin-top: 10px;
  }
</style>