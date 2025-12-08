<template>
  <div class="p-5 bg-eerie-black rounded-lg text-gray-100">
    <section class="bg-gray-700 p-6 rounded-lg shadow-md">
      <!-- Regular Themes Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="theme in themes" 
          :key="theme.id"
          @click="selectTheme(theme.id)"
          class="cursor-pointer rounded-lg overflow-hidden transition-all duration-200 hover:scale-105"
          :class="selectedTheme === theme.id ? 'bg-gray-600 ring-2 ring-moonstone' : 'bg-night'"
        >
          <div class="p-5">
            <h3 class="text-xl font-bold text-gray-200 mb-1">{{ theme.name }}</h3>
            <p class="text-sm text-gray-400 mb-4">{{ theme.description }}</p>
            
            <!-- Color Stripes -->
            <div class="space-y-2">
              <div 
                v-for="(color, index) in theme.colors" 
                :key="index"
                class="h-8 rounded"
                :style="{ backgroundColor: color.hex }"
                :title="color.name"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Holiday Specials Divider -->
      <div class="flex items-center gap-4 my-8">
        <div class="flex-1 h-px bg-gray-600"></div>
        <div class="flex items-center gap-2 text-gray-300 font-semibold text-lg">
          <Icon icon="heroicons:sparkles-20-solid" class="w-6 h-6 text-moonstone" />
          Holiday Specials
          <Icon icon="heroicons:sparkles-20-solid" class="w-6 h-6 text-moonstone" />
        </div>
        <div class="flex-1 h-px bg-gray-600"></div>
      </div>

      <!-- Holiday Themes Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="theme in holidayThemes" 
          :key="theme.id"
          @click="selectTheme(theme.id)"
          class="cursor-pointer rounded-lg overflow-hidden transition-all duration-200 hover:scale-105"
          :class="selectedTheme === theme.id ? 'bg-gray-600 ring-2 ring-moonstone' : 'bg-night'"
        >
          <div class="p-5">
            <h3 class="text-xl font-bold text-gray-200 mb-1">{{ theme.name }}</h3>
            <p class="text-sm text-gray-400 mb-4">{{ theme.description }}</p>
            
            <!-- Color Stripes -->
            <div class="space-y-2">
              <div 
                v-for="(color, index) in theme.colors" 
                :key="index"
                class="h-8 rounded"
                :style="{ backgroundColor: color.hex }"
                :title="color.name"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useUserSettings } from '~/composables/useUserSettings';

const router = useRouter();
const { userSettings, loadSettings, saveSettings } = useUserSettings();

// Current selected theme
const selectedTheme = ref('default');

