<template>
  <div class="container">
      <h4>{{message}}</h4>

        <div class="btns">
            <img src="@/assets/check-circle-solid.svg" alt="" @click="$emit('confirm', product)" />
            <img src="@/assets/times-circle-solid.svg" alt="" @click="$store.commit('resetOverlay')" />
        </div>

  </div>
</template>

<script>
export default {
    props: {
        product : Object,
        message : String
    }
}
</script>

<style lang="scss" scoped>

.container {
    position: fixed;
    top: 50%;
    left: 50%;    
    transform: translate(-50%, -50%);
    background-color: var(--White);
    padding: 5rem;

    .btns {
        display: flex;
        justify-content: center;

        img {
            margin: 2rem 1rem 0 1rem;
            height: 4rem;
            width: 4rem;

            &:hover {
                opacity: .7;
                cursor: pointer;
            }
        }
    }
}

</style>