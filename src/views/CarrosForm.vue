<template>
  <main class="conteudo-principal">
      <section>
          <span class="subtitulo-lg cadastre">
              Cadastre o veículo:
          </span>
          <div class="componente-form-table">
        <form action="">
          <label for="" class="itens">Marca e modelo: </label>
          <input
            autocomplete="off" required
            type="text"
            id=""
            name=""
            v-model="modelo"
            >
          <br><br>
          <label for="">Placa: </label>
          <input
            type="text"
            id=""
            name=""
            v-model="placa"
            >
            <br><br>
          <label for="">Data de revisão: (Formato dd/mm/aaaa)</label>
          <input
            type="text"
            id=""
            name=""
            v-model="revisao"
            >
            <br><br>
          <label for="">Proprietário: </label>
          <select
            name=""
            id=""
            v-model="cliente"
            >
              <option value="">--Escolha uma opção--</option>
              <option
                v-for="cliente in clientes_disponiveis"
                :key="cliente.ID"
                :value="cliente.ID"
              >
                {{ cliente.NOME }}
              </option>
            </select>
            <b-button
              class="cadastrar"
              type="submit"
              value="Cadastrar"
              @click="cadastrarCarro($event)"
            >Cadastrar</b-button>
        </form>
    </div>
    <div>
      <span class="subtitulo-lg cadastre">
        Alterar/excluir carros
      </span>
      <table v-if="carros.length">
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca e modelo</th>
            <th>Placa</th>
            <th>Data de revisão</th>
            <th>Proprietário</th>
            <th>Alterar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="carro in carros"
            :key="carro.id"
          >
            <td>{{ carro.id }}</td>
            <td>{{ carro.modelo }}</td>
            <td>{{ carro.placa }}</td>
            <td>{{ carro.revisao }}</td>
            <td>{{ carro.nome }}</td>
            <td>
              <b-button class="botao" @click="atualizarCarro(carro.id)">Alterar</b-button>
            </td>
            <td>
              <b-button class="botao" @click="confirmarExclusaoCarro(carro.id, carro.modelo)">Excluir</b-button>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else class="lista-vazia">
          :( Não há carros registrados!
      </p>

    <b-alert
      :show="dismissCountDown"
      variant="primary"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
      >Veículo excluído!
      <b-progress
        variant="primary"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>

    <b-modal v-model="showModal" @ok="excluirCarro(idCarro)" hide-header>
      <h5>
        Tem certeza que deseja excluir {{ modeloCarro }}?
      </h5>
    </b-modal>
    </div>
  </section>
  </main>
</template>

<script>
import axios from 'axios'
import { BButton, BModal } from 'bootstrap-vue'

export default {
  name: 'CarrosForm',
  components: {
    BButton,
    BModal
  },
  data () {
    return {
      modelo: '',
      placa: '',
      revisao: '',
      cliente: '',
      clientes_disponiveis: [],
      carros: [],
      showModal: false,
      idCarro: null,
      modeloCarro: '',
      dismissCountDown: 0,
      dismissSecs: 3
    }
  },
  mounted () {
    this.preencherSelect()
    this.listar()
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    cadastrarCarro (e) {
      e.preventDefault()

      axios
        .post('http://localhost:3000/routes/carros/cadastrar', {
          modelo: this.modelo,
          placa: this.placa,
          revisao: this.revisao,
          id_cliente: this.cliente
        })
        .then(response => {
          console.log(response)
          this.listar()
          this.$swal('Sucesso!', 'O veículo foi cadastrado no sistema.', 'success')
        })
        .catch(error => console.log(error))
    },
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
    },
    atualizarCarro (id) {
      axios
        .get(`http://localhost:3000/routes/carros/${id}`)
        .then(response => {
          // eslint-disable-next-line camelcase
          var id_cliente = window.prompt('ID do cliente:', response.data.data.id_cliente)

          // eslint-disable-next-line camelcase
          if (id_cliente !== null) {
            // eslint-disable-next-line camelcase
            var modelo_carro = window.prompt('Nome do carro:', response.data.data.modelo)
            // eslint-disable-next-line camelcase
            var placa_carro = window.prompt('Placa do carro:', response.data.data.placa)
            // eslint-disable-next-line camelcase
            var revisao_carro = window.prompt('Data de revisão:', response.data.data.revisao)

            // eslint-disable-next-line camelcase
            if (modelo_carro !== null) {
              axios
                .patch(`http://localhost:3000/routes/carros/alterar/${id}`, {
                  id_cliente: id_cliente,
                  modelo: modelo_carro,
                  placa: placa_carro,
                  revisao: revisao_carro
                })
                .then(response => {
                  console.log(response)
                  this.listar()
                })
                .catch(error => console.log(error))
            } else {
              console.log('Você cancelou a operação.')
            }
          } else {
            console.log('Você cancelou a operação.')
          }
        })
        .catch(error => console.log(error))
    },
    confirmarExclusaoCarro (id, modelo) {
      this.idCarro = id
      this.modeloCarro = modelo
      this.showModal = true
    },
    excluirCarro (id) {
      axios
        .delete(`http://localhost:3000/routes/carros/excluir/${id}`)
        .then(response => {
          console.log(response)
          this.listar()
          this.dismissCountDown = this.dismissSecs
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
  padding: 8px;
  text-align: center;
}
th {
  background-color: #333;
  color: #fff;
}
</style>
