<template>
  <div class="option">
    <button v-on:click.prevent="onclick">
      <i :class="icon"></i> {{ optionTitle }}
    </button>
  </div>
</template>

<script>
import router from "@/config/routes.js";

export default {
  router,
  props: {
    nameComponentPage: String,
    optionTitle: String,
    icon: String,
  },
  data: () => ({
    user: false,
  }),
  mounted: function () {
    this.user = this.$route.params.user;
  },
  methods: {
    onclick() {
      if(this.user){
        this.$router.push({
          name: this.nameComponentPage,
          params: {
            user: this.user,
          },
        });
      }else{
        this.$router.push({
          name: this.nameComponentPage,
        });
      }
    },
  },
};
</script>

<style>
.option button {
  color: rgb(163, 162, 162);
  text-align: start;
  width: 100%;
  height: 100%;
  padding-left: 25px;
}
.option {
  display: flex;
  width: 100%;
  height: 30px;
  margin-bottom: 2px;
}
.option:hover {
  background: linear-gradient(to right, #143b0846, #27aa222f, #50fc013d);
}
.option br {
  display: block;
  content: "";
  border-bottom: 1px solid whitesmoke;
  margin-bottom: 1.5em;
}
</style>