<template>
  <div class="menu">
    <div class="closeMenu">
      <button v-on:click.prevent="closeMenu()" class="angleUp">
        <a><i class="fa fa-angle-left"></i></a>
      </button>
    </div>
    <div class="contentMenu">
      <MenuUserOptions v-if="ifUser"/>
      <MenuHomeOptions v-else/>
    </div>
  </div>
</template>

<script>

import MenuHomeOptions from '@/utils/menuUtils/MenuHomeOptions.vue'
import MenuUserOptions from '@/utils/menuUtils/MenuUserOptions.vue'
export default {
  components:{
    MenuHomeOptions,
    MenuUserOptions
  },
  props:{
    ifUser: Boolean
  },
  methods: {
    closeMenu() {
        this.$emit('clicked',true)
      document.getElementById("app").style.gridTemplateAreas =
        '"header header""content content""footer footer"';
      document.getElementsByClassName("menu")[0].style.visibility = "hidden";
      document.getElementsByClassName("menu")[0].style.display = "none";
      document.getElementsByClassName("content")[0].style.width = "100vw";
    },
  },
};
</script>

<style>
.menu {
  display: grid;
  align-items: flex-start;
  height: 90vh;
  width: 20vw;
  color: whitesmoke;
  grid-area: menu;
  grid-template-areas:
    "content content content content content content close"
    "content content content content content content close"
    "content content content content content content close"
    "content content content content content content close"
    "content content content content content content close"
    "content content content content content content close"
    "content content content content content content close";
  overflow: hidden;
}
.contentMenu {
  padding-top: 20px;
  grid-area: content;
  background: linear-gradient(to right, #060a0f, #151c24);
  height: 100%;
  zoom:150%;
}


.angleUp {
  color: black;
  border: none;
  width: 100%;
  height: 30px;
}
.closeMenu button:hover {
  cursor: pointer;
  text-align: end;
  background-color: rgba(0, 0, 0, 0.055);
}
.closeMenu {
  background-color: rgba(255, 0, 0, 0);
  display: flex;
  align-items: center;
  height: 80vh;
  grid-area: close;
  background-color: whitesmoke;
}
</style>