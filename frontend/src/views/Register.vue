<template>
  <div class="container">

    <div class="mainImg">
      <h1>Join the rolling family!</h1>
    </div>

    <div class="content">

      <div class="info">
        <h3>Cowabunga</h3>
        <p>
          <strong>
            Skate impsum dolor sit amet, rip grip hip grab 540 pivot
            nose Tracker. Gnar bucket Skateboard Shuffle casper
            slide 180 boneless layback hardare nosebone.
          </strong>
        </p>
        <p>
          Vans California Daze rock and roll chicken wing pogo transfer.
          Powerslide pivot slam Sidewalk Surfer durometer. Deck full-cab
          gap Old Ghosts ho-ho. Invert melancholy feeble rocket air.
          Hanger rock and roll g-turn ledge. 50-50 Kevin Harris boardslide.
        </p>
      </div>

      <div class="form">
        <h3>Register</h3>

        <!-- Name -->
        <label for="name">Name</label>
        <input type="text" id="name" v-model="userData.name" v-on:keyup.enter="register">

        <!-- Email -->
        <label for="email">Email</label>
        <input type="text" id="email" v-model="userData.email" v-on:keyup.enter="register">

        <!-- Password -->
        <label for="password">Password</label>
        <input type="password" id="password" v-model="userData.password" v-on:keyup.enter="register">

        <!-- Confirm Password -->
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" v-model="userData.confirmPassword" v-on:keyup.enter="register">

        <!-- Error message -->
        <h4 class="errorMessage" v-if="errorMessage != ''">{{errorMessage}}</h4>

        <!-- Register button -->
        <button @click="register">Register!</button>

      </div>

    </div>

  </div>
</template>

<script>
import { LOGIN } from '@/mutations.js'

export default {

  // Local variables
  data(){ return {
    // User data in text fields
    userData: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    errorMessage : ''
  }},

  // Local methods
  methods: {
    // Register the new user
    register: async function() {
      // This can fail if the server is down...
      try{
        // Register
        let res = await this.$store.dispatch('register', this.userData);
  
        if(res.error) res.response.forEach(err => {
          this.errorMessage = err
        });
        else {
          let res = await this.$store.dispatch(LOGIN, {email:this.userData.email, password:this.userData.password })
          if(!res.error) this.$router.push('/account')
        }
      } catch {
          // Show error message 
          this.errorMessage = "Could not connect to server"
      }

    }
  },

  created() {
    this.$router.options.routes.find(x => x.path == '/register').inNavLink = true
  }

}
</script>

<style lang="scss" scoped>

.container {

  .mainImg {
    height: 45rem;
    background-image: url('~@/assets/skate-hero-1.jpg');
    background-size: cover;

    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      color: var(--White);
    }
  }

  .content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 2rem;

    .info {
      margin-right: 2rem;

      p:first-of-type {
        margin-top: 1rem;
      }

    }

    .form {
      display: flex;
      flex-direction: column;

      label:first-of-type {
        margin-top: 1rem;
      }

      input:last-of-type {
        margin-bottom: 2rem;
      }
    }
  }

  .errorMessage {
    color: red;
    margin-bottom: 1rem;
  }

}

@media screen and (max-width: 500px) {

  .container {
    .mainImg { text-align: center; }

    .content {
      grid-template-columns: 1fr;

      .info, .form { margin-bottom: 2rem; }
    }
  }

}

</style>