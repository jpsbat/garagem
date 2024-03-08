<template>
  <main class="conteudo-principal">
    <section>
      <span class="subtitulo-lg cadastre">
        Cadastre o cliente:
      </span>
      <div class="componente-form-table">
        <form action="">
          <label for="btn-cadastrar" class="itens">Nome: </label>
          <input
            autocomplete="off" required
            type="text"
            id="btn-cadastrar"
            name="btn-cadastrar"
            v-model="nome"
          >
          <b-button
            class="cadastrar"
            type="submit"
            value="Cadastrar"
            @click="cadastrarCliente($event)"
          >Cadastrar</b-button>
        </form>
      </div>

      <span class="subtitulo-lg cadastre">
        Alterar/excluir clientes
      </span>
      <div>
        <table v-if="clientes.length">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Alterar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="cliente in clientes"
              :key="cliente.id"
            >
              <td>{{ cliente.ID }}</td>
              <td>{{ cliente.NOME }}</td>
              <td>
                <b-button class="botao" @click="atualizarCliente(cliente.ID)">Alterar</b-button>
              </td>
              <td>
                <b-button class="botao" @click="confirmarExclusaoCliente(cliente.ID, cliente.NOME)">Excluir</b-button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else class="lista-vazia">
        :( Não há clientes registrados!
        </p>
      </div>
    </section>

    <b-alert
      :show="dismissCountDown"
      variant="primary"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
      >Cliente excluído!
      <b-progress
        variant="primary"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>
    <b-modal v-model="showModal" @ok="excluirCliente(idCliente)" hide-header>
      <h5>
        Tem certeza que deseja excluir {{ nomeCliente }}?
      </h5>
    </b-modal>

  </main>
</template>

<script>
import axios from 'axios'
import { BButton, BModal } from 'bootstrap-vue'

export default {
  name: 'ClientesForm',
  components: {
    BButton,
    BModal
  },
  data () {
    return {
      nome: '',
      clientes: [],
      showModal: false,
      idCliente: null,
      nomeCliente: '',
      dismissCountDown: 0,
      dismissSecs: 3
    }
  },
  mounted () {
    this.listar()
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    cadastrarCliente (e) {
      e.preventDefault()

      axios
        .post('http://localhost:3000/routes/clientes/cadastrar', {
          nome: this.nome
        })
        .then(response => {
          console.log(response)
          this.listar()
          this.$swal('Sucesso!', 'O cliente foi cadastrado no sistema.', 'success')
        })
        .catch(error => console.log(error))
    },
    listar () {
      axios
        .get('http://localhost:3000/routes/clientes/listar')
        .then(response => {
          this.clientes = response.data.data
        })
        .catch(error => console.log(error))
    },
    atualizarCliente (id) {
      axios
        .get(`http://localhost:3000/routes/clientes/${id}`)
        .then(response => {
          // eslint-disable-next-line camelcase
          var nome_cliente = window.prompt('Nome do cliente:', response.data.data.nome)

          // eslint-disable-next-line camelcase
          if (nome_cliente !== null) {
            axios
              .patch(`http://localhost:3000/routes/clientes/alterar/${id}`, {
                nome: nome_cliente
              })
              .then(response => {
                console.log(response)
                this.listar()
              })
              .catch(error => console.log(error))
          }
        })
        .catch(error => console.log(error))
    },
    confirmarExclusaoCliente (id, nome) {
      this.idCliente = id
      this.nomeCliente = nome
      this.showModal = true
    },
    excluirCliente (id) {
      axios
        .delete(`http://localhost:3000/routes/clientes/excluir/${id}`)
        .then(response => {
          console.log(response)
          this.listar()
          this.dismissCountDown = this.dismissSecs
        })
        .catch(error => console.log(error))

      this.showModal = false
    }
  }
}
</script>

<style scoped>
.conteudo-principal {
  padding-bottom: 7.5rem;
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
  padding: 10px;
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
