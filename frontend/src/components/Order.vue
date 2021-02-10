<template>
  <div class="container">

    <div class="orderHeader" @click="opened = !opened">
      
      <div class="top">
        <p><strong>Ordernummer:</strong> {{order._id}}</p>
        <div 
        class="ball"
        :style="order.status == 'inProcess' ? 'background-color: green;' : 'background-color: green;'"
        ></div>
      </div>

      <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">
        <div class="content" v-if="opened">
          {{order}}
          <Product :productId="AfSgMJCb0LzpHjcn" />
        </div>
      </transition>

    </div>

  </div>
</template>

<script>
import Product from '@/components/Product'

export default {
  components: { Product },

  props : {
    order : Object
  },

  data() {return {
    opened : false
  }}
}
</script>

<style lang="scss" scoped>

.container {
  .orderHeader {
    margin: 1rem 0;
    font-size: 1.2rem;
    cursor: pointer;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: 1rem;
      background-color: var(--White);
      color: var(--Black);

      .ball {
        content: "";
        height: 1rem;
        width: 1rem;
        border-radius: 100%;
      }
    }
  }
}


</style>