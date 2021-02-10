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
          <p>{{order.status == 'inProcess' ? 'In process' : 'Shipped'}}</p>
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
            <div
            v-for="(item,index) in order.orderProducts"
            :key="index"
            class="cartItem"
            >
              <CartItem 
              :item="item" 
              :forDisplay="true" 
              />           
            </div>
            
            <hr>

            <div class="totals">
              <span class="alignHorizontal">
                <h4>Order created:</h4>
                <p>{{orderDate}}</p>
              </span>

              <span class="alignHorizontal">
                <h4>Total price:</h4>
                <p>{{order.orderValue}} kr</p>
              </span>
            </div>

        </div>
    </transition>

  </div>
</template>

<script>
import CartItem from '@/components/CartItem'

export default {
  components: { CartItem },

  computed: {
    orderDate() {
      const date = new Date(this.order.timeStamp)
      const options = { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
        hour: 'numeric', minute: 'numeric', hour12 : false
        };

      return date.toLocaleDateString('se-Se', options)
    }
  },

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

        p {
          margin-right: 1rem;
        }

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

      .totals {
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;

        .alignHorizontal {
          display: flex;
          align-items: center;

          font-size: 1.2rem;

          p {
            margin-left: 1rem;
          }
        }
      }

  }
}

.flipInX, .flipOutX {
  animation-duration: .5s;
}

</style>