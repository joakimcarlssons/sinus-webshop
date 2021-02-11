<template>
<div class="container">
  <div class="arrow-up"></div>
  <div class="content">
      
      <input type="email" placeholder="email" v-model="credentials.email">

      <input type="password" placeholder="password" v-model="credentials.password">

      <p class="errorMessage" 
      :class="{'hide': !showErrorMessage, 'animate': showErrorMessage}" >{{errorText}}</p>

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

export default {
    // Local variables
    data(){ return {
        // Input credentials
        credentials : {
            email : "",
            password : ""
        },
        // Should be set to true if the user entered wrong credentials
        showErrorMessage: true,
        // This is the error text
        errorText: ""
    }},

    // Local methods
    methods: {
        // Attempt logIn
        async LogIn() {
            // Try to log in with the provided credentials
            let res = await this.$store.dispatch('login', this.credentials);

            // If login failed
            if(res.error) {
                // Show error message
                this.showErrorMessage = true;
                // Set error message
                this.errorText = res.response
            }
            // If login was successful
            else{
                // Hide error message (Even if the login view goes away)
                this.showErrorMessage = true;
                // Go to the account page
                this.$router.push('/account')
            } 

        }
    }
}
</script>

<style lang="scss" scoped>
.animate {
    animation: bounce-in-right 2s ease; 
}

.hide {
    display: none;
}

.container {
    position: relative;
    height: 100%;
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

        .errorMessage {
            overflow: hidden;
            margin-left: .5rem;
            color: red;  
            font-weight: bold;     
        }

        input {
            margin: .5rem;
            padding: 1rem;
        }

        .bottom {
            margin-top: 0rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            button {
                align-self: flex-end;
                margin: .5rem;
                padding-left: 3rem;
                padding-right: 3rem;
                border-radius: 2.5rem;
                margin-top: 2rem;
            }

            p {
                font-weight: 700;
                margin-left: .5rem;
                text-decoration: underline;
            }
        }

    }
}

</style>