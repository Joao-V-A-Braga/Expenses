<template>
  <div class="content">
    <h2>{{ title }}</h2>
    <div class="contentMain">
      <Home />
    </div>
  </div>
</template>

<script>
import Home from "@/pages/Home.vue";

export default {
  components: {
    Home,
  },
  props: {
    title: String,
  },
};
</script>

<style>
.content {
  grid-area: content;
  background-color: whitesmoke;
  height: 80vh;
}
.content .contentMain {
    display: flex;
    justify-content: center;
  padding: 20px;
}
h2 {
    padding-left:30px;
    padding-top:30px;
  margin-bottom: 20px;
}
</style>