<template>

    <div class="container">
        <img src="@/assets/sinus-logo.svg" alt="" class="mainLogo" :class="{animated : animationActive, slideInLeft : animationActive}">

        <router-link :to="'/products'" :class="{animated : animationActive, slideInRight : animationActive}">
          <button class="purchase">Handla nu!</button>
        </router-link>
    </div>

</template>

<script>
export default {
  data(){ return {
    animationActive : false
  }},

  created() {
    this.animationActive = true
    setTimeout(() => {
      this.animationActive = false
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>

.container {
  align-items: center;
  justify-content: center;
  height: 50vh;

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