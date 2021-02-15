<template>
  <div class="container">
      <h1>Seems like you found a place you don't belong at :(</h1>

      <button class="adminButton" @click="$router.push('/')">Go back to start</button>
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