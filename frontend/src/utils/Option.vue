<template>
  <div class="option">
    <button v-on:click.prevent="onclick">
      {{ optionTitle }}
    </button>
  </div>
</template>

<script>
import router from '@/config/routes.js'

export default {
    router,
  props: {
    nameComponentPage: String,
    optionTitle: String,
  },
  methods: {
    onclick() {
        this.$router.push({
                  name: this.nameComponentPage,
                })
    },
  },
};
</script>

<style>
.option button {
  color: whitesmoke;
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