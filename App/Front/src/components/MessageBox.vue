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
    <div class="row" v-else>
      <button class="tsvChoice" v-for="file in MunddrikStore.Files" @click.stop='chooseFile(file)'>{{ file }}</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container{
  display: grid;
  min-height: 720px;
  border: 0.2rem solid black;
}

.row{
  justify-content: space-between;
}

.tsvChoice{
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border: 2px solid black;

}

.row{
  padding: 1rem 2rem;
  text-align: center;
}
</style>