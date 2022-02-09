<template>
  <div class="header">
    <header>
      <div class="contentHeader">
        <span>
          <button v-on:click.prevent="openMenu()">
            <a v-if="toggle"><i class="fa fa-bars"></i></a>
          </button>
        </span>
        <h1>Expenses</h1>
      </div>
    </header>
  </div>
</template>

<script>
 
export default {
  props:{
      toggle: Boolean
  },

  methods: {
    openMenu() {
        this.$emit('clicked',false)
      
      document.getElementById("app").style.gridTemplateAreas =
        '"header header header header header""menu content content content content""menu footer footer footer footer"';
      document.getElementsByClassName("menu")[0].style.visibility = "visible";
      document.getElementsByClassName("menu")[0].style.display = "grid";
      document.getElementsByClassName("content")[0].style.width = "80vw";
    },
  },
};
</script>

<style >
.header {
  background-color: greenyellow;
  grid-area: header;
  height: 10vh;
}
h1 {
  font-size: 1.3em;
  margin-left: 15px;
}
.contentHeader {
  display: flex;
  align-items: center;
  padding-left: 10px;
  height: 10vh;
}

button {
  background-color: rgba(255, 0, 0, 0);
  border: none;
}
button:hover {
  cursor: pointer;
}
a {
  font-size: 1.3em;
}
</style>