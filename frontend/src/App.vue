<template>
  <div id="app">
    <Header @clicked="onCliked" v-bind:toggle="toggle"/>
    <Content @ifUser="getIfUser"/>
    <Menu v-bind:ifUser="ifUser" @clicked ="onCliked" />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Content from "@/components/Content.vue";
import Menu from "@/components/Menu.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Content,
    Menu,
    Footer,
  },
  data:()=> ({
    toggle: false,
	ifUser: false
  }),
  methods:{
	  onCliked(value){
		  this.toggle = value
		  console.log(value)
	  },
	  getIfUser(ifUser){
		  this.ifUser = ifUser
	  }
  }
  
};
</script>
	
<style>
	* {
	margin: 0px;
	padding: 0px;
	}
	#app {
	height: 100vh;
	width: 100vw;
	display: grid;

	grid-template-areas:
		'header header header header header'
		'menu content  content content content'
		'menu footer  footer footer footer';
	grid-gap: 0px;
	}
	body{
		background-color: #ddd;
	}
</style>