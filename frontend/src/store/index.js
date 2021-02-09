import Vue from 'vue'
import Vuex from 'vuex'
import { GET_ALL } from '@/mutations.js'
//import axios from 'axios'
import * as API from '@/api/index.js'

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
      const res = await API.getProducts()

      // If products could be loaded
      if(!res.error)
        // Return all products
        context.commit(GET_ALL, res.response)
      // If products could bot be loaded
    }
  }
}

// Admin module
const Admin = {
  state: () => ({

  }),

  actions: {
    // Creates a new product and adds it to the database
    async createProduct(context, product) {
      // Make the API request
      let res = await API.createProduct(product, localStorage.getItem("sinus-token"));

      // If request was successful, return the message
      if(!res.error) return res.response;
    },
  
    // Updates a product in the database
    async updateProduct(context, product) {
      // Make the API request
      let res = await API.updateProduct(product._id, product, localStorage.getItem("sinus-token"));

      // On request error
      if(res.error) return res.error;

      // If request was successful, return the message
      else return res.message;
    },
    
    // Delets a product from the database
    async deleteProduct(context, id){
      // Make the API request
      let res = await API.deleteProduct(id, localStorage.getItem("sinus-token"));

      // On request error
      if(res.error) return res.error;

      // If request was successful, return the message
      else return res.message;
    },

  },
  mutations: {

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
      state.cart = []

      // Update backup in session storage
      updateCartInSessionStorage(state.cart)
    },

    getCartFromStorage(state) {

      // And then load the items from session storage
      state.cart = JSON.parse(sessionStorage.getItem('cart'))

    },

    addCartItem(state, item) {

      // Add item to cart
      state.cart.push(item)

      // Update backup in session storage
      updateCartInSessionStorage(state.cart)
    },
    
    removeCartItem(state, item) {

      // Remove item from cart
      state.cart.splice(state.cart.indexOf(item), 1)

      // Update backup in session storage
      updateCartInSessionStorage(state.cart)

    },

    //#region API mutations

    // Saves the current user and token in local storage
    saveCurrentUser(state, data) {
      // Save JWT in local storage
      localStorage.setItem("sinus-token", JSON.stringify(data.token));
      // Save the current user
      localStorage.setItem("current-user", JSON.stringify(data.user));
    }

    //#endregion
  },

  actions: {
    //#region API calls

      //#region  Login/Register
      
      // Attempts to login
      async login(context, credentials) {
        // Try to login with the provided credentials
        let res = await API.login(credentials.email, credentials.password);
        // If login was successful
        if(!res.error) 
          // Save token and user data
          context.commit('saveCurrentUser', { user: res.response.user, token: res.response.token});
        // Return response
        return res;
      },
      // Register a new user
      // This function can return an array of errors
      async register(context, userData) {
        // Try to login with the provided credentials
        return await API.register(userData.email, userData.password, userData.password)
      },
      //#endregion

    //#region Orders

    // Create order, this order will be added to the logged in user if a user is logged in
    async createCurrentOrder(context) {
      // Create the order
      let res = await API.addOrder(context.state.cart,
        // If a user is logged in, get the token
        localStorage.getItem('sinus-token')
        );

      // On request error
      if(!res) return res.data.error;

      // If order was succssfuly created, return the message
      else return res.data.message;
    }

    //#endregion

    //#endregion
  },

  getters : {

    // Get the total price of the current cart
    cartTotalPrice : state => {
      let totalPrice = 0
      state.cart.forEach(x => totalPrice += x.price)
      return totalPrice
    },

    // Get the amount of items in cart
    cartQuantity : state => {
      return state.cart.length
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
    user : User,
    admin: Admin
  }
})


// HELPERS //
function updateCartInSessionStorage(cart) {
  setTimeout(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart))
  }, 0)
}
