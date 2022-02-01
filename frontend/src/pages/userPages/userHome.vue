<template>
  <div class="userHome">
  </div>
</template>

<script>
export default {
    mounted: function (){
            this.$emit('titleRequest',`Olá ${this.$route.params.user.name}!`)
        }
}
</script>

<style>

</style>