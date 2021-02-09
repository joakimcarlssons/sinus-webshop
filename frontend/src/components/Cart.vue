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
            <div class="cartItem" :class="{slideOutLeft : cart.indexOf(itemBeingTrashed) === index}">
                <div 
                class="productImg"
                :style="'background-image: url(' + require(`@/assets/${item.imgFile}`) + ')'"
                ></div>

                <div class="info">
                    <h3>{{item.title}}</h3>
                    <h4>{{item.shortDesc}}</h4>
                    <p>{{item.serial}}</p>
                </div>

                <div class="price">
                    <h3>{{item.price}} SEK</h3>

                    <img 
                    src="@/assets/trash-solid.svg" alt="" 
                    class="trash" @click="trash(item)" />
                </div>

            </div>
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
export default {

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

        .cartItem {
            display: grid;
            grid-template-columns: .8fr 1.9fr 1fr;
            padding: 2rem;

            .productImg {
                height: 4rem;
                width: 4rem;
                background-size: cover;
                background-position: center;
            }

            .info {
                display: flex;
                flex-direction: column;

                h3 {
                    text-transform: uppercase;
                }
            }

            .price {
                display: flex;
                flex-direction: column;

                .trash {
                align-self: flex-end;
                height: 1.1rem;
                width: 1.1rem;
                opacity: .3;
                margin-top: 1rem;
                }

                .trash:hover {
                    opacity: 1;
                    cursor: pointer;
                }
            }
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