<template>
  <div class="menu">
    <div class="closeMenu">
      <button v-on:click.prevent="closeMenu()" class="angleUp">
        <a><i class="fa fa-angle-left"></i></a>
      </button>
    </div>
    <div class="contentMenu">
      <div class="title">
        <h3>Menu</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeMenu() {
        this.$emit('clicked',true)
      document.getElementById("app").style.gridTemplateAreas =
        '"header header""content content""footer footer"';
      document.getElementsByClassName("menu")[0].style.visibility = "hidden";
      document.getElementsByClassName("menu")[0].style.display = "none";
    },
  },
};
</script>

<style>
.menu {
  display: grid;
  align-items: flex-start;
  height: 90vh;
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
}

h3 {
  font-size: 1em;
  margin-bottom: 20px;
  margin-top: 20px;
  padding-left: 10px;
}
.title {
  background: linear-gradient(to right, #060a0f, #151c24);
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