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

      <Nav />
    </header>

    <!-- Login overlay -->
    <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">
      <div :class="{logInOverlay : !$store.state.user.currentUser, logOutOverlay : $store.state.user.currentUser}" 
      v-if="activeOverlay.name == 'login' && activeOverlay.active">
        <LogIn />
      </div>
    </transition>

    <!-- Cart overlay -->
    <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">
      <div class="cart" v-if="activeOverlay.name == 'cart' && activeOverlay.active">
        <Cart />
      </div>
    </transition>

    <!-- Router view -->
    <router-view />

    <!-- Major overlay -->
    <transition
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut">
      <div class="overlay" v-if="chosenProduct && activeOverlay.name == 'product' && activeOverlay.active">
        <ChosenProduct :product="chosenProduct" />
      </div>
    </transition>

  </div>
</template>

<script>

//#region  Imports
import Nav from '@/components/Nav'
import LogIn from '@/components/LogIn'
import ChosenProduct from '@/components/ChosenProduct'
import Cart from '@/components/Cart'
import { SAVE_USER } from '@/mutations.js'

//#endregion

export default { 
  components : { Nav, LogIn, ChosenProduct, Cart },

  
    Confirmationdata(){ return {
    showLogin : false,
    showCart : false
  }},

  computed: {
    chosenProduct() { return this.$store.state.currentProductToBeDisplayed },
    activeOverlay() { return this.$store.state.overlay },  
  },

  watch: {

    // Things that will happend every time a route changes
    '$route': function() {

      // Make sure to close all overlays when changing page
      this.$store.commit('resetOverlay')


      //#region Nav links
      try {

        // Update the nav links
        if(this.$route.fullPath == '/register') {
          this.$router.options.routes.find(x => x.path == this.$route.fullPath).inNavLink = true
        }

        // If the user is logged in, My account will be shown in the navbar
        else if(JSON.parse(localStorage.getItem('current-user'))) {
          let routeItem = this.$router.options.routes.find(x => x.path == this.$route.fullPath)
          routeItem.inNavLink = true
          routeItem.defaultVisibility = true

          // If the logged in user is an admin, also show the admin navigation
          if (JSON.parse(localStorage.getItem('current-user')).role == 'admin') {
            let adminRouteItem = this.$router.options.routes.find(x => x.path == '/admin')
            adminRouteItem.inNavLink = true
            adminRouteItem.defaultVisibility = true
          }
        }

        // Reset to default mode 
        else this.$store.commit('resetVisibleNavItems')
      }

      // Make sure the nav bar is updated
      finally { this.$store.commit('setVisibleNavItems', this.$router.options.routes.filter(x => x.inNavLink)) }


      //#endregion
    }
  },

  created() {

    //#region Set initial nav links

    // Check if it's the start page...
    if(this.$route.fullPath == '/') this.$store.commit('setVisibleNavItems', this.$router.options.routes.filter(x => x.inNavLink))
    
    // Else activate the current path aswell
    else {
      this.$router.options.routes.find(x => x.path == this.$route.fullPath).inNavLink = true
      this.$store.commit('setVisibleNavItems', this.$router.options.routes.filter(x => x.inNavLink))
    }

    //#endregion

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
@import '~@/styles/lists.scss';

@keyframes bounce-in-right {
  0% {
    opacity: 0;
    transform: translateX(2000px);
  }
  60% {
    opacity: 1;
    transform: translateX(-30px);
  }
  80% { transform: translateX(10px); }
  100% { transform: translateX(0); }
}

#app {
  min-height: 100vh;
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
