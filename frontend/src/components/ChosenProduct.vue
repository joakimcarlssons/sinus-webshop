<template>
    <div class="container">

        <div class="close">
            <button @click="close">
                X
            </button>
        </div>

        <div class="content">

            <div class="left"
            :style="{backgroundImage : bgImage}"
            >
            </div>

            <div class="right">
                <div class="info">
                    <h1>{{product.title}}</h1>
                    <h3>{{product.shortDesc}}</h3>

                    <p>{{product.longDesc}}</p>

                    <h2>{{product.price}} sek</h2>
                </div>

                <button class="purchase" @click="addCartItem">
                    <img src="@/assets/icon-bag-white.svg" alt="" class="btnImage" />
                    <p>Take my money!</p>
                </button>

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
    },
    methods: {
        close() {
            this.$store.commit('setProductToDisplay', null)
            this.$store.commit('resetOverlay')
        },

        addCartItem() {
            this.$store.commit('addCartItem', this.product)
            this.$store.commit('resetOverlay')
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

        .right {
            margin: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            p {
                margin: 2rem 0;
            }

            button {
                align-self: center;
            }
        }

    }

}

</style>