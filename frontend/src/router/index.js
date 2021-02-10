import Vue from 'vue'
import VueRouter from 'vue-router'

//#region Component imports
import Register from '../views/Register.vue'
import Products from '../views/Products.vue'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'

//#endregion

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    inNavLink : true
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    inNavLink : true
  },
  {
    path: '/account',
    name: 'My Account',
    component: Account,
    inNavLink : false
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    inNavLink : false
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
