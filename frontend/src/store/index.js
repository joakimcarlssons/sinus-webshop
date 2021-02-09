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
      const response = await API.getProducts()
      context.commit(GET_ALL, response.data)
    }
  }
}

// Admin module
const Admin = {
  state: () => ({

  }),

  actions: {
    // Creates a new product and adds it to the database
    async createProduct(product) {
      // Make the API request
      let res = await API.createProduct(product, localStorage.getItem("sinus-token"));

      // On request error
      if(res.error) return res.error;

      // If request was successful, return the message
      else return res.message;
    },
  
    // Updates a product in the database
    async updateProduct(product) {
      // Make the API request
      let res = await API.updateProduct(product._id, product, localStorage.getItem("sinus-token"));

      // On request error
      if(res.error) return res.error;

      // If request was successful, return the message
      else return res.message;
    },
    
    // Delets a product from the database
    async deleteProduct(id){
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
    saveCurrentUser(user, token) {
    
      // Save JWT in local storage
      localStorage.setItem("sinus-token", token);

      // Save the current user
      localStorage.setItem("current-user", user);

    }

    //#endregion
  },

  actions: {
    //#region API calls

      //#region  Login/Register
      
      // Attemps a login
      async login(context, email, password) {
        // Try to login with the provided credentials
        let res = await API.userPost(email, password);

        // If login failed...
        if(res.error) return res.error; // Return error message

        // Login successful
        else {     
          // Save the user and token
          context.commit('saveCurrentUser', { user: res.user, token: res.token });
        }

      },
      // Register a new user
      async register(context, email, password, password2) {
        // Try to login with the provided credentials
        let res = await API.register(email, password, password2);
        
        // If login failed...
        if(res.errors) return res.errors; // Return all error messages

        // Login successful
        else {
          // Automatic login the user has been created
          await this.login(email, password);
        }
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
      if(!res) return null;

      // If order was succssfuly created, return the message
      else return res.message;
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
