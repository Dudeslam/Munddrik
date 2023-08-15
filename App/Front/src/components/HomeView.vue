<script setup lang="ts">
import { onMounted } from 'vue';
import { useMunddrikStore } from '../stores/MunddrikMSG';
const MunddrikStore = useMunddrikStore();

function chooseFile(name : string) {
  MunddrikStore.loadFile(name);
}

onMounted(()=>{
  MunddrikStore.Files=[];
  MunddrikStore.loadCookie();
  console.log("loaded")
})
</script>

<template>
<h1 class="text-4xl text-green-600">Munddrik</h1>
<h3 class="text-2xl text-green-600 mt-6 mb-6">Vælg venligst en fil</h3>
<h3 class="text-1xl text-green-600 mt-6 mb-12" v-if="MunddrikStore.AllMessage.length">Fil: {{ MunddrikStore.CurrentFile }} er blevet hentet</h3>
  <div class="px-4 grid grid-cols-4 justify-evenly gap-x-5 gap-y-4">
      <button class="btn" v-for="file in MunddrikStore.Files" @click.stop='chooseFile(file)'>{{ file }}</button>
  </div>
</template>
