<template>
  <nav>
      <ul v-if="deviceWidth < 580" class="mobile">

          <li>
              <img 
              src="@/assets/bars-solid.svg" 
              alt=""
              class="bars"
              @click="toggleMobileNav"
              >
          </li>
          <li>
            <img 
            src="@/assets/icon-user-black.svg" 
            alt="" 
            class="user"
            @click="openLoginDialog"
            />
          </li>
          <li class="navCart">
            <img src="@/assets/icon-bag-white.svg" 
            alt="" 
            class="bag"
            @click="openCartDialog"
            @mouseover="counterOpacity = 0"
            @mouseleave="counterOpacity = 1"
            />
                <div 
                class="counter"         
                :style="`opacity: ${counterOpacity};`" 
                v-if="cartQuantity > 0"
                :class="{flipInY : counterAnimationActive}"
                >
                {{cartQuantity}}
            </div>
          </li>

      </ul>
      <ul v-else>
          <li
          v-for="(route, index) in visibleNavItems"
          :key="index"
          >
              <router-link :to="route.path">
              {{route.name}}
              </router-link>
          </li>
          <li>
            <img 
            src="@/assets/icon-user-black.svg" 
            alt="" 
            class="user"
            @click="openLoginDialog"
            />
          </li>
          <li class="navCart">
            <img src="@/assets/icon-bag-white.svg" 
            alt="" 
            class="bag"
            @click="openCartDialog"
            @mouseover="counterOpacity = 0"
            @mouseleave="counterOpacity = 1"
            />
            <div 
            class="counter"         
            :style="`opacity: ${counterOpacity};`" 
            v-if="cartQuantity > 0"
            :class="{flipInY : counterAnimationActive}"
            >
                {{cartQuantity}}
            </div>
          </li>
      </ul>

    <!-- Mobile Nav overlay -->
    <transition
    enter-active-class="animated slideInDown"
    leave-active-class="animated slideOutUp">
      <div class="overlay" v-if="activeOverlay.name == 'mobileNav' && activeOverlay.active">
        <MobileNav :navList="visibleNavItems" @close="toggleMobileNav" />
      </div>
    </transition>
  </nav>
</template>

<script>
import MobileNav from '@/components/MobileNav'

export default {
    components: { MobileNav },

    computed: {        
        // Get the cart quantity
        // We make it a property to trigger animations on updates
        cartQuantity() {
            return this.$store.getters.cartQuantity
        },

        currentUser() {
            return this.$store.state.user.currentUser
        },

        currentRoutePath() {
            return this.$store.state.currentRoutePath
        },

        visibleNavItems() {
            return this.$store.state.visibleNavItems
        },

        activeOverlay() {
            return this.$store.state.overlay
        },

        deviceWidth() {
            return this.$store.state.deviceWidth
        }
    },

    watch: {

        cartQuantity: function () {
            // Activate the animation
            this.counterAnimationActive = true

            // Turn it off after it's done
            setTimeout(() => {
                this.counterAnimationActive = false
            }, 900)
        }
    },

    data() { return {
        counterOpacity : 1,
        counterAnimationActive : false,
    }},

    methods: {
        openLoginDialog() {
            if(this.$store.state.overlay.active) {
                this.$store.commit('resetOverlay')
            }
            else {
                this.$store.commit('changeOverlay', { name: 'login', active: true })
            }
        },

        openCartDialog() {

            if(this.$store.state.overlay.active) {
                this.$store.commit('resetOverlay')
            }
            else {
                this.$store.commit('changeOverlay', { name: 'cart', active: true })
            }
        },

        toggleMobileNav() {
            if(this.$store.state.overlay.active) {
                this.$store.commit('resetOverlay')
            }
            else {
                this.$store.commit('changeOverlay', { name: 'mobileNav', active: true })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
nav {
    overflow: hidden;
    ul {
        display: flex;
        align-items: center;

        li {
            margin: 0 1rem;

            &.navCart {
                align-self: flex-start;
                display: flex;
                overflow: hidden;

                .counter {
                    align-self: flex-start;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    background-color: var(--White);
                    height: 1rem;
                    width: 1rem;
                    overflow: hidden;
                    padding: .5rem;
                    margin-left: -1rem;
                    margin-right: .2rem;

                    border-radius: 100%;
                    font-weight: 700;
                    box-shadow: .2rem .1rem .4rem 0 rgba(0,0,0,0.21);
                }
            }

            img {
                height: 1.5rem;
                width: 1.5rem;
                padding: 1rem;
                border-radius: 100%;
                cursor: pointer;

                &.user {
                    background-color: var(--MediumGrey);
                }

                &.user:hover {
                    opacity: .6;
                }

                &.bag {
                    background-color: var(--Grapefruit);
                }

                &.bag:hover {
                    opacity: .8;
                }
            }

            .router-link-exact-active {
                font-weight: 700;
                text-decoration: underline;
            }
        }
    }
}

.flipInY {
    animation: flipInY .8s;
}

@media screen and (max-width: 285px) {

    .mobile {

        .navCart {
            .counter {
                font-size: .8rem;
                height: .3rem;
                width: .3rem;
                padding: .5rem;
                margin-left: -.7rem;
                margin-right: .2rem;
            }
        }

        img {
            height: 1.1rem;
            width: 1.1rem;
            padding: .5rem;
        }
    }
}

</style>