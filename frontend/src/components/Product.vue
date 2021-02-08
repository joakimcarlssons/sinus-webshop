<template>
    <div 
    class="container"
    :style="{backgroundImage : bgImage}"
    @click="showProduct"
    >

    <div class="content">
        <div class="top">
            <div class="head">
                <h3>{{product.title}}</h3>
                
                <img 
                src="@/assets/icon-bag-black.svg" 
                alt=""
                />
            </div>
            <div class="description">
                <p>{{product.shortDesc}}</p>
            </div>
        </div>

        <div class="priceTag">
            <h3>{{product.price}}</h3>
            <p>SEK</p>
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

    data() { return {
        clicked : ''
    }},

    methods: {
        showProduct() {
            this.$store.commit('setProductToDisplay', this.product)
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
                    height: 1.5rem;
                    width: 1.5rem;
                    background-color: var(--LightGrey);
                    padding: .5rem;
                    border-radius: 100%;
                }
    
                h3 {
                    text-transform: uppercase;
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

</style>