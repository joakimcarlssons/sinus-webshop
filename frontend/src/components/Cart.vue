<template>
  <div class="container">
    <div class="arrow-up" 
    :style="$store.getters.cartQuantity > 0 ? 'left: 88.5%' : 'left: 92%;'">
    </div>
    <div class="content">
        <ul class="cartList" v-if="cart.length">
            <li
            v-for="(item, index) in cart"
            :key="index"
            :style="'animation: fadeIn .3s'"
            >

            <CartItem
            :item="item"
            @trash="trash" 
            :class="{fadeOut : cart.indexOf(itemBeingTrashed) === index}"
            />

            </li>
        </ul>
        
        <div v-else class="cartEmptyContainer">
            <p>Your cart is empty :(</p>
        </div>

        <hr>

        <div class="totals">
            <h3>Total</h3>
            <h3>{{$store.getters.cartTotalPrice}} SEK</h3>
        </div>

        <button class="purchase" @click="$router.push('/checkout')">
            <img src="@/assets/icon-bag-white.svg" alt="" class="btnImage" />
            <p>Take my money!</p>
        </button>
        
    </div>
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
        // Get the current cart
        cart() {
            // Return the cart
            return this.$store.state.user.cart
        }
    },

    // Local variables
    data() { return {
        itemBeingTrashed : {},
    }},

    // Local methods
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

        .cartEmptyContainer{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-content: center;
                height: 27.5rem;
            p {
                text-align: center;
                font-size: 2rem;
                font-weight: bold;
            }
        }

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

@media screen and (max-width: 280px) {
.container {
    .content {
            .purchase {
                width: 90%;
            }
        }
    }
}

</style>