<!-- <template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home1</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>s
  </header>

  <RouterView />
</template> -->

<template>
  <!-- <span>Message: {{ count }}</span>
  <div class="button" @click="count++">
    {{ count }}
  </div> -->
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'

const count = ref(0)

// function increment() {
//   // 在 JavaScript 中需要 .value
//   count.value++
// }

// // 不要忘记同时暴露 increment 函数
// return {
//   count,
//   increment
// }
</script>



<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  height: 3rem;
  background: pink;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
