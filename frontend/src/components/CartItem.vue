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
        <h3><span v-if="forDisplay" style="font-size: 1.4rem">{{item.amount}} st à </span> {{item.price}} SEK</h3>

        <img 
        src="@/assets/trash-solid.svg" alt="" 
        class="trash" @click="$emit('trash', item)"
        v-if="!forDisplay"
        />
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

</style>