// Define available themes
const themes = [
  {
    id: 'default',
    name: 'Default',
    description: 'Ocean & Dark Teal',
    colors: [
      { name: 'Moonstone', hex: '#3AA1BD' },
      { name: 'Dim Gray', hex: '#869698' },
      { name: 'Eerie Black', hex: '#1C1E1E' },
      { name: 'Night', hex: '#111212' },
      { name: 'Dark Slate Gray', hex: '#1E4545' },
    ]
  },
  {
    id: 'light',
    name: 'Light',
    description: 'Bright & Clean',
    colors: [
      { name: 'Blue Accent', hex: '#2563EB' },
      { name: 'Medium Gray', hex: '#6B7280' },
      { name: 'Light Gray', hex: '#F3F4F6' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Dark Gray', hex: '#1F2937' },
    ]
  },
  {
    id: 'darcula',
    name: 'Darcula',
    description: 'JetBrains Classic',
    colors: [
      { name: 'Orange', hex: '#CC7832' },
      { name: 'Blue Gray', hex: '#A9B7C6' },
      { name: 'Dark Gray', hex: '#2B2B2B' },
      { name: 'Darker Gray', hex: '#3C3F41' },
      { name: 'Mid Gray', hex: '#313335' },
    ]
  },
  {
    id: 'coffee',
    name: 'Coffee',
    description: 'Warm & Cozy',
    colors: [
      { name: 'Saddle Brown', hex: '#8B4513' },
      { name: 'Chocolate', hex: '#D2691E' },
      { name: 'Dark Coffee', hex: '#3E2723' },
      { name: 'Coffee Brown', hex: '#4E342E' },
      { name: 'Light Coffee', hex: '#5D4037' },
    ]
  },
  {
    id: 'windows',
    name: 'Windows',
    description: 'Microsoft Classic',
    colors: [
      { name: 'Windows Blue', hex: '#0078D4' },
      { name: 'Light Blue', hex: '#50E6FF' },
      { name: 'Dark Gray', hex: '#171717' },
      { name: 'Mid Gray', hex: '#2D2D2D' },
      { name: 'Light Gray', hex: '#3D3D3D' },
    ]
  },
  {
    id: 'macos',
    name: 'macOS',
    description: 'Apple Aqua',
    colors: [
      { name: 'System Blue', hex: '#007AFF' },
      { name: 'Light Gray', hex: '#E5E5EA' },
      { name: 'Dark Gray', hex: '#1C1C1E' },
      { name: 'Mid Gray', hex: '#2C2C2E' },
      { name: 'Charcoal', hex: '#3A3A3C' },
    ]
  },
  {
    id: 'simpsons',
    name: 'Simpsons',
    description: 'Springfield Yellow',
    colors: [
      { name: 'Simpson Yellow', hex: '#FFD90F' },
      { name: 'Sky Blue', hex: '#2E8BC0' },
      { name: 'Dark Blue', hex: '#1B4965' },
      { name: 'Navy', hex: '#0D2C40' },
      { name: 'Dark Navy', hex: '#062130' },
    ]
  },
  {
    id: 'mario',
    name: 'Super Mario',
    description: 'Mushroom Kingdom',
    colors: [
      { name: 'Mario Red', hex: '#E52521' },
      { name: 'Luigi Green', hex: '#00A550' },
      { name: 'Blue', hex: '#049CD8' },
      { name: 'Dark Blue', hex: '#003F91' },
      { name: 'Black', hex: '#1A1A1A' },
    ]
  },
  {
    id: 'yoshi',
    name: 'Yoshi',
    description: 'Dinosaur Green',
    colors: [
      { name: 'Yoshi Green', hex: '#4BB74C' },
      { name: 'Light Green', hex: '#7ED957' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Light Gray', hex: '#E8E8E8' },
      { name: 'Gray', hex: '#C0C0C0' },
    ]
  },
  {
    id: 'pacman',
    name: 'Pac-Man',
    description: 'Arcade Classic',
    colors: [
      { name: 'Pac-Man Yellow', hex: '#FFFF00' },
      { name: 'Ghost Red', hex: '#FF0000' },
      { name: 'Ghost Cyan', hex: '#00FFFF' },
      { name: 'Maze Blue', hex: '#2121DE' },
      { name: 'Black', hex: '#000000' },
    ]
  },
  {
    id: 'snes',
    name: 'SNES',
    description: 'Super Nintendo',
    colors: [
      { name: 'Purple', hex: '#8A61C1' },
      { name: 'Light Purple', hex: '#B39ADB' },
      { name: 'Gray', hex: '#C1C1C1' },
      { name: 'Mid Gray', hex: '#5A5A5A' },
      { name: 'Dark Gray', hex: '#2E2E2E' },
    ]
  },
  {
    id: 'famicom',
    name: 'Famicom',
    description: 'Nintendo Red & White',
    colors: [
      { name: 'Famicom Red', hex: '#D8232A' },
      { name: 'Cream', hex: '#FFF5E0' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Light Gray', hex: '#E0E0E0' },
      { name: 'Dark Red', hex: '#8B1C1C' },
    ]
  },
  {
    id: 'atari',
    name: 'Atari',
    description: 'Rainbow Classic',
    colors: [
      { name: 'Orange', hex: '#FF6600' },
      { name: 'Red', hex: '#DC143C' },
      { name: 'Yellow', hex: '#FFD700' },
      { name: 'Black', hex: '#000000' },
      { name: 'Dark Gray', hex: '#1A1A1A' },
    ]
  },
  {
    id: 'xbox',
    name: 'Xbox',
    description: 'Microsoft Gaming',
    colors: [
      { name: 'Xbox Green', hex: '#107C10' },
      { name: 'Light Green', hex: '#80C342' },
      { name: 'Black', hex: '#0E0E0E' },
      { name: 'Dark Gray', hex: '#1E1E1E' },
      { name: 'Mid Gray', hex: '#2D2D2D' },
    ]
  },
  {
    id: 'playstation',
    name: 'PlayStation',
    description: 'Sony Blue',
    colors: [
      { name: 'PS Blue', hex: '#003087' },
      { name: 'Light Blue', hex: '#0070CC' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Light Gray', hex: '#E8E8E8' },
      { name: 'Black', hex: '#000000' },
    ]
  },
];

// Holiday themes
const holidayThemes = [
  {
    id: 'christmas',
    name: 'Christmas',
    description: 'Red & Green',
    colors: [
      { name: 'Christmas Red', hex: '#C41E3A' },
      { name: 'Forest Green', hex: '#165B33' },
      { name: 'Dark Green', hex: '#0F5132' },
      { name: 'Mid Green', hex: '#1B4332' },
      { name: 'Light Green', hex: '#2D6A4F' },
    ]
  },
  {
    id: 'halloween',
    name: 'Halloween',
    description: 'Spooky Orange & Purple',
    colors: [
      { name: 'Pumpkin Orange', hex: '#FF6600' },
      { name: 'Purple', hex: '#9B59B6' },
      { name: 'Dark Purple', hex: '#1A0B2E' },
      { name: 'Mid Purple', hex: '#2E1437' },
      { name: 'Light Purple', hex: '#3E2347' },
    ]
  },
  {
    id: 'valentine',
    name: 'Valentine',
    description: 'Pink & Romance',
    colors: [
      { name: 'Deep Pink', hex: '#FF1493' },
      { name: 'Hot Pink', hex: '#FF69B4' },
      { name: 'Dark Magenta', hex: '#4A1942' },
      { name: 'Magenta', hex: '#5E2750' },
      { name: 'Light Magenta', hex: '#723862' },
    ]
  },
  {
    id: 'stpatrick',
    name: 'St. Patrick',
    description: 'Lucky Green',
    colors: [
      { name: 'Jade', hex: '#00A86B' },
      { name: 'Emerald', hex: '#50C878' },
      { name: 'Dark Green', hex: '#0B6623' },
      { name: 'Forest Green', hex: '#1B7C2F' },
      { name: 'Green', hex: '#2E8B3A' },
    ]
  },
  {
    id: 'easter',
    name: 'Easter',
    description: 'Pastel Spring',
    colors: [
      { name: 'Orchid', hex: '#DA70D6' },
      { name: 'Gold', hex: '#FFD700' },
      { name: 'Khaki', hex: '#F0E68C' },
      { name: 'Beige', hex: '#E6D7B8' },
      { name: 'Tan', hex: '#D4C5A9' },
    ]
  },
  {
    id: 'newyear',
    name: 'New Year',
    description: 'Gold & Midnight',
    colors: [
      { name: 'Gold', hex: '#FFD700' },
      { name: 'Silver', hex: '#C0C0C0' },
      { name: 'Midnight', hex: '#191970' },
      { name: 'Dark Blue', hex: '#1E3A5F' },
      { name: 'Royal Blue', hex: '#4169E1' },
    ]
  },
];

// Select theme
const selectTheme = (themeId: string) => {
  selectedTheme.value = themeId;
  // Save to localStorage
  userSettings.value.theme.selectedTheme = themeId;
  saveSettings();
  
  // Apply theme immediately
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', themeId);
  }
};

// Load settings on mount
onMounted(() => {
  loadSettings();
  // Load selected theme from settings
  if (userSettings.value.theme.selectedTheme) {
    selectedTheme.value = userSettings.value.theme.selectedTheme;
  }
});
</script>

<style scoped>
/* No scoped styles needed as Tailwind is used throughout */
</style>

