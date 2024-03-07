import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: () => import('../views/ClientesForm.vue')
  },
  {
    path: '/carros',
    name: 'Carros',
    component: () => import('../views/CarrosForm.vue')
  },
  {
    path: '/tabelas',
    name: 'Tabelas',
    component: () => import('../views/Tabelas.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
