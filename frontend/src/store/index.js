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

export default new Vuex.Store({
  state: {

    // Product to be shown in overlay
    currentProductToBeDisplayed : {}

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
    products : Products
  }
})
