<template>
<form class="cartItem" :style="!forDisplay ? 'margin: 2rem .7rem' : 'margin: 0 2rem 2rem 0'">
    <div class="counter">
        
        <img :style="'cursor: pointer'" src="@/assets/caret-up-solid.svg" alt="" 
        @click="$store.commit('addCartItem', item)"/>

        <p>{{itemQTY}}</p>

        <img :style="'cursor: pointer'" src="@/assets/caret-down-solid.svg" alt="" 
        @click="$store.commit('removeOneFromCart', item)"/>
    </div>
    <div class="left">
        <div 
        class="productImg"
        :style="'background-image: url(' + require(`@/assets/${item.imgFile}`) + ')'"
        ></div>

        <div class="info">
            <h3>{{item.title}}</h3>
            <h4>{{item.shortDesc}}</h4>
            <p>{{item.serial}}</p>
        </div>
    </div>

    <div class="price">
        <h3>{{item.price}} SEK</h3>
    </div>
</form>
</template>

<script>
export default {
    props: {
        item : Object,
        forDisplay : { type: Boolean, default: false }
    },
    // Local computed properties
    computed: {
        // Get the item quantity
        itemQTY: function() {
            return this.$store.getters.getCartItemQTY(this.item);
        }
    }
}
</script>

<style lang="scss" scoped>

.cartItem {
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
        font-size: 1.2rem;
        text-transform: uppercase;
    }

    .counter {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: 900;
        margin-right: .8rem;

        img {
            width: 1.5rem;
            height: 1.5rem;
        }
    }
}

.left {
    display: flex;
    align-items: center;
}

.productImg {
    height: 4rem;
    width: 4rem;
    background-size: cover;
    background-position: center;
}

.info {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
}

.price {
    align-self: flex-start;
    margin-top: .7rem;
    display: flex;
    flex-direction: column;
}

@media screen and (max-width: 280px) {
    .cartItem {
        h3 {
            font-size: 1rem;
        }

        .price {
            margin-left: -1rem;
        }
    }
}

</style>