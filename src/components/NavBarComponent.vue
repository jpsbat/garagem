<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="fixed-navbar">
      <b-navbar-brand href="#">
        <b-button variant="dark" v-b-toggle.sidebar-menu><b-icon size="sm" icon="list"></b-icon></b-button>
      </b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
        </b-navbar-nav>

        <b-navbar-nav>
          <b-nav-form>
            <b-nav-form-title class="titulo">Garagem API</b-nav-form-title>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavBarComponent'
}
</script>

<style scoped>
  .navbar-brand {
    margin-left: 20px;
  }
  .titulo {
    color: white;
    font-size: 18px;
  }
  .fixed-navbar {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
  }
</style>
