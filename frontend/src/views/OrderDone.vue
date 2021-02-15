<template>
  <div class="container">

    <div class="mainImg">
      <h1>Thank you!</h1>
    </div>

    <div class="content">
        <h3>Your order is being processed, go out and skate while you wait</h3>
        <p>
            Vans California Daze rock and roll chicken wing pogo transfer. 
            Powerslide pivot slam Sidewalk Surfer durometer. Deck full-cab gap Old Ghosts ho-ho. 
            Invert melancholy feeble rocket air. Hanger rock and roll g-turn ledge.
            50-50 Kevin Harris boardslide street Mark Gonzales. Air pool hang-up fakie out
            Randy Ruiz. Steps nose bump powerslide axle set. Future Primitive Japan air snake
            steps camel back. Face plant crailtap rail slide half-cab. Rail regular footed flypaper drop in. 
            Casper slide speed wobbles indy grab ollie hole.
        </p>

        <button @click="$router.push('/')">Coolio!</button>
    </div>

  </div>
</template>

<script>
export default {

  // Local variables
  data(){ return {
    // User data in text fields
    userData: {
      name: "",
      email: "",
      password: ""
    }
  }},

  // Local methods
  methods: {
    // Register the new user
    register: async function() {
      // Register
      let res = await this.$store.dispatch('register', this.userData);

      if(res.error) res.response.forEach(err => {
        alert(err)
      });
      else alert("Account created")

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
    margin-top: 2rem;

    p, button {
    margin-top: 1rem;
    }

    button {
        padding: 1rem 2rem;
    }

  }

}

</style>