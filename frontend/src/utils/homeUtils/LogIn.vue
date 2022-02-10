<template>
  <div class="LogIn">
    <h3>Login</h3>
    <form>
      <div class="invalid" :v-if="msg"><i class="fas fas-triangle-exclamation"></i>{{ msg }}</div>
      <label for="email">Email:</label><br />
      <input v-model="email" placeholder="Digite o seu email..." type="text" />
      <br /><br /><label for="password">Senha:</label><br />
      <input
        v-model="password"
        placeholder="Digite sua senha..."
        type="password"
      />
      <div class="notHavaAcont" v-on:click.prevent="$router.push({name: 'Home'})">Ainda não tenho uma conta: Cadastrar...</div>
      <br />
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
    msg: "",
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
        .catch((e) => (this.msg = e.response.data))
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
                });
              }
            })
            .catch((e) => (this.msg = e.response.data));
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
  margin-bottom: 10px;
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
.invalid {
  font-family: Helvetica, sans-serif;
  font-size: 0.6em;
  color: rgb(223, 41, 41);
  margin-bottom: 5px;
}
.notHavaAcont{
  margin-top: 5px;
  font-size: .6em;
  text-decoration: underline;
  color: rgb(83, 83, 243);
}
.notHavaAcont:hover{
  cursor: pointer;
}
</style>