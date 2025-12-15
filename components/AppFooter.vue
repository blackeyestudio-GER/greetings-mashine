<template>
  <footer class="w-full px-3 md:px-5 py-3 mt-auto drop-shadow-2xl flex flex-row items-center gap-3 md:gap-5 bg-eerie-black text-dim-gray border-t border-gray-700">
    <small class="text-xs md:text-sm">
      &copy; 2024 HelloBot. All rights reserved.
    </small>
    <div class="flex gap-3 md:gap-4 ml-auto items-center">
      <a 
        href="https://www.patreon.com/profile/creators?u=128227760" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="transition-transform duration-200 hover:scale-110"
        title="Support on Patreon"
      >
        <Icon icon="cib:patreon" class="w-6 h-6 md:w-7 md:h-7" style="color: #FF424D;" />
      </a>
      <a 
        href="https://ko-fi.com/blackeyestudio" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="transition-transform duration-200 hover:scale-110"
        title="Support on Ko-fi"
      >
        <Icon icon="simple-icons:kofi" class="w-6 h-6 md:w-7 md:h-7" style="color: #FF5E5B;" />
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<style scoped>
</style>