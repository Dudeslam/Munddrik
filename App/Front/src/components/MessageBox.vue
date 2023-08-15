<script setup lang="ts">
import { useMunddrikStore } from '../stores/MunddrikMSG';
const MunddrikStore = useMunddrikStore();
</script>

<template>
  <div class="w-auto margin border-2 border-black py-3 px-5 h-screen justify-center">
      <h1 class="text-4xl">{{MunddrikStore.Message}}</h1>
  </div>
</template>

<style scoped lang="scss">

</style>