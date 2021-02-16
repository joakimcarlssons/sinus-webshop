<template>
  <div class="container">

    <div class="orderHeader" @click="opened = !opened">
      
      <div class="top">
        <div class="left">

          <img src="@/assets/caret-down-solid.svg" alt="" v-if="!opened" />
          <img src="@/assets/caret-up-solid.svg" alt="" v-if="opened" />
          <p><strong>Ordernummer:</strong> {{orderID}}</p>

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
            v-for="(item,index) in orderProducts"
            :key="index"
            class="cartItem"
            >
              <CartItem 
              :item="item" 
              :forDisplay="true" 
              />           
            </div>
            
            <hr>


            <div class="info-area">
              <span class="alignHorizontal">
                <h4>Order created</h4>
                <p>{{orderDate}}</p>
              </span>
            </div>

            <div class="info-area">
              <span class="alignHorizontal">
                <h4>Payment method</h4>
                <p>Card / Internet banking</p>
              </span>
            </div>

            <div class="info-area">
              <span class="alignHorizontal">
                <h4>Delivery address</h4>
                <p>{{adressName}}<br/>
                   {{adressStreet}}<br/>
                   {{adressZip}} {{adressCity}}
                </p>
              </span>
            </div>

            <hr>

            <div class="info-area">
              <span class="alignHorizontal">
                <h4>Total price</h4>
                <p class="price-tag">{{order.orderValue}} SEK</p>
              </span>
            </div>

        </div>
    </transition>

  </div>
</template>

<script>

//#region Component imports
import CartItem from '@/components/CartItem'
//#endregion

export default {
  // Component registrations
  components: { CartItem },

  // Local computed properties
  computed: {
    // Parses and returns the order date 
    orderDate() {
      const date = new Date(this.order.timeStamp)
      const options = { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
        hour: 'numeric', minute: 'numeric', hour12 : false
        };

      return date.toLocaleDateString('se-Se', options)
    },

  //#region Return attributes from the current order, fallback values are needed
  adressName:   function() { return this.order.customer.name          || '-' }, // Get billing address name
  adressStreet: function() { return this.order.customer.adress.street || '-' }, // Get billing address street
  adressCity:   function() { return this.order.customer.adress.city   || '-' }, // Get billing address city
  adressZip:    function() { return this.order.customer.adress.zip    || '-' }, // Get billing address zip code
  
  orderID:       function() { return this.order._id || '-'},          // Get the order id
  orderProducts: function() { return this.order.orderProducts || [] } // Get items in the order
  //#endregion

  },

  // Local properties
  props : {
    order : Object // The order for this component
  },

  // Local variables
  data() {return {
    opened : false // Switch to tell if order if opened
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

      .info-area {
        display: flex;
        justify-content: space-between;

        .alignHorizontal {
          display: flex;
          align-items: center;
          font-size: 1.2rem;
          margin-top: 1rem;
          margin-bottom: 1rem;

          .price-tag {
            font-weight: bold;
          }

          h4 {
            width: 14rem;
            align-self: flex-start;
          }

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

@media screen and (max-width: 380px) {
  .container {
    .orderHeader {
      .top {
        flex-direction: column;

        .right {
          align-self: flex-end;
          margin-top: .5rem;
        }
      }
    }
  }
}

</style>