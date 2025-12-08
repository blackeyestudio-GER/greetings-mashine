<template>
  <div class="p-5 bg-eerie-black rounded-lg text-gray-100">
    <h2 class="text-dark-slate-gray mb-5 text-center">Server List</h2>
    
    <div v-if="servers.length === 0" class="text-center text-gray-400 py-8">
      <p class="mb-4">Noch keine Server hinzugefügt.</p>
      <p class="text-sm">Gehe zu "Server bearbeiten" um Server hinzuzufügen.</p>
    </div>
    
    <ul class="list-none p-0">
      <li v-for="(server, index) in servers" :key="index" class="bg-gray-700 p-4 mb-5 rounded-lg shadow-md">
        <div class="flex items-center cursor-pointer mb-3 pb-3 border-b border-gray-600" @click="toggleServerExpansion(index)">
          <input type="checkbox" :checked="!!server.lastGreeted" disabled class="mr-3 w-5 h-5 accent-green-500" />
          
          <!-- Server Icon -->
          <div v-if="server.icon" class="w-8 h-8 rounded-full overflow-hidden bg-gray-600 flex-shrink-0 mr-3">
            <img :src="server.icon" alt="Server Icon" class="w-full h-full object-cover" />
          </div>
          <div v-else class="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0 mr-3">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
            </svg>
          </div>
          
          <h3 class="text-dim-gray m-0 flex-grow">{{ server.name }}</h3>
          <svg :class="{'w-6 h-6 text-dim-gray transition-transform duration-300 ease-in-out': true, 'rotate-180': expandedServers[index]}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>

        <div v-if="expandedServers[index]">
          <div v-if="todayGreetings.length === 0" class="text-center text-gray-400 py-4">
            <p class="text-sm">Keine Begrüßungen für heute verfügbar.</p>
            <p class="text-xs mt-2">Gehe zu "Begrüßungen bearbeiten" um Nachrichten hinzuzufügen.</p>
          </div>
          
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
            <div v-for="(greeting, msgIndex) in getRandomGreetings(5)" :key="msgIndex" class="bg-night p-4 rounded-md shadow-sm flex flex-col justify-between">
              <p class="mt-0 mb-4 text-gray-200 text-sm leading-tight">{{ greeting.text }}</p>
              <div class="flex gap-3 flex-wrap">
                <button @click="copyToClipboardAndOpenLink(greeting.text, server.url, server.name)" class="px-3 py-2 border-none rounded cursor-pointer text-xs transition-all duration-200 ease-in-out text-white text-center flex items-center justify-center flex-grow bg-dark-slate-gray hover:bg-dark-slate-gray-darker">
                  <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  Copy & Open
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Server, Greeting } from '~/composables/useGreetingsData';

const props = defineProps({
  servers: {
    type: Array as () => Server[],
    required: true,
  },
  greetings: {
    type: Array as () => Greeting[],
    required: true,
  },
});

const emit = defineEmits(['serverGreeted']);

const expandedServers = ref<boolean[]>(props.servers.map(() => false));

const toggleServerExpansion = (index: number) => {
  expandedServers.value[index] = !expandedServers.value[index];
};

// Get greetings that are valid for today
const todayGreetings = computed(() => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()] as keyof Greeting['days'];
  
  return props.greetings.filter(greeting => greeting.days[today]);
});

const getRandomGreetings = (count: number) => {
  if (todayGreetings.value.length === 0) {
    return [];
  }
  const shuffled = [...todayGreetings.value].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const copyToClipboardAndOpenLink = async (message: string, url: string, serverName: string) => {
  try {
    await navigator.clipboard.writeText(message);
    alert('Message copied to clipboard! Opening link...');
    window.open(url, '_blank');
    emit('serverGreeted', serverName);
  } catch (err) {
    console.error('Failed to copy or open link:', err);
    alert('Failed to copy message or open link. Please try again.');
  }
};
</script>
