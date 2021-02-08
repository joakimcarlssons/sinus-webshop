<template>
<div class="container">
  <div class="arrow-up"></div>
  <div class="content">
      
      <input type="text" placeholder="username">

      <input type="password" placeholder="password">

      <div class="bottom">
        <router-link :to="'/'"><p>Don't have an account?</p></router-link>
        <button>Login</button>
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