<script setup lang="ts">
import { useMunddrikStore } from '../stores/MunddrikMSG';
import { message } from "../objects/message.ts";
import { ref } from 'vue';
import SaveIcon from './icons/saveIcon.vue';
import CrossIcon from './icons/crossIcon.vue'

const Munddrikstore = useMunddrikStore();

const isOpen = ref(false);
const isSaved = ref(false)
const newAdd = ref("");
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
  if(!newAdd.value){
    if(await Munddrikstore.SaveEdits(props.title)){
      isSaved.value = true;
    }
  }
  else{
    addToMessage()
    saveEdits()
  }
}

const addToMessage = () => {
  Munddrikstore.AllMessage.push({id: Munddrikstore.MsgSize, value: newAdd.value as string | null})
  newAdd.value = "";
}

const deleteMessage = (index: number) => {
  Munddrikstore.removeMsg(index);
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
            <span v-if="isSaved" class="font-bold text-green-600">Saved Succesfully</span>
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
                <div class="grid grid-flow-col justify-stretch border-b-2 pb-4 border-black">
                  <textarea class="border-2 border-gray-600  col-span-11 focus:outline-0 focus:h-20 resize-none h-7" placeholder="Add new entry" v-model="newAdd"></textarea>
                  <button class="formBtn" @click.prevent="addToMessage">+</button>
                </div>
                <div v-for="Edit in Munddrikstore.AllMessage" class="grid grid-flow-col justify-stretch mt-4">
                  <h3 class="fields col-span-1 mt-3">{{ Edit.id }}</h3>
                  <textarea class="fields focus:outline-0 focus:h-20 focus:overflow-scroll col-span-10 w-full h-7 mt-3 resize-none overflow-hidden" type="text" :key="Edit.id" v-model="(Edit.value as string)"></textarea>
                  <button class="formBtn mt-3" @click.prevent="deleteMessage(Edit.id)">x</button>
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

.formBtn{
  @apply border-black border-2 bg-green-600;
}

.fields{
  @apply border-2 border-e-gray-200 border-gray-600;
}
</style>