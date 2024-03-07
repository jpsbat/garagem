<template>
  <header>
    <div class="bg-image"
     style="background-image: url('https://leismunicipais.com.br/noticias/wp-content/uploads/2019/11/iStock-1045979216.jpg');
            height: 100vh;">
    <p class="cabecalho-lg frase-cabecalho texto-azul">
      GARAGEM API
    </p>
    <p class="subtitulo-lg texto">
      Garagem API é uma plataforma intuitiva
      e eficiente projetada para simplificar o
      gerenciamento de clientes e seus veículos.
      Com uma interface amigável, oferece uma
      maneira conveniente para os usuários
      cadastrarem seus dados e acompanharem
      as informações essenciais sobre seus carros.
    </p>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HomeForm',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.texto-azul {
  color: #04a5c4;
  position: absolute;
  top: 20%;
  left: 10%;
}
.texto {
  position: absolute;
  top: 33%;
  left: 10%;
  margin-right: 500px;
  line-height: 1.1;
}
.bg-image {
  position: relative;
}
.bg-image::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
