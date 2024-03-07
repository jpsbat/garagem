<template>
  <div>
    <b-sidebar
    id="sidebar-menu"
    aria-labelledby="sidebar-menu-title"
    no-header shadow
    bg-variant="dark"
    text-variant="light"
    backdrop
    backdrop-variant="dark"
    >
      <template #default="{ hide }">
        <div class="p-3">
          <h4 id="sidebar-menu-title">Menu</h4>
          <div class="divider-menu"></div>
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item :to="{ path: '/' }" @click="hide"><b-icon icon="house"></b-icon>‎ ‎ Página inicial</b-nav-item>
              <b-nav-item :to="{ path: '/clientes' }" @click="hide"><b-icon icon="people"></b-icon>‎ ‎ Gerenciar clientes</b-nav-item>
              <b-nav-item :to="{ path: '/carros' }" @click="hide"><b-icon icon="truck"></b-icon>‎ ‎ Gerenciar veículos</b-nav-item>
              <b-nav-item :to="{ path: '/tabelas' }" @click="hide"><b-icon icon="ui-radios"></b-icon>‎ ‎ Visualizar cadastros</b-nav-item>
            </b-nav>
          </nav>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: 'SideBarComponent'
}
</script>

<style>
  .nav-item > .nav-link {
    color: #FFF
  }
  .nav-item > .nav-link:hover {
    color: #CCC
  }
  .divider-menu {
    border: 1px solid #FFF;
    width: 100%;
    margin-bottom: 8px;
  }
  .fechar {
    width: 100%;
  }
</style>
