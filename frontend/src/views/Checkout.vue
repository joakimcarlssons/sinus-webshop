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
        <ul>
          <li
          v-for="(item, index) in cart"
          :key="index"
          >
          <CheckoutCartItem :item="item" />
          </li>
        </ul>

        <hr>

        <div class="totals">
          <h3>Total</h3>
          <h3>{{$store.getters.cartTotalPrice}}</h3>
        </div>

      </div>

    <div class="contentItem">
      <div class="subHeading">
          <h4>Delivery</h4>
          <hr>
      </div>

      <div class="form">

        <label for="name">Name</label>
        <input type="text" id="name">
        
        <label for="adress">Street Adress</label>
        <input type="text" id="adress">

        <div class="bottom">
            <div class="formItem">
              <label for="city">City</label>
              <input type="text" id="city">
            </div>
            <div class="formItem">
              <label for="zipcode">Zip Code</label>
              <input type="text" id="zipcode">
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
        <input type="text" id="name">
        
        <label for="cardNumber">Card Number</label>
        <input type="text" id="cardNumber">

        <div class="bottom">
            <div class="formItem">
              <label for="validUntil">Valid until</label>
              <input type="text" id="validUntil">
            </div>
            <div class="formItem">
              <label for="ccv">CCV</label>
              <input type="text" id="ccv">


            </div>
        </div>

      </div>

      <button class="purchase">
        <img src="@/assets/icon-bag-white.svg" alt="" class="btnImage" />
        <p>Take my money!</p>
      </button>

    </div>

    </div>       
  </div>
</template>

<script>
import CheckoutCartItem from '@/components/CheckoutCartItem'

export default {
  components: { CheckoutCartItem },

  computed: {
    cart() {
      console.log(this.$store.state.user.cart)
      return this.$store.state.user.cart
    }
  }
}
</script>

<style lang="scss" scoped>

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