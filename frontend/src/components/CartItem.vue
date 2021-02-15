<template>
<div class="cartItem" :style="!forDisplay ? 'margin: 2rem' : 'margin: 0 2rem 2rem 0'">
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
        <h3>
            <span v-if="forDisplay" style="font-size: 1.4rem">{{item.amount}} st à </span>
             {{item.price}} SEK
        </h3>
        <div class="edit" v-if="!forDisplay">

            <div class="countContainer">
                <div class="incdec rem" @click="$store.commit('removeOneFromCart', item)"/>
                <h4>{{itemQTY}}</h4>
                <div class="incdec add" @click="$store.commit('addCartItem', item)"/>
            </div>

            <img 
            src="@/assets/trash-solid.svg" alt="" 
            class="trash" @click="$emit('trash', item)"
            />
        </div>
    </div>
</div>
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
    display: flex;
    justify-content: space-between;
}

.left {
    display: flex;
    align-items: center;

    .info {
        margin-left: 1rem;
    }
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

    h3 {
        text-transform: uppercase;
    }
}

.price {
    display: flex;
    flex-direction: column;



    .edit {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: .3rem;

        .trash {
            //align-self: flex-end;
            height: 1.1rem;
            width: 1.1rem;
            opacity: .3;
        }
        .trash:hover {
            opacity: 1;
            cursor: pointer;
        }
        h4 {
            display: flex;
            flex-direction: row;
            text-align: center;
            font-size: 1.4rem;
        }

        .countContainer {
            display: flex;
            align-items: center;

            h4 {
                font-size: 1.1rem;
            }

            .incdec{
                height: 1.2rem;
                width: 1.2rem;
                cursor: pointer;

                background-repeat: no-repeat;                   
                background-size: contain;
                background-position: center;

                &.add {
                    background-image: url("~@/assets/caret-down-solid.svg");
                    transform: rotate(-90deg);
                    margin-left: .3rem;
                }
                &.rem {
                    background-image: url("~@/assets/caret-up-solid.svg");
                    transform: rotate(-90deg);
                    margin-right: .3rem;
                }
            }
        }
    }
}

</style>