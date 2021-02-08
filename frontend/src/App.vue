<template>
  <div id="app">

    <!-- Header -->
    <header>
      <img src="@/assets/sinus-logo.svg" alt="sinus-logo" class="logo">

      <Nav @showProfile="openLoginDialog" />
    </header>

    <!-- Login overlay -->
    <div class="logIn" v-if="showLogin">
      <LogIn />
    </div>

    <!-- Router view -->
    <router-view/>

    <!-- Major overlay -->
    <div class="overlay" v-if="chosenProduct">
      <ChosenProduct :product="chosenProduct" />
    </div>

  </div>
</template>

<script>
import Nav from '@/components/Nav'
import LogIn from '@/components/LogIn'
import ChosenProduct from '@/components/ChosenProduct'

export default { 
  components : { Nav, LogIn, ChosenProduct },

  data(){ return {
    showLogin : false,
  }},

  computed: {
    chosenProduct() {
      return this.$store.state.currentProductToBeDisplayed
    }
  },

  methods : {
    openLoginDialog(value) {
      this.showLogin = value
    }
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

}

</style>
