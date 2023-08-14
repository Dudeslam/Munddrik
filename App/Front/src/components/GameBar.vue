<script setup lang="ts">
import refreshIcon from "./icons/refreshIcon.vue"
import DrinkIcon from "./icons/DrinkIcon.vue"
import { useMunddrikStore } from "../stores/MunddrikMSG.ts";

const MunddrikStore = useMunddrikStore();
defineProps<{
  msg: string
}>()


</script>

<template>
  <div class="greetings">
    <a type="button" class="btn" onmouseover="" @click="MunddrikStore.haeld"><DrinkIcon/></a>  
    <h1 class="green">{{ msg }}</h1>
    <button type="button" onmouseover="" class="btn" @click.stop="MunddrikStore.roll"><refreshIcon/></button>
  </div>
  <h3 class="pt-5">
      Drikke spillet hvor man hælder i munden eller laver noget andet!
    </h3>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
  color: black;
}

.greetings{
  display:flex;
  justify-content: center !important;
}
.greetings h1,
.greetings h3 {
  text-align: center;
  width:50%;
  display: inline-block;
}



@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: center;
  }
}
</style>
