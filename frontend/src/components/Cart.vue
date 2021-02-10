<template>
  <div class="container">
    <div class="arrow-up" 
    :style="$store.getters.cartQuantity > 0 ? 'left: 88.5%' : 'left: 92%;'">
    </div>
    <div class="content">
        <ul class="cartList">
            <li
            v-for="(item, index) in cart"
            :key="index"
            :style="'animation: fadeIn .3s'"
            >

            <CartItem
            :item="item"
            @trash="trash" 
            :class="{slideOutLeft : cart.indexOf(itemBeingTrashed) === index}"
            />

            </li>
        </ul>

        <hr>

        <div class="totals">
            <h3>Total</h3>
            <h3>{{$store.getters.cartTotalPrice}} SEK</h3>
        </div>

        <button class="purchase">
            <img src="@/assets/icon-bag-white.svg" alt="" class="btnImage" />
            <p>Take my money!</p>
        </button>
        
    </div>
  </div>
</template>

<script>
import CartItem from '@/components/CartItem'

export default {
    components: { CartItem },

    computed: {

        // Get the current cart
        cart() {
            return this.$store.state.user.cart
        }
    },

    data() { return {
        itemBeingTrashed : {}
    }},

    methods: {

        // Trash an item from the cart
        trash(product) {

            // Start the animation
            this.itemBeingTrashed = product

            setTimeout(() => {
                // Commit the mutation
                this.$store.commit('removeCartItem', product)

                // End the animation
                this.itemBeingTrashed = {}
            }, 200)
        }
    }
}
</script>

<style lang="scss" scoped>

.container {
    position: relative;

    .arrow-up {
        position: absolute;
    }

    .content {
        background-color: var(--White);
        margin-top: .8rem;
        padding-bottom: 3rem;

        display: flex;
        flex-direction: column;

        .cartList {
            height: 27.5rem;
            overflow-y: scroll;
        }

        hr {
            align-self: center;
            width: 90%;
            
            border-bottom: 1px solid var(--LightGrey);
            opacity: .3;
        }

        .totals {
            display: flex;
            justify-content: space-between;
            margin: 2rem;
            text-transform: uppercase;
        }

        .purchase {
            width: 75%;
            padding-left: 4.5rem;
            padding-top: .5rem;
            padding-bottom: .5rem;
            align-self: center;
        }
    }
}

.slideOutLeft {
    animation: slideOutLeft .2s;
}

</style>