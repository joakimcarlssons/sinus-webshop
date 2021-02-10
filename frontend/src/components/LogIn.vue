<template>
<div class="container">
  <div class="arrow-up"></div>
  <div class="content">
      
      <input type="email" placeholder="email" v-model="credentials.email">

      <input type="password" placeholder="password" v-model="credentials.password">

      <div class="bottom">
        <router-link :to="'/register'" @click.native="$emit('show', false)">
            <p>Don't have an account?</p>
        </router-link>

        <button @click="LogIn">
            Login
        </button>
      </div>
  </div>
</div>
</template>

<script>
//import axios from 'axios'

export default {

    data(){ return {
        credentials : {
            email : "",
            password : ""
        }
    }},

    // Local methods
    methods: {

        // Attempt logIn
        async LogIn() {

            // Try to log in with the provided credentials
            let res = await this.$store.dispatch('login', this.credentials);

            if(res.error) alert(res.response)
            else this.$router.push('/account')
        }
    }
}
</script>

<style lang="scss" scoped>

.container {
    position: relative;

    .arrow-up {
        position: absolute;
        left: 77%;
    }

    .content {
        background-color: var(--White);
        margin-top: .8rem;
        padding: 2.9rem;

        display: flex;
        flex-direction: column;

        input {
            margin: .5rem;
            padding: 1rem;
        }

        .bottom {
            margin-top: .5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            button {
                align-self: flex-end;
                margin: .5rem;
                padding-left: 3rem;
                padding-right: 3rem;
                border-radius: 2.5rem;
            }

            p {
                font-weight: 700;
                text-decoration: underline;
            }
        }

    }
}

</style>