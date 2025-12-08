<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useGreetingsData, type Greeting } from '~/composables/useGreetingsData';

const { 
  greetings, 
  servers, 
  loadFromLocalStorage, 
  checkAndResetGreetedStatus,
  updateServerGreetedStatus,
  getGreetingsForServer
} = useGreetingsData();

const router = useRouter();

onMounted(() => {
  loadFromLocalStorage();
  checkAndResetGreetedStatus();
});

// Get greetings that are valid for today
const todayGreetings = computed(() => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()] as keyof Greeting['days'];
  
  return greetings.value.filter(greeting => greeting.days[today]);
});

// Get 3 random greetings for a specific server
const getRandomGreetings = (serverId: string, count: number) => {
  const serverGreetings = getGreetingsForServer(serverId);
  if (serverGreetings.length === 0) return [];
  
  const shuffled = [...serverGreetings].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

const copyAndOpenServer = async (greetingText: string, serverUrl: string, serverId: string) => {
  try {
    await navigator.clipboard.writeText(greetingText);
    window.open(serverUrl, '_blank');
    updateServerGreetedStatus(serverId);
  } catch (err) {
    console.error('Failed to copy:', err);
    alert('Failed to copy message.');
  }
};

const editGreeting = (greetingIndex: number) => {
  router.push(`/greetings-add?edit=${greetingIndex}`);
};

const hasContent = computed(() => servers.value.length > 0 || greetings.value.length > 0);
</script>

<template>
  <div>
    <!-- Empty state with explanation -->
    <div v-if="!hasContent" class="p-8 bg-eerie-black rounded-lg shadow-md text-center">
      <div class="max-w-2xl mx-auto">
        <svg class="w-24 h-24 mx-auto mb-6 text-moonstone" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        
        <h2 class="text-2xl font-bold text-gray-100 mb-4">Welcome to the Greetings Machine!</h2>
        
        <div class="text-gray-300 space-y-4 text-left">
          <p class="text-lg">This app helps you manage your chat servers and communities with predefined greetings.</p>
          
          <div class="bg-gray-700 p-4 rounded-lg">
            <h3 class="font-semibold text-moonstone mb-2">How it works:</h3>
            <ol class="list-decimal list-inside space-y-2 text-sm">
              <li>Create <strong>greetings</strong> with text and select the weekdays they should be available</li>
              <li>Add your <strong>servers</strong> (name, URL and optionally an icon)</li>
              <li>On this main page you'll see 3 random greetings for each server</li>
              <li>Click "Copy & Open" to copy the message and open the server</li>
            </ol>
          </div>
          
          <div class="flex gap-4 justify-center mt-6">
            <button 
              @click="router.push('/greetings-add')" 
              class="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors duration-200 font-semibold"
            >
              Erste Begrüßung erstellen
            </button>
            <button 
              @click="router.push('/servers-add')" 
              class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 font-semibold"
            >
              Ersten Server hinzufügen
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content with servers and greetings -->
    <div v-else class="space-y-6">
      <!-- No servers message -->
      <div v-if="servers.length === 0" class="p-5 bg-eerie-black rounded-lg shadow-md text-center">
        <p class="text-gray-300 mb-4">No servers added yet.</p>
        <button 
          @click="router.push('/servers-add')" 
          class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200"
        >
          Add Server
        </button>
      </div>

      <!-- No greetings message -->
      <div v-if="greetings.length === 0" class="p-5 bg-eerie-black rounded-lg shadow-md text-center">
        <p class="text-gray-300 mb-4">No greetings created yet.</p>
        <button 
          @click="router.push('/greetings-add')" 
          class="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors duration-200"
        >
          Create Greeting
        </button>
      </div>

      <!-- No greetings for today -->
      <div v-if="servers.length > 0 && greetings.length > 0 && todayGreetings.length === 0" class="p-5 bg-eerie-black rounded-lg shadow-md text-center">
        <p class="text-gray-300 mb-4">No greetings available for today.</p>
        <p class="text-sm text-gray-400">Check the weekdays of your greetings.</p>
      </div>

      <!-- Server list with greetings -->
      <div v-for="(server, serverIndex) in servers" :key="serverIndex" class="bg-eerie-black rounded-lg shadow-md">
        <div class="flex items-start gap-4 p-5">
          <!-- Left side: Server Info -->
          <div class="w-1/3 flex flex-col items-start gap-3">
            <div class="flex items-center gap-3">
              <input 
                type="checkbox" 
                :checked="!!server.lastGreeted" 
                disabled 
                class="w-5 h-5 accent-green-500" 
              />
              
              <div v-if="server.icon" class="w-12 h-12 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
                <img :src="server.icon" alt="Server Icon" class="w-full h-full object-cover" />
              </div>
              <div v-else class="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
                </svg>
              </div>
            </div>
            
            <h2 class="text-dim-gray text-xl font-semibold">{{ server.name }}</h2>
            <div class="text-xs text-gray-400 break-all">{{ server.url }}</div>
          </div>

          <!-- Right side: Greetings -->
          <div class="flex-1 flex flex-col gap-3">
            <div v-if="getRandomGreetings(server.id, 3).length === 0" class="text-center text-gray-400 py-4">
              <p class="text-sm">No greetings available for this server.</p>
            </div>

            <div 
              v-else
              v-for="(greeting, greetingIndex) in getRandomGreetings(server.id, 3)" 
              :key="greetingIndex" 
              class="bg-night p-4 rounded-md shadow-sm flex items-center justify-between gap-4"
            >
              <p class="flex-1 text-gray-200 text-sm leading-tight">{{ greeting.text }}</p>
              <div class="flex gap-2">
                <button 
                  @click="copyAndOpenServer(greeting.text, server.url, server.id)" 
                  class="p-3 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-colors duration-200"
                  title="Copy & Open"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
                <button 
                  @click="editGreeting(greetings.indexOf(greeting))" 
                  class="p-3 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-lg transition-colors duration-200"
                  title="Edit"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* No scoped styles needed as Tailwind is used throughout */
</style>

<style scoped>
/* No scoped styles needed as Tailwind is used throughout */
</style>