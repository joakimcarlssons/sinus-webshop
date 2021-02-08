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
        <input type="text" id="name">

        <!-- Email -->
        <label for="email">Email</label>
        <input type="text" id="email">

        <!-- Password -->
        <label for="password">Password</label>
        <input type="password" id="password">

        <!-- Register button -->
        <button>Register!</button>

      </div>

    </div>

  </div>
</template>

<script>
export default {

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

}

</style>