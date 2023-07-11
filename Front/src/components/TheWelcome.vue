<script setup lang="ts">
import { useMunddrikStore } from '../stores/MunddrikMSG';
const Munddrik = useMunddrikStore();
</script>

<template>
  <div class="container">
    <div class="row">
      <h1>{{Munddrik.Message}}</h1>
    </div>
  </div>
</template>

<style scoped>
.container{
  display: grid;
  min-height: 720px;
  border: 0.2rem solid black;
}

.row{
  padding: 1rem 2rem;
  text-align: center;
}
</style>