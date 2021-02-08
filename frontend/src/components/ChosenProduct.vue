<template>
    <div class="container">

        <div class="close">
            <button @click="$store.commit('setProductToDisplay', null)">
                X
            </button>
        </div>

        <div class="content">

            <div class="left"
            :style="{backgroundImage : bgImage}"
            >
            </div>

            <div class="right">

            </div>

        </div>

    </div>
</template>

<script>
export default {
    props: {
        product : Object
    },
    computed: {
        bgImage(){
            return 'url(' + require(`@/assets/${this.product.imgFile}`) + ')'
        }
    }
}
</script>

<style lang="scss" scoped>

.container {    
    height: 100%;
    align-items: center;
    justify-content: center;

    .close {
        button {
            position: absolute;
            top: 0;
            right: 0;
            margin: 2rem;
            background: transparent;
        }
    }

    .content {
        width: 77rem;
        height: 50rem;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        background-color: var(--White);

        .left {
            background-color: var(--LightGrey);
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
        }

    }

}

</style>