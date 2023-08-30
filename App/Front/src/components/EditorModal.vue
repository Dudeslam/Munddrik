<script setup lang="ts">
import { useMunddrikStore } from '../stores/MunddrikMSG';
import { message } from "../objects/message.ts";
import { ref } from 'vue';
import SaveIcon from './icons/saveIcon.vue';
import CrossIcon from './icons/crossIcon.vue'

const Munddrikstore = useMunddrikStore();

const isOpen = ref(false);
const isSaved = ref(false)
let Edit: message[];

const props = withDefaults(defineProps<{
    title: string;
  }>(), {
    title: ""
  }
)
const emit = defineEmits(['Edit'])

function openEditor(file: string) {
  isOpen.value= true;
  Munddrikstore.EditFile(file)
  Munddrikstore.AllMessage.forEach(element => {
    Edit.push(element)
  });
}

async function saveEdits() {
  if(await Munddrikstore.SaveEdits()){
    isSaved.value = true;
  }
}

function close() {
  isOpen.value = false;
  emit("Edit");
  isSaved.value = false;
}
</script>

<template>
  <button class="btn" @click.stop="openEditor(props.title)"> {{ props.title }}</button>
  <Teleport to="body">
    <Transition>
      <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-10" v-if="isOpen">
      <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="close()"></div>
      <div class="absolute max-h-0.5 max-w-screen-md">
        <div class="overflow-scroll fixed left-[8%] right-2/4 bottom-[10%] h-4/5 w-10/12 bg-white md:rounded">
          <div class="sticky top-0 px-4 py-4 leading-none flex justify-between items-center font-medium text-sm bg-gray-100 border-b select-none">
            <h3>{{ props.title }}</h3>
            <span v-if="isSaved" class="font-bold text-green-600">Successfully saved</span>
            <div class="space-x-4 items-center flex">
            <button class="modalBtn ps-7" @click="saveEdits()"><SaveIcon></SaveIcon></button>
            <button @click="close()" class="modalBtn ps-6">
              <CrossIcon></CrossIcon>
            </button>
          </div>
          </div>

          <div class="px-4 py-4">
            <div class="max-h-fit">
              <form >
                <div v-for="Edit in Munddrikstore.AllMessage" class="grid grid-flow-col justify-stretch">
                <h3 class="border-2 border-e-gray-200 border-gray-600 col-span-1 mt-4">{{ Edit.id }}</h3>
                <input class="border-2 border-s-gray-200 border-gray-600 col-span-11 w-full mt-4" type="text" @id="Edit.id" v-model="Edit.value">
                </div>
              </form>
            </div>
              <div>
          </div>
        </div>
        </div>
      </div>
    </div>
    </Transition>
  </Teleport>

</template>

<style scoped lang="scss">
.modalBtn{
  @apply border-black border-2 w-24 h-12 text-lg bg-green-600;
}
</style>