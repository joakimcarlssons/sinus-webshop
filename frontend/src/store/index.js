import Vue from 'vue'
import Vuex from 'vuex'
import { GET_ALL } from '@/mutations.js'
//import axios from 'axios'
import * as API from '@/api/mock.js'

Vue.use(Vuex)

// Products module
const Products = {
  state: () => ({
    allProducts : []
  }),

  mutations : {

    // Get all
    [GET_ALL](state, products) {
      state.allProducts = products
    }
  },

  actions : {
    async [GET_ALL](context) {
      const response = await API.getAllProducts()
      context.commit(GET_ALL, response)
    }
  }
}

// User module
const User = {
  state: () => ({

    // The current cart of the user,
    // the cart is also stored in session storage for backup
    cart : null

  }),

  mutations : {

    resetCart(state) {

      // Reset the cart to default
      state.cart = {
        cartItems : []
      }

      // Update backup in session storage
      updateCartInSessionStorage(state.cart)
    },

    getCartFromStorage(state) {

      // And then load the items from session storage
      state.cart = JSON.parse(sessionStorage.getItem('cart'))

    },

    addCartItem(state, item) {

      // Add item to cart
      state.cart.cartItems.push(item)

      // Update backup in session storage
      updateCartInSessionStorage(state.cart)
    },
    
    removeCartItem(state, item) {

      // Remove item from cart
      let currentCart = state.cart.cartItems
      currentCart.splice(currentCart.indexOf(item), 1)

      // Update backup in session storage
      updateCartInSessionStorage(state.cart)

    }
  },

  getters : {
    cartTotalPrice : state => {
      let totalPrice = 0
      state.cart.cartItems.forEach(x => totalPrice += x.price)
      return totalPrice
    }
  }
}

export default new Vuex.Store({
  state: {

    // Product to be shown in overlay
    currentProductToBeDisplayed : null

  },
  mutations: {

    // Update the product to display
    setProductToDisplay(state, product) {
      state.currentProductToBeDisplayed = product
    }
  },
  actions: {
  },
  modules: {
    products : Products,
    user : User
  }
})


// HELPERS //
function updateCartInSessionStorage(cart) {
  setTimeout(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart))
  }, 0)
}
