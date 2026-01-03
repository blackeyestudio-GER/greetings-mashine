<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useGreetingsData, type Greeting } from '~/composables/useGreetingsData';
import { DAY_INDEX_MAP } from '~/constants';

const { 
  greetings, 
  servers, 
  loadFromLocalStorage, 
  checkAndResetGreetedStatus,
  updateServerGreetedStatus,
  getGreetingsForServer
} = useGreetingsData();

const router = useRouter();

// Track current greeting for each server
const currentGreetings = ref<{ [serverId: string]: Greeting | null }>({});

onMounted(() => {
  loadFromLocalStorage();
  checkAndResetGreetedStatus();
  // Initialize greetings for all servers
  servers.value.forEach(server => {
    rerollGreeting(server.id);
  });
});

// Get greetings that are valid for today
const todayGreetings = computed(() => {
  const today = DAY_INDEX_MAP[new Date().getDay()] as keyof Greeting['days'];
  
  return greetings.value.filter(greeting => greeting.days[today]);
});

// Get a random greeting for a specific server
const getRandomGreeting = (serverId: string): Greeting | null => {
  const serverGreetings = getGreetingsForServer(serverId);
  if (serverGreetings.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * serverGreetings.length);
  return serverGreetings[randomIndex];
};

// Reroll greeting for a server
const rerollGreeting = (serverId: string) => {
  currentGreetings.value[serverId] = getRandomGreeting(serverId);
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
    <div v-if="!hasContent" class="p-4 md:p-8 bg-eerie-black rounded-lg shadow-md text-center">
      <div class="w-full md:max-w-2xl md:mx-auto">
        <Icon icon="heroicons:chat-bubble-left-ellipsis-20-solid" class="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 text-moonstone" />
        
        <h2 class="text-xl md:text-2xl font-bold text-gray-100 mb-3">Welcome to HelloBot!</h2>
        
        <div class="text-gray-300 space-y-3 text-left">
          <p class="text-sm md:text-base">This app helps you manage your chat servers and communities with predefined greetings.</p>
          
          <div class="bg-gray-700 p-3 md:p-4 rounded-lg">
            <h3 class="font-semibold text-moonstone mb-2 text-sm md:text-base">How it works:</h3>
            <ol class="list-decimal list-inside space-y-1.5 text-xs md:text-sm">
              <li>Create <strong>greetings</strong> with text and select the weekdays they should be available</li>
              <li>Add your <strong>servers</strong> (name, URL and optionally an icon)</li>
              <li>On this main page you'll see 1 random greeting for each server</li>
              <li>Click "Reroll" to cycle through different messages until you find the perfect one</li>
              <li>Click "Copy & Open" to copy the message and open the server</li>
            </ol>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            <button 
              @click="router.push('/greetings-add')" 
              class="btn-action-primary"
            >
              <Icon icon="heroicons:plus-20-solid" class="w-5 h-5 mr-2" />
              Create First Greeting
            </button>
            <button 
              @click="router.push('/servers-add')" 
              class="btn-action-secondary"
            >
              <Icon icon="heroicons:plus-20-solid" class="w-5 h-5 mr-2" />
              Add First Server
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content with servers and greetings -->
    <div v-else class="space-y-4 md:space-y-6">
      <!-- No servers message -->
      <div v-if="servers.length === 0" class="p-4 bg-eerie-black rounded-lg shadow-md text-center">
        <p class="text-gray-300 mb-3 text-sm md:text-base">No servers added yet.</p>
        <button 
          @click="router.push('/servers-add')" 
          class="btn-action-secondary mx-auto"
        >
          <Icon icon="heroicons:plus-20-solid" class="w-5 h-5 mr-2" />
          Add Server
        </button>
      </div>

      <!-- No greetings message -->
      <div v-if="greetings.length === 0" class="p-4 bg-eerie-black rounded-lg shadow-md text-center">
        <p class="text-gray-300 mb-3 text-sm md:text-base">No greetings created yet.</p>
        <button 
          @click="router.push('/greetings-add')" 
          class="btn-action-primary mx-auto"
        >
          <Icon icon="heroicons:plus-20-solid" class="w-5 h-5 mr-2" />
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
        <div class="flex flex-col md:flex-row items-start gap-3 md:gap-4 p-3 md:p-5">
          <!-- Left side: Server Info -->
          <div class="w-full md:w-1/3 flex flex-row md:flex-col items-center md:items-start gap-3">
            <div class="flex items-center gap-2 md:gap-3">
              <input 
                type="checkbox" 
                :checked="!!server.lastGreeted" 
                disabled 
                class="w-4 h-4 md:w-5 md:h-5 accent-green-500" 
              />
              
              <div v-if="server.icon" class="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
                <img :src="server.icon" alt="Server Icon" class="w-full h-full object-cover" />
              </div>
              <div v-else class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                <Icon icon="heroicons:server-20-solid" class="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
              </div>
            </div>
            
            <div class="flex-1 md:flex-none md:w-full">
              <h2 class="text-dim-gray text-base md:text-xl font-semibold">{{ server.name }}</h2>
              <div class="text-xs text-gray-400 break-all">{{ server.url }}</div>
            </div>
          </div>

          <!-- Right side: Greetings -->
          <div class="w-full md:flex-1 flex flex-col gap-2 md:gap-3">
            <div v-if="!currentGreetings[server.id]" class="text-center text-gray-400 py-4">
              <p class="text-xs md:text-sm">No greetings available for this server.</p>
            </div>

            <div 
              v-else-if="currentGreetings[server.id]"
              class="bg-night p-3 md:p-4 rounded-md shadow-sm flex items-center justify-between gap-3"
            >
              <p class="flex-1 text-gray-200 text-xs md:text-sm leading-tight">{{ currentGreetings[server.id]!.text }}</p>
              <div class="flex gap-1.5 md:gap-2">
                <button 
                  @click="rerollGreeting(server.id)" 
                  class="btn-neutral"
                  title="Reroll Message"
                >
                  <Icon icon="heroicons:arrow-path-20-solid" class="w-5 h-5" />
                </button>
                <button 
                  @click="copyAndOpenServer(currentGreetings[server.id]!.text, server.url, server.id)" 
                  class="btn-copy"
                  title="Copy & Open"
                >
                  <Icon icon="heroicons:document-duplicate-20-solid" class="w-5 h-5" />
                </button>
                <button 
                  @click="editGreeting(greetings.indexOf(currentGreetings[server.id]!))" 
                  class="btn-edit"
                  title="Edit"
                >
                  <Icon icon="heroicons:pencil-20-solid" class="w-5 h-5" />
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