<template>
<div class="cartItem" :style="!forDisplay ? 'margin: 2rem' : 'margin: 0 2rem 2rem 0'">
    <div class="counter">
        
        <img src="@/assets/caret-up-solid.svg" alt="" />

        <p>{{item.amount}}</p>

        <img src="@/assets/caret-down-solid.svg" alt="" />
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
</div>
</template>

<script>
export default {
    props: {
        item : Object,
        forDisplay : { type: Boolean, default: false }
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
}

.price {
    align-self: flex-start;
    display: flex;
    flex-direction: column;
}

</style>