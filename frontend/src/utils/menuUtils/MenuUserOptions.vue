<template>
  <div class="menuUserOptions">
    <div class="org">
      <h4>Organização</h4>
      <Option optionTitle="Página Inicial" nameComponentPage="UserHome" />
      <Option optionTitle="Meses" nameComponentPage="UserHome" />
      <Option optionTitle="Histórico" nameComponentPage="UserHome" />
    </div>
    <div class="opc">
      <h5>Opções</h5>
      <Option optionTitle="Sair" nameComponentPage="Home" />
      <Option optionTitle="Fazer login com outro" nameComponentPage="Login" />
      <Option optionTitle="Ajuda" nameComponentPage="UserHome" />
    </div>
  </div>
</template>

<script>
import Option from "@/utils/menuUtils/Option.vue";
export default {
  components: {
    Option,
  },
};
</script>

<style>
.menuUserOptions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
.opc{
    font-size:.9em;
    background-color: rgba(0, 0, 0, 0.39);
    padding-top: 15px;
    padding-bottom: 30px;
    border-top: solid rgba(245, 245, 245, 0.178);
}
h5{
    font-size:.9em;

}
.opc button{
    font-size: .8em;
}
h4, h5{
  padding-left: 10px;
  margin-bottom: 20px;
}
</style>