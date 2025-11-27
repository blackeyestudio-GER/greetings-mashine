<template>
  <div class="bg-night min-h-screen">
    <NuxtLoadingIndicator :throttle="0" :height="2" />
    <AppHeader @toggleMenu="isMenuOpen = !isMenuOpen" />
    <FullScreenMenu :isOpen="isMenuOpen" @closeMenu="isMenuOpen = false" />
    <div class="mx-auto max-w-screen-2xl px-2 my-2">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import AppHeader from '#/components/AppHeader.vue';
import FullScreenMenu from '#/components/FullScreenMenu.vue';

const isMenuOpen = ref(false);

// Verwende Nuxt's useState für den globalen Ansichtsmodus
const viewMode = useState<'greet' | 'edit-greetings' | 'edit-servers' | 'export'>('viewMode', () => 'greet');

// Wenn das Menü geschlossen wird, und der Viewmode auf export ist, muss das
// auf greet gewechselt werden, damit die normale Ansicht kommt.
watch(isMenuOpen, (newValue) => {
  if (!newValue && viewMode.value === 'export') {
    viewMode.value = 'greet';
  }
});

useHead({
  titleTemplate: (title) => title ? `${title} - Greetings Machine` : 'Greetings Machine',
});
</script>

<style scoped>
/* No scoped styles needed as Tailwind is used throughout */
</style>