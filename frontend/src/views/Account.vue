<template>
  <div class="container">

      <h1>Orders</h1>
      <div class="subHeading">
          <h4>Your orders</h4>
          <hr>
      </div>

      <ul>
          <li
          v-for="(order ,index) in orders"
          :key="index"
          >
          <Order :order="order" />
          </li>
      </ul>

  </div>
</template>

<script>
import Order from '@/components/Order'
import { GET_ORDERS } from '@/mutations.js'

export default {
    components : { Order },

    // Local variables
    data() { return {
        // Order history
        orders : []
    }},
    
    //#region Lifecycle hooks

    // Fires when this view is created
    async created() {
        // Get order history
        const res = await this.$store.dispatch(GET_ORDERS)
        // If no errors occurred...
        if(!res.error) this.orders = res.response // Save orders in local variable
    }

    //#endregion
}
</script>

<style lang="scss" scoped>

.container {

    h1, h4 {
        text-transform: uppercase;
    }
    
    .subHeading {
        display: flex;
        align-items: center;

        hr {
            margin-left: 1rem;
            flex-grow: 1;
        }  
    }
}

</style>