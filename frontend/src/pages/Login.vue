<template>
  <div class="Login">
      <LogIn />
  </div>
</template>

<script>
import LogIn from '@/utils/LogIn.vue'
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
    });
    },
    methods:{
      
    }
}
</script>

<style scoped>
  
</style>