<script setup lang="ts">
// import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import './tailwind.css'

</script>

<template>
    <NavBar></NavBar>
    <div class="center">
  </div>
  <RouterView></RouterView>
</template>

<style scoped>
.center{
  padding-top:1rem;
  padding-bottom: 1rem;
  display: flex;
  text-align: center;
  justify-content: center;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a:first-of-type {
  border: 0;
}
</style>
