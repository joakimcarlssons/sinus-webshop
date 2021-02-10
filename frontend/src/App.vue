<template>
  <div id="app">

    <!-- Header -->
    <header>

      <router-link :to="'/'">
        <img 
        src="@/assets/sinus-logo.svg" 
        alt="sinus-logo-small" 
        class="logo"
        :style="$route.path == '/' ? 'opacity: 0' : 'opacity: 1'"
        >
      </router-link>

      <Nav @showProfile="openLoginDialog" @showCart="openCartDialog" />
    </header>

    <!-- Login overlay -->
    <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">
      <div class="logIn" v-if="showLogin">
        <LogIn />
      </div>
    </transition>

    <!-- Cart overlay -->
    <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">
      <div class="cart" v-if="showCart">
        <Cart />
      </div>
    </transition>

    <!-- Router view -->
    <router-view />

    <!-- Major overlay -->
    <transition
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut">
      <div class="overlay" v-if="chosenProduct">
        <ChosenProduct :product="chosenProduct" />
      </div>
    </transition>

  </div>
</template>

<script>
import Nav from '@/components/Nav'
import LogIn from '@/components/LogIn'
import ChosenProduct from '@/components/ChosenProduct'
import Cart from '@/components/Cart'
import { SAVE_USER } from '@/mutations.js'

export default { 
  components : { Nav, LogIn, ChosenProduct, Cart },

  data(){ return {
    showLogin : false,
    showCart : false
  }},

  computed: {
    chosenProduct() {
      return this.$store.state.currentProductToBeDisplayed
    }
  },

  methods : {
    openLoginDialog(value) {
      this.showLogin = value
    },
    openCartDialog(value) {
      this.showCart = value
    }
  },

  created() {

    //#region Set User

    // If a user is saved in local storage, set it in the store
    if(localStorage.getItem('current-user')) {
      this.$store.commit(SAVE_USER, {
        user : JSON.parse(localStorage.getItem('current-user')),
        token : JSON.parse(localStorage.getItem('sinus-token'))
      })
    }
    
    //#endregion

    //#region Fill Cart

    // If no cart is created, create one
    if(!sessionStorage.getItem('cart')) {
      this.$store.commit('resetCart')
    }
    
    // And if the page is refreshed, 
    // we want to load the session storage cart to the state cart
    else if (this.$store.state.user.cart == null) {
      this.$store.commit('getCartFromStorage')
    }

    //#endregion

  }
}
</script>

<style lang="scss">

/* Style imports */
@import url('~@/styles/globals.scss');
@import url('~@/styles/texts.scss');
@import url('~@/styles/forms.scss');
@import url('~@/styles/buttons.scss');
@import url('~@/styles/overlays.scss');
@import url('~@/styles/scrolls.scss');

#app {
  position: relative;
  margin:  0 2rem;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      width: 10rem;
      height: 10rem;
    }
  }


  /* Transitions */
  .zoomIn {
    animation: zoomIn .7s;
  }

  .fadeIn {
    animation: fadeIn .4s;
  }

  .fadeOut {
    animation: fadeOut .4s;
  }
}


</style>
