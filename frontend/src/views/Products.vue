<template>
<div class="container">
  <ul class="productList">
    <li
    v-for="(product, index) in allProducts"
    :key="index"
    :style="`animation: zoomIn ${index - (index * 0.9)}s`"
    >
    <Product 
    :product="product"
    />
    </li>
  </ul>
</div>
</template>

<script>
import { GET_ALL_PRODUCTS } from '@/mutations.js'
import Product from '@/components/Product'

export default {
  components: { Product },

  computed: {
    allProducts() {
      console.log(this.$store.state.products.allProducts);
      return this.$store.state.products.allProducts
    }
  },

  created() {
    this.$store.dispatch(GET_ALL_PRODUCTS)
  }
}
</script>