<template>
    <div 
    class="container"
    :class="{wrapper : !addToCartIsActive}"
    :style="{backgroundImage : bgImage}"
    @click="showProduct"
    >

    <div class="content">
        <div class="top">
            <div class="head">
                <h3>{{selectedProduct.title}}</h3>

                <!-- Check mark when item added to cart -->
                <img v-if="isAnimating"
                src="@/assets/check-solid.svg" 
                alt=""
                class="addToCart"
                :class="{animateCheck : isAnimating}"
                @mouseover="setActiveCart"
                @mouseleave="setActiveCart"
                @click="addToCart(selectedProduct)"
                />
                
                <!-- Bag image -->
                <img v-else
                src="@/assets/icon-bag-black.svg" 
                alt=""
                class="addToCart"
                :class="{animateBag : isAnimating}"
                @mouseover="setActiveCart"
                @mouseleave="setActiveCart"
                @click="addToCart(selectedProduct)"
                />

            </div>
            <div class="description">
                <p>{{selectedProduct.shortDesc}}</p>
            </div>
        </div>

        <div class="priceTag">
            <h3>{{selectedProduct.price}}</h3>
            <p>SEK</p>
        </div>
    </div>

    </div>
</template>

<script>
import { GET_SINGLE_PRODUCT } from '@/mutations.js'

export default {
    props: {
        product : Object,
        productId : String
    },
    
    async created() {
        if (this.productId != undefined) {
            const res = await this.$store.dispatch(GET_SINGLE_PRODUCT, this.productId)

            if(!res.error) this.selectedProduct = res.response
        }
        else this.selectedProduct = this.product
    },

    computed: {

        // Get the correct product image
        bgImage(){
            return 'url(' + require(`@/assets/${this.selectedProduct.imgFile}`) + ')'
        }
    },

    data() { return {

        // Flag to check if the user is hovering over the Cart-button
        addToCartIsActive : false,
        isAnimating : false,

        selectedProduct : {}

    }},

    methods: {

        // Sets the product to be displayed in the overlay
        showProduct() {
            if(!this.addToCartIsActive) {
                this.$store.commit('setProductToDisplay', this.product)
            }
        },

        // Sets the flag indicating whether the user is hovering over the cart or not
        setActiveCart() {
            this.addToCartIsActive = !this.addToCartIsActive
        },

        // Adds an item to the cart
        addToCart(product) {
            this.$store.commit('addCartItem', product)

            this.isAnimating = true

            setTimeout(() => {
                this.isAnimating = false
            }, 500)

        }
    }

}
</script>

<style lang="scss" scoped>

    .container {
        height: 30rem;
        width: 20rem;
        background-color: var(--White);

        background-size: contain;
        background-repeat: no-repeat;
        background-position: bottom;

        .content {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 1rem;

            .head {
                display: flex;
                justify-content: space-between;
    
                img {
                    overflow: hidden;
                    height: 1.5rem;
                    width: 1.5rem;
                    background-color: var(--LightGrey);
                    padding: .5rem;
                    border-radius: 100%;
                }
    
                h3 {
                    text-transform: uppercase;
                }

                .addToCart:hover {
                    background-color: var(--MediumGrey);
                    cursor: pointer;
                }
            }

            .priceTag {
                display: flex;
                gap: .5rem;
                justify-content: center;
                background-color: var(--Black);
                color: var(--White);
                padding: .5rem;
                border-radius: 2.5rem;
                width: 50%;
            }

        }

    }

    .wrapper:hover {
        opacity: .95;
        cursor: pointer;
    }

    .animateBag {
        animation: fadeOut .5s;
    }

    .animateCheck {
        animation: fadeIn 1s;
    }

</style>