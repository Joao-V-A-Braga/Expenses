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
    });
    },
    methods:{
      
    }
}
</script>

<style scoped>
  
</style>