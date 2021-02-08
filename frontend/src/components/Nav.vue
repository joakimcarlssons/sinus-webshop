<template>
  <nav>
      <ul>
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
          <li>
            <img src="@/assets/icon-bag-white.svg" alt="" class="bag" />
          </li>
      </ul>
  </nav>
</template>

<script>
export default {
    computed: {

        // Get all the visible nav items
        visibleNavItems() {

            // Get all standard items
            return this.$router.options.routes.filter(x => x.inNavLink)
        }
    },

    data() { return {
        showProfileDialog : false
    }},

    methods: {
        openLoginDialog() {
            this.showProfileDialog = !this.showProfileDialog
            this.$emit('showProfile', this.showProfileDialog)
        }
    }
}
</script>

<style lang="scss" scoped>

nav {
    
    ul {
        display: flex;
        align-items: center;

        li {
            margin: 0 1rem;

            img {
                height: 1.5rem;
                width: 1.5rem;
                padding: 1rem;
                border-radius: 100%;

                &.user {
                    background-color: var(--MediumGrey);
                }

                &.bag {
                    background-color: var(--Grapefruit);
                }
            }

            .router-link-exact-active {
                font-weight: 700;
                text-decoration: underline;
            }
        }
    }
}

</style>