<template>
  <div class="container">
      <h1>Session expired :(</h1>

      <button class="adminButton" 
      @click="$store.commit('changeOverlay', { name: 'login', active: true })">Log back in</button>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.container {
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  button {
    margin: 2rem;
    padding: 2rem;
  }
}

</style>