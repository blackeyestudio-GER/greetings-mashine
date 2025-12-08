<template>
  <div class="p-5 bg-eerie-black rounded-lg text-gray-100">
    <section class="bg-gray-700 p-5 rounded-lg shadow-md mb-6">
      <div class="flex justify-end items-center mb-5 pb-3 border-b border-gray-600">
        <button 
          @click="goToAddGreeting" 
          class="p-3 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-colors duration-200"
          title="New Greeting"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </button>
      </div>

      <div v-if="greetings.length === 0" class="text-center text-gray-400 py-8">
        <p class="mb-4">No greetings yet.</p>
        <button 
          @click="goToAddGreeting"
          class="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors duration-200"
        >
          Create your first greeting
        </button>
      </div>

      <ul v-else class="list-none p-0 space-y-2">
        <li 
          v-for="(greeting, index) in greetings" 
          :key="index" 
          class="bg-night rounded-md transition-all duration-200 hover:bg-gray-600 hover:shadow-lg"
        >
          <div class="flex items-start gap-4 p-4">
            <!-- Left side: Message (50%) -->
            <div class="flex-1 text-gray-200 break-words">
              {{ greeting.text }}
            </div>
            
            <!-- Right side: Days, Servers, and Actions (50%) -->
            <div class="flex-1 flex items-start justify-between gap-4">
              <div class="flex flex-col gap-1.5">
                <!-- Days -->
                <div class="flex flex-wrap gap-1">
                  <span v-for="day in getActiveDays(greeting)" :key="day" class="bg-gray-600 px-2 py-1 rounded text-xs text-gray-300">
                    {{ day }}
                  </span>
                </div>
                
                <!-- Servers (vertical list) -->
                <div class="flex flex-col gap-1">
                  <span 
                    v-if="greeting.serverIds.includes('all')" 
                    class="bg-green-600 px-2 py-1 rounded flex items-center gap-1 text-xs text-white w-fit"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    All Servers
                  </span>
                  <span 
                    v-else
                    v-for="serverId in greeting.serverIds" 
                    :key="serverId" 
                    class="bg-blue-600 px-2 py-1 rounded flex items-center gap-1 text-xs text-white w-fit"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
                    </svg>
                    {{ getServerName(serverId) }}
                  </span>
                </div>
              </div>
              
              <!-- Action buttons -->
              <div class="flex gap-2">
                <button 
                  @click="editGreeting(index)" 
                  class="p-3 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-lg transition-colors duration-200"
                  title="Edit"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                </button>
                <button 
                  @click="deleteGreeting(index)" 
                  class="p-3 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors duration-200"
                  title="Delete"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useGreetingsData, type Greeting } from '~/composables/useGreetingsData';

const { greetings, servers, saveToLocalStorage, loadFromLocalStorage } = useGreetingsData();
const router = useRouter();

onMounted(() => {
  loadFromLocalStorage();
});

const daysLabels: Record<string, string> = {
  monday: 'Mo',
  tuesday: 'Di',
  wednesday: 'Mi',
  thursday: 'Do',
  friday: 'Fr',
  saturday: 'Sa',
  sunday: 'So'
};

const getActiveDays = (greeting: Greeting): string[] => {
  return Object.entries(greeting.days)
    .filter(([_, active]) => active)
    .map(([day, _]) => daysLabels[day]);
};

const getServerName = (serverId: string): string => {
  const server = servers.value.find(s => s.id === serverId);
  return server ? server.name : 'Unknown';
};

const goToAddGreeting = () => {
  router.push('/greetings-add');
};

const editGreeting = (index: number) => {
  router.push(`/greetings-add?edit=${index}`);
};

const deleteGreeting = (index: number) => {
  if (confirm('Do you really want to delete this greeting?')) {
    greetings.value.splice(index, 1);
    saveToLocalStorage();
  }
};
</script>

<style scoped>
/* No scoped styles needed as Tailwind is used throughout */
</style>

