<template>
  <transition
    enter-active-class="transition-all duration-200 ease-out"
    leave-active-class="transition-all duration-150 ease-in"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-if="isOpen" class="menu-dropdown fixed top-16 right-4 z-50 w-80 bg-eerie-black rounded-lg shadow-2xl border-2 border-gray-600 overflow-hidden backdrop-blur-sm">
      <nav class="flex flex-col bg-eerie-black">
        <a href="#" @click.prevent="handleNavigate('/greetings-list')" class="flex items-center gap-5 px-8 py-6 text-gray-200 text-2xl font-semibold no-underline transition duration-200 hover:bg-gray-700 hover:text-moonstone border-b-2 border-gray-700">
          <svg class="w-10 h-10 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          <span>Greetings</span>
        </a>
        
        <a href="#" @click.prevent="handleNavigate('/servers-list')" class="flex items-center gap-5 px-8 py-6 text-gray-200 text-2xl font-semibold no-underline transition duration-200 hover:bg-gray-700 hover:text-moonstone border-b-2 border-gray-700">
          <svg class="w-10 h-10 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
          </svg>
          <span>Servers</span>
        </a>
        
        <a href="#" @click.prevent="handleNavigate('/export')" class="flex items-center gap-5 px-8 py-6 text-gray-200 text-2xl font-semibold no-underline transition duration-200 hover:bg-gray-700 hover:text-moonstone">
          <svg class="w-10 h-10 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          <span>Export</span>
        </a>
      </nav>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['closeMenu']);

const closeMenu = () => {
  emit('closeMenu');
};

const handleNavigate = async (path: string) => {
  closeMenu();
  await navigateTo(path);
};
</script>
