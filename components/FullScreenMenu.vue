<template>
  <transition
    enter-active-class="transition-opacity duration-300 ease-in-out"
    leave-active-class="transition-opacity duration-300 ease-in-out"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpen" class="fixed inset-0 w-full h-full bg-eerie-black bg-opacity-95 flex justify-center items-center z-50 backdrop-blur-sm">
      <div class="relative text-center p-5 w-4/5 max-w-xl">
        <button @click="closeMenu" class="absolute top-5 right-5 bg-transparent border-none cursor-pointer p-0">
          <svg class="w-8 h-8 text-dark-slate-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <nav class="flex flex-col gap-5">
          <a href="#" @click="navigateTo('greet')" class="block text-gray-100 text-4xl no-underline py-3 transition duration-300 ease-in-out hover:text-dark-slate-gray-darker hover:translate-x-3 sm:text-2xl">Begrüßen</a>
          
          <span class="block text-dim-gray text-3xl font-bold pt-8 pb-1 pointer-events-none sm:text-xl">Optionen</span>
          
          <a href="#" @click="navigateTo('edit-greetings')" class="block text-gray-300 text-2xl no-underline pl-8 py-3 transition duration-300 ease-in-out hover:text-dark-slate-gray-darker hover:translate-x-3 sm:text-lg">Begrüßungen bearbeiten</a>
          <a href="#" @click="navigateTo('edit-servers')" class="block text-gray-300 text-2xl no-underline pl-8 py-3 transition duration-300 ease-in-out hover:text-dark-slate-gray-darker hover:translate-x-3 sm:text-lg">Server bearbeiten</a>
          
          <a href="#" @click="navigateTo('export')" class="block text-gray-100 text-4xl no-underline py-3 transition duration-300 ease-in-out hover:text-dark-slate-gray-darker hover:translate-x-3 sm:text-2xl">Export</a>
        </nav>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['closeMenu']);

const viewMode = useState<'greet' | 'edit-greetings' | 'edit-servers' | 'export'>('viewMode');

const closeMenu = () => {
  emit('closeMenu');
};

const navigateTo = (mode: 'greet' | 'edit-greetings' | 'edit-servers' | 'export') => {
  viewMode.value = mode;
  closeMenu();
};
</script>
