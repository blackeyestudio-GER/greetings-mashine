<template>
  <div class="w-full px-5 py-2 drop-shadow-2xl flex flex-row items-center justify-between bg-eerie-black content-start">
    <NuxtLink to="/" class="flex flex-row items-center gap-2">
      <span class="text-4xl text-moonstone">Greetings Machine</span>
    </NuxtLink>
    <button @click="emit('toggleMenu')" class="bg-transparent border-none cursor-pointer p-0">
      <svg class="w-8 h-8 text-moonstone" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['toggleMenu']);
</script>