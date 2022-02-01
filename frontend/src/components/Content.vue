<template>
  <div class="content">
    <h2 v-if="propTitle">{{propTitle}}</h2>
    <div class="contentMain">
      <router-view @State="onGetState"></router-view>
    </div>
  </div>
</template>

<script>
import router from "@/config/routes.js"

export default {
  router,
  components: {
  },
  data:()=> ({
    propTitle: null
  }),
  methods:{
    onGetState(state){
      this.propTitle = state.title
      this.$emit('ifUser',state.ifUser)
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
  padding-right: 20px;
}
h2 {
    padding-left:30px;
    padding-top:30px;
  margin-bottom: 20px;
}
</style>