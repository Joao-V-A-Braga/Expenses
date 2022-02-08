<template>
  <div>Meses</div>
</template>

<script>
export default {
  mounted: function () {
    this.$emit("State", {
      title: "",
      ifUser: true,
    });

    this.$emit("getRemaining", {
      stat: false,
    });
  },
};
</script>

<style>
</style>