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
          <Icon icon="heroicons:chat-bubble-left-ellipsis-20-solid" class="w-10 h-10 flex-shrink-0" />
          <span>Greetings</span>
        </a>
        
        <a href="#" @click.prevent="handleNavigate('/servers-list')" class="flex items-center gap-5 px-8 py-6 text-gray-200 text-2xl font-semibold no-underline transition duration-200 hover:bg-gray-700 hover:text-moonstone border-b-2 border-gray-700">
          <Icon icon="heroicons:server-20-solid" class="w-10 h-10 flex-shrink-0" />
          <span>Servers</span>
        </a>
        
        <a href="#" @click.prevent="handleNavigate('/export')" class="flex items-center gap-5 px-8 py-6 text-gray-200 text-2xl font-semibold no-underline transition duration-200 hover:bg-gray-700 hover:text-moonstone border-b-2 border-gray-700">
          <Icon icon="heroicons:arrow-down-tray-20-solid" class="w-10 h-10 flex-shrink-0" />
          <span>Export</span>
        </a>
        
        <a href="#" @click.prevent="handleNavigate('/import')" class="flex items-center gap-5 px-8 py-6 text-gray-200 text-2xl font-semibold no-underline transition duration-200 hover:bg-gray-700 hover:text-moonstone border-b-2 border-gray-700">
          <Icon icon="heroicons:arrow-up-tray-20-solid" class="w-10 h-10 flex-shrink-0" />
          <span>Import</span>
        </a>
        
        <a href="#" @click.prevent="handleNavigate('/customization')" class="flex items-center gap-5 px-8 py-6 text-gray-200 text-2xl font-semibold no-underline transition duration-200 hover:bg-gray-700 hover:text-moonstone">
          <Icon icon="heroicons:swatch-20-solid" class="w-10 h-10 flex-shrink-0" />
          <span>Customization</span>
        </a>
      </nav>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

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
