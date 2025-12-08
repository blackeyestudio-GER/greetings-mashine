<template>
  <div class="bg-night min-h-screen" :data-theme="currentTheme" @click="handleOutsideClick">
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
import { ref, computed, watch, onMounted } from 'vue';
import AppHeader from '~/components/AppHeader.vue';
import FullScreenMenu from '~/components/FullScreenMenu.vue';
import AppFooter from '~/components/AppFooter.vue';
import { useUserSettings } from '~/composables/useUserSettings';

const isMenuOpen = ref(false);
const { userSettings, loadSettings } = useUserSettings();

// Current theme computed from user settings
const currentTheme = computed(() => {
  return userSettings.value.theme.selectedTheme || 'default';
});

// Apply theme to document element as well
watch(currentTheme, (newTheme) => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', newTheme);
  }
}, { immediate: true });

const handleOutsideClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  // Close menu if clicking outside and not on the menu button or dropdown
  if (isMenuOpen.value && !target.closest('.menu-dropdown') && !target.closest('button')) {
    isMenuOpen.value = false;
  }
};

// Load settings on mount
onMounted(() => {
  loadSettings();
  // Apply theme immediately
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', currentTheme.value);
  }
});

useHead({
  titleTemplate: (title) => title ? `${title} - Greetings Machine` : 'Greetings Machine',
});
</script>

<style scoped>
/* No scoped styles needed as Tailwind is used throughout */
</style>