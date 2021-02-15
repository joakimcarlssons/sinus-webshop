import Vue from 'vue'
import VueRouter from 'vue-router'

//#region Component imports

import Register from '../views/Register.vue'
import Products from '../views/Products.vue'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import Checkout from '../views/Checkout.vue'
import Admin from '../views/Admin.vue'
import Unauthorized from '../views/Unauthorized.vue'
import OrderDone from '../views/OrderDone.vue'
import TokenExpired from '../views/TokenExpired.vue'

//#endregion

//#region Other imports

import store from '../store'

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
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: Unauthorized,
    inNavLink: false,
    defaultVisibility : false,
  },
  {
    path: '/orderdone',
    name: 'Order Done',
    component: OrderDone,
    inNavLink: false,
    defaultVisibility : false
  },
  {
    path: '/expired',
    name: 'Token Expired',
    component: TokenExpired,
    inNavLink: false,
    defaultVisibility : false
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  // Reset nav list
  routes.forEach(x => x.inNavLink = x.defaultVisibility)

  // If no user is logged in
  if(!localStorage.getItem('current-user')) {
    
    // If a user tries to enter the account or admin page,
    // the user will be redirected to the start page
    if(to.name == 'My Account' || to.name == 'Admin') next({ name: 'Unauthorized' })
    else next()
  }

  else { 
    // User is logged in but not admin...
    if((JSON.parse(localStorage.getItem('current-user')).role != 'admin')) {

      if(to.name == 'Admin') next({ name: 'Unauthorized' })
      else next()

      // Activate account page
      routes.find(x => x.path == '/account').inNavLink = true
    }

    // User is admin...
    else {
      
      // Activate both account and admin page
      routes.find(x => x.path == '/account').inNavLink = true
      routes.find(x => x.path == '/admin').inNavLink = true

      next()
    }
  }

  // When entering the register page...
  if(to.name == 'Register') {

    // Activate the nav item
    routes.find(x => x.path == '/register').inNavLink = true

    // If any user is logged in, log out
    if(localStorage.getItem('current-user')) store.commit('logOutUser')
    
    next({ name : 'Register' })
  }

  if(to.name == 'Order Done' && from.name != 'Checkout') next({ name : 'Unauthorized' })

  // Update the navbar
  store.commit('setVisibleNavItems', routes)
})

export default router