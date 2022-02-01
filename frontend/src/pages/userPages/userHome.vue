<template>
  <div class="userHome"></div>
</template>

<script>
export default {
  data: () => ({
    user: {},
  }),
  mounted: function () {
    this.user = this.$route.params.user;

    this.$emit("State", {
      title: `Olá ${this.user.name}!`,
      ifUser: true,
    });
  },
};
</script>

<style>
</style>