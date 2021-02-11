<template>
  <div class="container">
    <h1>Admin Products</h1>

    <div class="content">

    <div class="add">
        <div class="subHeading">
            <h4>Add</h4>
            <hr>
            <img 
            src="@/assets/caret-down-solid.svg" alt=""
            v-if="showAdd"
            @click="showAdd = !showAdd"
            />
            <img src="@/assets/caret-up-solid.svg" alt=""
            v-else
            @click="showAdd = !showAdd"
            />
        </div>
        
        <div class="selectedItemContainer" v-if="showAdd">

            <div class="itemColumn itemPhoto">
                <h4>Product Photo</h4>
                <div class="photo" :style="{backgroundImage : chosenImg}"></div>
            </div>

            <div class="itemColumn itemInfo">
                <label for="newName">Product name</label>
                <input type="text" id="newName" v-model="newProduct.title">
                
                <label for="newShortDesc">Product short desc</label>
                <input type="text" id="newShortDesc" v-model="newProduct.shortDesc">
                
                <label for="newPrice">Product price</label>
                <input type="text" id="newPrice" v-model="newProduct.price">
                
                <label for="newSerial">Product serial</label>
                <input type="text" id="newSerial" v-model="newProduct.serial" disabled>
            </div>

            <div class="itemColumn itemDescription">
                <label for="desc">Product description</label>
                <textarea id="desc" v-model="newProduct.longDesc"></textarea>
            </div>

        <button class="addBtn">Add new product</button>
        </div>

    </div>

        <!-- Edit / Delete -->
    <div class="edit">
        <div class="subHeading">
            <h4>Edit / Delete</h4>
            <hr>
            <img 
            src="@/assets/caret-down-solid.svg" alt=""
            v-if="showEdit"
            @click="showEdit = !showEdit"
            />
            <img src="@/assets/caret-up-solid.svg" alt=""
            v-else
            @click="showEdit = !showEdit"
            />
        </div>

        <div v-if="showEdit">

        <div class="selectedItemContainer" v-if="showEdit">

            <div class="itemColumn itemPhoto">
                <h4>Product Photo</h4>
                <div class="photo" :style="{backgroundImage : bgImage}"></div>
            </div>

            <div class="itemColumn itemInfo">
                <label for="name">Product name</label>
                <input type="text" id="name" v-model="selectedProduct.title">
                
                <label for="shortDesc">Product short desc</label>
                <input type="text" id="shortDesc" v-model="selectedProduct.shortDesc">
                
                <label for="price">Product price</label>
                <input type="text" id="price" v-model="selectedProduct.price">
                
                <label for="serial">Product serial</label>
                <input type="text" id="serial" v-model="selectedProduct.serial" disabled>
            </div>

            <div class="itemColumn itemDescription">
                <label for="desc">Product description</label>
                <textarea id="desc" v-model="selectedProduct.longDesc"></textarea>
            </div>

        </div>

        <ul class="productList">
            <li
            v-for="(product, index) in allProducts"
            :key="index"
            :style="`animation: zoomIn ${index - (index * 0.9)}s`"
            >
            <Product 
            :product="product"
            @updateProduct="setSelectedProduct"
            @removeProduct="removeProduct"
            />
            </li>
        </ul>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import { GET_ALL_PRODUCTS } from '@/mutations.js'
import Product from '@/components/Product'

export default {
  components: { Product },

  data() { return {
      selectedProduct : {},
      newProduct : {},
      showAdd : false,
      showEdit : false,
      chosenImg : ''
  }},

  computed: {
    allProducts() {
      return this.$store.state.products.allProducts
    },

    // Get the correct product image
    bgImage(){
        if(this.selectedProduct.imgFile) {
            return 'url(' + require(`@/assets/${this.selectedProduct.imgFile}`) + ')'
        }
        else return ''
    }
  },

  created() {
    this.$store.dispatch(GET_ALL_PRODUCTS)
  },

  methods: {
      setSelectedProduct(product, flag) {
            if(!flag) this.selectedProduct = product
      },
      removeProduct(product, flag) {
          if(flag) console.log(product)
      }
  }
}
</script>

<style lang="scss" scoped>
.container {
    h1, h4 {
        text-transform: uppercase;
    }
    
    .subHeading {
        display: flex;
        align-items: center;

        hr {
            margin-left: 1rem;
            flex-grow: 1;
        }

        img {
            margin-top: -.5rem;
            height: 1.8rem;
            width: 1.8rem;
            cursor: pointer;
        }
    }

    .selectedItemContainer {
        margin: 1rem;
        padding: 1rem;
        background-color: var(--DarkGrey);
        color: var(--White);

        display: grid;
        grid-template-columns: .8fr 1fr 1fr;

        .itemColumn {
            display: flex;
            flex-direction: column;
            margin: 1rem;

            h4 {
                color: var(--WhiteFaded);
            }

            label {
                letter-spacing: .07rem;
                margin-bottom: .3rem;
                color: var(--WhiteFaded);
                overflow: hidden;
            }

            input, textarea {
                border-color: var(--WhiteFaded);
                outline: none;
                padding: .8rem;
                color: var(--White);
            }

            textarea {
                overflow: auto;
                height: 90%;
                background: transparent;
                font-family: var(--Main);
                resize: none;
            }
        }

        .itemPhoto {
            .photo {
                margin-top: .3rem;
                height: 90%;
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
                border: 1px solid var(--WhiteFaded);
            }
        }
    }
}

.add {
    margin-bottom: 3rem;

    .addBtn {
        grid-column: 3;
        margin: 0 1rem;
        text-transform: uppercase;
        letter-spacing: .1rem;
        font-weight: 700;
        font-size: 1rem;
        border: 1px solid var(--WhiteFaded);
    }
}

</style>