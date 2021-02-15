<template>
  <div class="container">

    <h1>Your cart</h1>

    <div class="content">

      <div class="contentItem">
        <div class="subHeading">
            <h4>Items</h4>
            <hr>
        </div>

        <!-- Cart -->
        <ul v-if="cart.length">
          <li
          v-for="(item, index) in cart"
          :key="index"
          >
          <CheckoutCartItem :item="item" />
          </li>
        </ul>
        
        <div v-else class="cartEmptyContainer">
          <p @animationend="animationDone" :class="{'animate': animate}">Your cart is empty :(</p>
        </div>

        <hr>

        <div class="totals">
          <h3>Total</h3>
          <h3>{{$store.getters.cartTotalPrice}} SEK</h3>
        </div>

      </div>

    <div class="contentItem">
      <div class="subHeading">
          <h4>Delivery</h4>
          <hr>
      </div>

      <div class="form">

        <label for="name">Name</label>
        <input type="text" id="name" v-model="user.name">
        
        <label for="adress">Street Address</label>
        <input type="text" id="address" v-model="user.adress.street">

        <div class="bottom">
            <div class="formItem">
              <label for="city">City</label>
              <input type="text" id="city" v-model="user.adress.city">
            </div>
            <div class="formItem">
              <label for="zipcode">Zip Code</label>
              <input type="text" id="zipcode" v-model="user.adress.zip">
            </div>
        </div>

      </div>

    </div>

    <div class="contentItem">
      <div class="subHeading">
          <h4>Payment Details</h4>
          <hr>
      </div>

      <div class="form">

        <label for="cardOwner">Card Owner</label>
        <input type="text" id="cardOwner" v-model="payment.cardOwner">
        
        <label for="cardNumber">Card Number</label>
        <input type="text" id="cardNumber" v-model="payment.cardNumber">

        <div class="bottom">
            <div class="formItem">
              <label for="validUntil">Valid until</label>
              <input type="text" id="validUntil" v-model="payment.validUntil">
            </div>
            <div class="formItem">
              <label for="ccv">CCV</label>
              <input type="text" id="ccv" v-model="payment.ccv">


            </div>
        </div>

      </div>

      <button class="purchase" @click="createOrder">
        <img src="@/assets/icon-bag-white.svg" alt="" class="btnImage" />
        <p>Take my money!</p>
      </button>

    </div>

    </div>       
  </div>
</template>

<script>
import CheckoutCartItem from '@/components/CheckoutCartItem'
import { RESET_CART } from '../mutations'

export default {
  components: { CheckoutCartItem },

  // Local variables
  data() { return {
    /*
      the current user
      Define user and payment variables here in case it is an
      anonymous customer
    */
   // The current user
    user: {
      name:  "",
      adress: {
        street: "",
        city:   "",
        zip:    ""   
      }
    },
    // Payment details
    payment: {
      cardOwner:  "",
      cardNumber: "",
      validUntil: "",
      ccv:        ""
    },
    // Silly stuff
    animate: false
  }},

  //#region Lifecycle hooks

  // Fires when this view is created
  async created() {

    if(this.$store.state.user.currentUser) {
      // Get the current user from the 
      Object.assign(this.user, this.$store.state.user.currentUser);
      // Get user's payment details
      this.payment = await this.$store.dispatch('getCurrentPaymentInfo')
    }
  },

  //#endregion

  computed: {
    cart() {
      return this.$store.state.user.cart
    }
  },
  // Local methods
  methods: {
    // Creates the oreder
    createOrder: async function() {
      // Only process the order if there are any items in the cart
      if(this.$store.state.user.cart.length) {
        // Create order and update user info and payment details
        let res = await this.$store.dispatch('createOrder', {user: this.user, payment: this.payment})
        
        if(!res.error) {
          this.$router.push('/orderdone')

          // Empty the cart
          this.$store.commit(RESET_CART)
        }

      } else {
        // Animate text
        this.animate = true;
      }

    },
    // When animation is done on text
    animationDone: function() {
      this.animate = false;
    }
  }
}
</script>

<style lang="scss" scoped>

// This is a zoom in and out animation for the 'cart is empty' label
@keyframes hithere {
  30% { transform: scale(1.2); }
  40%, 60% { transform: rotate(-20deg) scale(1.2); }
  50% { transform: rotate(20deg) scale(1.2); }
  70% { transform: rotate(0deg) scale(1.2); }
  100% { transform: scale(1); }
}
// This is a class that applies the the '' in and out animation
.animate {
  animation: hithere 1s ease;
}

.container {
  h1, h3, h4 {
    text-transform: uppercase;
  }

  h4 {
    font-size: 1.3rem;
  }

  .content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

      .cartEmptyContainer{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        height: 20rem;
        p {
          text-align: center;
          font-size: 2rem;
          font-weight: bold;
        }
      }

      .contentItem {
        margin: 1rem;

        display: flex;
        flex-direction: column;

        .subHeading {
        display: flex;
        align-items: center;

        hr {
            margin-left: 1rem;
            flex-grow: 1;
        } 
      }
      .totals {
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
      }

      .form {
        display: flex;
        flex-direction: column;

        .bottom {
          display: flex;

          .formItem {
            display: flex;
            flex-direction: column;
          }

          .formItem:first-of-type {
            margin-right: .5rem;
          }

          .formItem:last-of-type {
            margin-left: .5rem;
          }
        }
      }
    }

      button {
        align-self: flex-end;
        margin-top: 2rem;
        padding: 1rem 2rem;
      }
  }
}

</style>