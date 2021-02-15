<template>
    <div class="container">
        <img src="@/assets/sinus-logo.svg" alt="" class="mainLogo">

        <router-link :to="'/products'">
          <button class="purchase">Handla nu!</button>
        </router-link>
    </div>
</template>

<style lang="scss" scoped>

.container {

  align-items: center;

  img {
    max-height: 20rem;
  }

  .purchase {
    padding: 2rem;
    border-radius: 0;
    text-transform: uppercase;
    letter-spacing: .5rem;
    font-weight: 700;
    margin-top: 5rem;
  }
}

</style>