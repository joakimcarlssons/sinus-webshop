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
                <div class="photo" :style="{backgroundImage : newProductImg}"></div>
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

            <div class="radioImages">
                <ul>
                    <li
                    v-for="(image, index) in images"
                    :key="index"
                    >
                        <input type="radio" :id="index" :value="image.url" v-model="newProduct.imgFile">
                        <label :for="index">{{image.name}}</label>
                    </li>
                </ul>
            </div>
            <button class="adminButton" @click="addProduct">Add new product</button>
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
            <div class="radioImages">
                <ul>
                    <li
                    v-for="(image, index) in images"
                    :key="index"
                    >
                        <input type="radio" :id="index" :value="image.url" v-model="selectedProduct.imgFile">
                        <label :for="index">{{image.name}}</label>
                    </li>
                </ul>
            </div>

        <button class="adminButton" :disabled="!productChanged" @click="updateProduct">Update product</button>

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
      newProduct : {
          title:     "",
          shortDesc: "",
          longDesc:  "",
          price:     0,
          imgFile : "skateboard-generic.png"
      },

      backupProduct: {},
      showAdd : false,
      showEdit : false,
      images : [
          {
              name : "Skateboard",
              url : "skateboard-generic.png"
          },          
          {
              name : "Greta",
              url : "skateboard-greta.png"
          },          
          {
              name : "Black Shirt",
              url : "hoodie-ash.png"
          },          
          {
              name : "Red Shirt",
              url : "hoodie-fire.png"
          },
          {
              name : "Blue Shirt",
              url : "hoodie-ocean.png"
          },
          {
              name : "Red Wheel",
              url : "wheel-rocket.png"
          },
          {
              name : "White Wheel",
              url : "wheel-spinner.png"
          },
          {
              name : "Blue Wheel",
              url : "wheel-wave.png"
          },
      ]
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
    },

    // Get the correct product image when adding products
    newProductImg(){
        if(this.newProduct.imgFile) {
            return 'url(' + require(`@/assets/${this.newProduct.imgFile}`) + ')'
        }
        else return ''
    },

    productChanged() {
        if (JSON.stringify(this.backupProduct) === JSON.stringify(this.selectedProduct)) return false;

        return true;
    }
  },

  created() {
    this.$store.dispatch(GET_ALL_PRODUCTS)
  },

  methods: {
      setSelectedProduct(product, flag) {
            if(!flag) {
                // If this is not the first selected item
                if(this.setSelectedProduct)
                    // restore from backup
                    Object.assign(this.selectedProduct, this.backupProduct);
                // Set the selected product
                this.selectedProduct = product
                // Create backup
                Object.assign(this.backupProduct, product);              
            }
      },
      // Fires when the 'delete' button is pressed on a product
      async removeProduct(product) {
          // Delete the product
          let res = await this.$store.dispatch('deleteProduct', product._id);
          // Alert product if it could be deleted
          if(!res.error) alert(res.response.message);
          // Show error messag if product could not be deleted
          else alert(res.response.error);
      },
      async updateProduct() {
          // Update the product
          let res = await this.$store.dispatch('updateProduct', this.selectedProduct);
          // Alert product if it could be updated
          if(!res.error) alert(res.response.message);
          // Show error messag if product could not be updated
          else alert(res.response.error);
      },
      // Fires when the 'Add new product' button is pressed
      async addProduct() {
          // Declare switch to tell if product contain empty values
          let containsEmpty = false;
          // Loop through all prop values in the product
          Object.values(this.newProduct).forEach(val => {
              // If value if null of empty
              if(!val || val === '') containsEmpty = true;
          })

          // Create the product
          if(!containsEmpty) {
              // Create product
              let res = await this.$store.dispatch('createProduct', this.newProduct)
              // Alert user if no error was present
              if(!res.error) alert("product created")
          }
      }
  }
}
</script>

<style lang="scss" scoped>

.container {
    h1, h4 {
        text-transform: uppercase;
    }
    
    .bottom {
        display: flex;
        justify-content: space-between;
        width: 100%;
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
        grid-template-columns: repeat(6, 1fr);

        .adminButton {
            align-self: flex-start;
            grid-column: 5 / span 2;
        }

        .itemColumn {
            grid-column: 3 / span 2;

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

        .itemDescription {
            grid-column: 5 / span 2;
        }

        .itemPhoto {
            grid-column: 1 / span 2;

            .photo {
                margin-top: .3rem;
                height: 90%;
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
                border: 1px solid var(--WhiteFaded);
            }
        }

        .radioImages {
            grid-column: 1 / span 2;
            
            ul {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                margin-left: 1rem;

                li {
                    display: flex;
                    align-items: center;

                    label {
                        margin-left: .3rem;
                        font-size: 1.1rem;
                        letter-spacing: .1rem;
                    }
                }
            }
        }
    }
}

.add {
    margin-bottom: 3rem;
}

</style>