<template>
<div class="container">
  <ul>
    <li
    v-for="(product, index) in $store.state.products.allProducts"
    :key="index"
    class="product"
    >
    <Product 
    :product="product"
    />
    </li>
  </ul>
</div>
</template>

<script>
import { GET_ALL } from '@/mutations.js'
import Product from '@/components/Product'

export default {
  components: { Product },

  created() {
    this.$store.dispatch(GET_ALL)
  }
}
</script>

<style lang="scss" scoped>

.container {
  ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    li {
      margin: 1rem;

      &.product:hover {
        opacity: .8;
        cursor: pointer;
      }
    }
  }
}
</style>