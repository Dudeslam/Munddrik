<script setup lang="ts">
import { onMounted } from 'vue';
import { useMunddrikStore } from '../stores/MunddrikMSG';
const MunddrikStore = useMunddrikStore();

function chooseFile(name : string) {
  MunddrikStore.loadFile(name);
}


onMounted(()=>{
  MunddrikStore.loadDataFiles();
  console.log("loaded")
})
</script>

<template>
  <div class="container">
    <div v-if="MunddrikStore.Message" class="row">
      <h1>{{MunddrikStore.Message}}</h1>
    </div>
    <div v-else>
      <button class="tsvChoice" v-for="file in MunddrikStore.Files" :v-click='chooseFile(file)'>{{ file }}</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container{
  display: grid;
  min-height: 720px;
  border: 0.2rem solid black;
}

.tsvChoice{
  width: fit-content;
  border: black 1px solid;
  background-color: white;
  :hover{
    transition: 0.5s;
    background-color: rgb(0, 255, 147);
    // color: black;
  }
}

.row{
  padding: 1rem 2rem;
  text-align: center;
}
</style>