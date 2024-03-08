<template>
  <main class="conteudo-principal">
    <section>
        <div>
          <span class="subtitulo-lg cadastre">
            Clientes com carros registrados:
          </span>
          <table v-if="carros.length">
            <thead>
              <tr>
                <th>ID</th>
                <th>Proprietário</th>
                <th>Carro</th>
                <th>Placa</th>
                <th>Data de revisão</th>
              </tr>
            </thead>
          <tbody>
            <tr
              v-for="carro in carros"
              :key="carro.id"
            >
              <td>{{ carro.id }}</td>
              <td>{{ carro.nome }}</td>
              <td>{{ carro.modelo }}</td>
              <td>{{ carro.placa }}</td>
              <td>{{ carro.revisao }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else class="lista-vazia">
        :( Não há clientes registrados!
        </p>
        </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CarrosForm',
  data () {
    return {
      modelo: '',
      placa: '',
      revisao: '',
      nome: '',
      clientes_disponiveis: [],
      carros: []
    }
  },
  mounted () {
    this.preencherSelect()
    this.listar()
  },
  methods: {
    preencherSelect () {
      axios
        .get('http://localhost:3000/routes/clientes/listar')
        .then(response => {
          this.clientes_disponiveis = response.data.data
          this.listar()
        })
        .catch(error => console.log(error))
    },
    listar () {
      axios
        .get('http://localhost:3000/routes/carros/listar')
        .then(response => {
          this.carros = response.data.data
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style scoped>
.conteudo-principal {
padding-bottom: 7.5rem;
color: var(--cinza, #444);

display: flex;
flex-direction: column;
align-items: center;
gap: 5rem;
}
.cadastre {
color: #04a5c4;
display: block;
text-align: center;
margin-bottom: 1.5rem;
margin-top: 5rem;
}
.lista-vazia {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  color: black;
  text-align: center;
  font-size: 1.125em;
  line-height: 150%;
  font-weight: bold;
}
@media only screen and (max-width: 1300px) {
.conteudo-principal {
  padding: 5rem 3.75rem;
  gap: 3.5rem;
}
}
@media only screen and (max-width: 767px) {
.conteudo-principal {
  padding: 4rem 1.5rem;
  gap: 4rem;
}
}
input, select {
margin-left: .5rem;
color: black;
font-size: 15px;
width: 100%;
padding: 10px 5px 5px;
border-radius: 5px;
border-width: 3px;
}
.componente-form-table {
width: 100%;
display: flex;
justify-content: space-evenly;
}
.itens{
  margin-bottom: 1rem;
}
.botao{
color: #1C1C1C;
background-color: #04a5c4;
}
.cadastrar{
  color: #1C1C1C;
  background-color: #04a5c4;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}
table {
  border: 1px solid black;
  border-collapse: collapse;
  background-color: #f5f5f5;
  width: 100%;
  margin-bottom: 20px;
}
th, td {
  padding: 20px;
  text-align: center;
}

th {
  background-color: #333;
  color: #fff;
}
</style>
