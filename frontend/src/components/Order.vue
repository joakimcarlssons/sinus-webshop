<template>
  <div class="container">

    <div class="orderHeader" @click="opened = !opened">
      
      <div class="top">
        <div class="left">

          <img src="@/assets/caret-down-solid.svg" alt="" v-if="!opened" />
          <img src="@/assets/caret-up-solid.svg" alt="" v-if="opened" />
          <p><strong>Ordernummer:</strong> {{order._id}}</p>

        </div>

        <div class="right">
          <div 
          class="ball"
          :style="order.status == 'inProcess' ? 'background-color: var(--DarkYellow);' : 'background-color: green;'"
          ></div>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="animated flipInX"
      leave-active-class="animated flipOutX">
        <div class="content" v-if="opened">
          {{order}}
          <Product :productId="AfSgMJCb0LzpHjcn" />
        </div>
    </transition>

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

    img {
      height: 1.5rem;
      width: 1.5rem;
    }

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: 1rem;
      background-color: var(--White);
      color: var(--Black);

      .left {
        display: flex;
        align-items: center;
      }

      .right {
        display: flex;
        align-items: center;

        .ball {
          content: "";
          height: 1rem;
          width: 1rem;
          border-radius: 100%;
        }
      }

    }
  }

  .content {
      background-color: var(--LightBlueFaded);
      margin-top: -1rem;
      padding: 2rem;
  }
}

.flipInX, .flipOutX {
  animation-duration: .5s;
}

</style>