<template>
  <div class="w-full px-5 py-2 drop-shadow-2xl flex flex-row items-center justify-between bg-eerie-black content-start">
    <NuxtLink to="/" class="flex flex-row items-center gap-2">
      <span class="text-4xl text-moonstone">Greetings Machine</span>
    </NuxtLink>
    <button @click="emit('toggleMenu')" class="bg-transparent border-none cursor-pointer p-0">
      <Icon icon="heroicons:cog-6-tooth-20-solid" class="w-8 h-8 text-moonstone" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

const emit = defineEmits(['toggleMenu']);
</script>