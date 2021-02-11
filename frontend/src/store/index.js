import Vue from 'vue'
import Vuex from 'vuex'

import * as m   from '@/mutations.js'
import * as API from '@/api/index.js'
import { GET_ORDERS } from '../mutations'

Vue.use(Vuex)

//#region Modules

// Products module
const Products = {
  state: () => ({
    allProducts : []
  }),

  mutations : {

    // Get all
    [m.GET_ALL_PRODUCTS](state, products) {
      state.allProducts = products
    }
  },

  actions : {
    async [m.GET_ALL_PRODUCTS](context) {
      const res = await API.getProducts()

      // If products could be loaded
      if(!res.error)
        // Return all products
        context.commit(m.GET_ALL_PRODUCTS, res.response)
      // If products could bot be loaded
    },

    async [m.GET_SINGLE_PRODUCT](context, id) {
      return await API.getProductById(id)
    }
  }
}

// Admin module
const Admin = {
  state: () => ({

  }),

  mutations: {
    
  },

  actions: {

    // Creates a new product and adds it to the database
    async createProduct(context, product) {
      // Make the API request
      let res = await API.createProduct(product, JSON.parse(localStorage.getItem('sinus-token')));

      // If request was successful, return the message
      if(!res.error) return res.response;
    },
  
    // Updates a product in the database
    async updateProduct(context, product) {
      // Make the API request
      let res = await API.updateProduct(product._id, product, JSON.parse(localStorage.getItem('sinus-token')));

      // On request error
      if(res.error) return res.error;

      // If request was successful, return the message
      else return res.message;
    },
    
    // Delets a product from the database
    async deleteProduct(context, id){
      // Make the API request
      let res = await API.deleteProduct(id, JSON.parse(localStorage.getItem('sinus-token')));

      // On request error
      if(res.error) return res.error;

      // If request was successful, return the message
      else return res.message;
    },

  },
}

// User module
const User = {
  state: () => ({

    // The current user of the application,
    // If the user is logged in the information is also stored in local storage
    currentUser : null,

    // The current cart of the user,
    // the cart is also stored in session storage for backup
    cart : null,

  }),

  mutations : {

    //#region Cart mutations

    [m.RESET_CART](state) {

      // Reset the cart to default
      state.cart = []

      // Update backup in session storage
      updateCartInSessionStorage(state.cart)
    },

    [m.GET_CART_FROM_STORAGE](state) {

      // And then load the items from session storage
      state.cart = JSON.parse(sessionStorage.getItem('cart'))

    },

    [m.ADD_TO_CART](state, item) {
      // Try to find the item in the cart
      let cartItem = state.cart.find(i => i._id == item._id);

      // If item already exist
      if(cartItem) {
        // Add 1 to the amount
        cartItem.amount++;

        let bu = state.cart;
        state.cart = [];
        state.cart = bu;

      } else { // Else add it
        // Set amount of item
        item.amount = 1;
        // Add item to cart
        state.cart.push(item)
      }

      // Update backup in session storage
      updateCartInSessionStorage(state.cart)
    },
    
    // Removes one of the item if multiple are in the cart
    [m.REMOVE_SINGLE](state, item) {
      // Try to find the item in the cart
      let cartItem = state.cart.find(i => i._id == item._id);
      // If item already exist
      if(cartItem.amount > 1) {
        // Add 1 to the amount
        cartItem.amount--;

        let bu = state.cart;
        state.cart = [];
        state.cart = bu;

      } else { // Else add it
        // Remove item from cart
        state.cart.splice(state.cart.indexOf(cartItem), 1)
      }

      // Update backup in session storage
      updateCartInSessionStorage(state.cart)
    },

    [m.REMOVE_FROM_CART](state, item) {
      // Remove item from cart
      state.cart.splice(state.cart.indexOf(item), 1)

      // Update backup in session storage
      updateCartInSessionStorage(state.cart)

    },

    //#endregion

    //#region API mutations

    // Saves the current user and token in local storage
    [m.SAVE_USER](state, data) {
      state.currentUser = data.user
    }



    //#endregion
  },

  actions: {
    //#region API calls

      //#region  Login/Register
      
      // Attempts to login
      async [m.LOGIN](context, credentials) {
        
        // Try to login with the provided credentials
        let res = await API.login(credentials.email, credentials.password);
        
        // If login was successful
        if(!res.error) {
          // Save JWT in local storage
          localStorage.setItem("sinus-token", JSON.stringify(res.response.token));
          // Save the current user
          localStorage.setItem("current-user", JSON.stringify(res.response.user));
          
          // Save token and user data
          context.commit(m.SAVE_USER, { user: res.response.user, token: res.response.token});
        }
          
        
          // Return response
        return res;
      },
      
      // Register a new user
      // This function can return an array of errors
      async [m.REGISTER](context, userData) {

        // Try to login with the provided credentials
        return await API.register(userData.email, userData.password, userData.password)
      },

      //#endregion

    //#region Orders

    // Gets the user's payment info
    async [m.GET_USER_PAYMENT_INFO](state){
      let res = await API.getCurrentUserInfo(JSON.parse(localStorage.getItem('sinus-token')));
      return res.response.user.payment;
    },

    // Create order, this order will be added to the logged in user if a user is logged in
    async createCurrentOrder(context, userData) {
      // Server will search for the product by the id and get the data from there
      let parsedCart = []
      // Loop through all products in the cart
      context.state.cart.forEach(p => {
        // Create object and add it to array
        parsedCart.push({id: p._id, amount: p.amount})
      });
      // Create the order
      let res = await API.addOrder(parsedCart,
        userData.user, userData.payment,
        // If a user is logged in, send the token
        JSON.parse(localStorage.getItem('sinus-token')));
      // return result
      return res
    },

    async [m.GET_ORDERS](context) {
      return await API.getOrders(JSON.parse(localStorage.getItem('sinus-token')))
    }

    //#endregion

    //#endregion
  },

  getters : {

    // Get the total price of the current cart
    cartTotalPrice : state => {
      let totalPrice = 0 // Create total with default of 0
      // Loop through all items in the cart
      state.cart.forEach(x => { totalPrice += (x.price * x.amount) }) // Add price times the product amount
      // Return the total price
      return totalPrice
    },

    // Gets the quantity of an item in the cart
    getCartItemQTY : state => item => {
      // Return the qty of the cart item
      return state.cart[
        // Get the index of the passed item
        state.cart.indexOf(item)
      ].amount;
    },

    // Get the amount of items in cart
    cartQuantity : state => {
      let qty = 0; // Create quantity variable with default of 0
      // Loop through all items in the cart
      state.cart.forEach(x => qty += x.amount) // Add item quantity
      // Return the quantity
      return qty
    }

  }
}

//#endregion

export default new Vuex.Store({
  state: {

    // Product to be shown in overlay
    currentProductToBeDisplayed : null,

    overlay : {
      name : "",
      active : false
    }

  },
  mutations: {

    // Update the product to display
    setProductToDisplay(state, product) {
      state.currentProductToBeDisplayed = product
    },

    changeOverlay(state, overlay) {
      state.overlay = overlay
    },

    resetOverlay(state) {
      state.overlay = { name: '', active: false }
    },

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
