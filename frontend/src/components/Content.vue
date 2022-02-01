<template>
  <div class="content">
    <h2>{{ propTitle || title }}</h2>
    <div class="contentMain">
      <router-view @titleRequest="onGetTitle"></router-view>
    </div>
  </div>
</template>

<script>
import router from "@/config/routes.js"

export default {
  router,
  components: {
  },
  props: {
    title: String,
  },
  data:()=> ({
    propTitle: null
  }),
  methods:{
    onGetTitle(title){
      this.propTitle = title
    }
  }
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