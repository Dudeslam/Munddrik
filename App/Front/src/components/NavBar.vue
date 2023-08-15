<script setup lang="ts">
import { useMunddrikStore } from '../stores/MunddrikMSG';
const MunddrikStore = useMunddrikStore();

</script>

<template>
    <nav class="flex justify-evenly bg-green-600 text-white mb-5 px-12 w-screen">
        <RouterLink to="/"  class="NavBtn">Home</RouterLink>
        <RouterLink to="Editor" class="NavBtn">Editor</RouterLink>
        <RouterLink to="Game" :class="{disabled : !MunddrikStore.AllMessage.length}" class="NavBtn">Game</RouterLink>      
    </nav>
</template>

<style scoped>
.NavBtn {
    @apply  text-4xl px-3 text-white;
}

.disabled {
    @apply text-green-950 cursor-default;
}

</style>