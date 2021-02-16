<template>
    <div class="container">

        <div class="close">
            <h2 @click="$emit('close')">X</h2>
        </div>

        <ul>
          <li
          v-for="(route, index) in navList"
          :key="index"
          >
              <router-link :to="route.path">
              {{route.name}}
              </router-link>

              <hr>
          </li>
        </ul>
        
    </div>
</template>

<script>
export default {
    props: {
        navList : Array
    }
}
</script>

<style lang="scss" scoped>

.container {
    color: var(--White);

    .close {
        align-self: flex-end;
        margin: 1rem 2rem;
    }

    ul {
        height: 70vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        li {
            display: flex;
            flex-direction: column;
            align-items: center;
            
            a {
                color: var(--White);
                text-transform: uppercase;
                letter-spacing: .2rem;
            }

            hr {
                width: 5rem;
                opacity: .3;
                margin: 2rem 0;
            }
        }

        li:last-of-type {
            hr {
                display: none;
            }
        }
    }
}

</style>