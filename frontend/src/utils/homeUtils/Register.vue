<template>
  <div class="Register">
    <h3>Registrar</h3>
    <form>
      <div class="invalid"> <i v-if="msg" class="fa fa-exclamation-triangle"></i>  {{ msg }}</div>
      <div class="nameAndEmail">
        <div>
          <label for="name">Nome:</label> <br />
          <input
            v-model="name"
            placeholder="Digite o seu nome..."
            type="text"
          />
        </div>
        <div>
          <label for="email">Email:</label> <br />
          <input
            v-model="email"
            placeholder="Digite o seu email..."
            type="email"
          />
        </div>
      </div>

      <div class="passAndConfirm">
        <div class="pass">
          <label for="password">Senha:</label> <br />
          <input
            v-model="password"
            placeholder="Digite sua senha..."
            type="password"
          />
        </div>
        <div>
          <label for="password">Confirmação:</label> <br />
          <input
            v-model="confirmPassword"
            placeholder="Confirme sua senha..."
            type="password"
          />
        </div>
      </div>
      <div class="IHavaAcont" v-on:click.prevent="$router.push({name: 'Login'})">Já tenho uma conta: Fazer login...</div>
      <div class="button">
        <button v-on:click.prevent="submit()">Cadastrar</button>
      </div>
    </form>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data: () => ({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    path: "/",
    msg: "",
    data: {},
  }),
  methods: {
    async submit() {
      this.data = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };

      await axios
        .post("http://localhost:3000/signup", this.data)
        .then((res) => {
          this.$router.push({
            name: "Login",
          })
        })
        .catch((e) => {this.msg = e.response.data});

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
.Register button {
  padding: 5px;
  color: whitesmoke;
}
.Register {
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
.Register input {
  margin-bottom: 10px;
  width: 100%;
}
.passAndConfirm {
  display: flex;
  justify-content: space-between;
}
.passAndConfirm .pass {
  padding-right: 30px;
}
.IHavaAcont{
  margin-bottom: 10px;
  font-size: .6em;
  text-decoration: underline;
  color: rgb(83, 83, 243);
}
.IHavaAcont{
  cursor: pointer;
}
</style>