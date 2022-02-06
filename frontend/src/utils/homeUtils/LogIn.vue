<template>
  <div class="LogIn">
    <h3>Login</h3>
    <form>
      <label for="email">Email:</label><br />
      <input v-model="email" placeholder="Digite o seu email..." type="text" />

      <br /><br /><label for="password">Senha:</label><br />
      <input
        v-model="password"
        placeholder="Digite sua senha..."
        type="password"
      />
      <br /><br />
      <div class="button">
        <button v-on:click.prevent="submit()">Entrar</button>
      </div>
    </form>
  </div>
</template>

<script>
const axios = require("axios");


export default {
  data: () => ({
    email: "",
    password: "",
    path: "/",
  }),
  methods: {
    submit() {
      const data = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("http://localhost:3000/signin", data)
        .then((content) => {
          const data = {
            ...content.data,
          };
          return data;
        })
        .then((data) => {
          axios
            .post("http://localhost:3000/validateToken", data)
            .then((authorizate) => {
              console.log(JSON.parse(authorizate.config.data));
              if (authorizate.data) {
                this.$router.push({
                  name: "UserHome",
                  params: {
                    user: JSON.parse(authorizate.config.data),
                  },
                })
              }
            });
        });
      //GET USUÁRIOS ------------------------------------------------------------------
      // .post("http://localhost:3000/signin", data)
      // .then(content => {
      //   const header = {
      //     headers: {
      //         "Authorization": "bearer " + content.data.token,
      //         "Content-Type": "application/json",
      //     },
      //   }
      //   return header
      // })
      // .then(header => {
      //     axios.get("http://localhost:3000/users", header)
      //     .then(content => this.content = content.data)
      //     .catch(e => console.log('Token inválido'))
      // })
    },
  },
};
</script>

<style>
h3 {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
.button {
  display: flex;
  justify-content: center;
}
.LogIn button {
  padding: 5px;
  width: 100%;
  color: whitesmoke;
}
.LogIn {
  border: solid white;
  color: white;
  background: linear-gradient(
    to right,
    #060a0f,
    #151c24
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  padding: 20px;
  padding-top: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  border-radius: 15px;
}
</style>