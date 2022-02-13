<template>
  <div class="footer">
    <footer>
      <p>Criado com <strong><i class="fa fa-heart"/></strong> por <strong>João Victor A. Braga.</strong></p>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style>
.footer {
  grid-area: footer;
  background-color: #ddd;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: end;
}

p {
  font-size: .8em;
  padding-right: 20px;
  zoom: 150%;
}
footer i{
  color: red;
}
</style>