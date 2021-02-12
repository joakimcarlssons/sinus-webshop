import Vue from 'vue'
import VueRouter from 'vue-router'

//#region Component imports
import Register from '../views/Register.vue'
import Products from '../views/Products.vue'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import Checkout from '../views/Checkout.vue'
import Admin from '../views/Admin.vue'

//#endregion

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    inNavLink : true,
    defaultVisibility : true
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    inNavLink : true,
    defaultVisibility : true
  },
  {
    path: '/account',
    name: 'My Account',
    component: Account,
    inNavLink : false,
    defaultVisibility : false
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    inNavLink : false,
    defaultVisibility : false
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    inNavLink: false,
    defaultVisibility : false
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    inNavLink: false,
    defaultVisibility : false
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router