<template>
  <div class="p-5 bg-eerie-black rounded-lg text-gray-100">
    <section class="bg-gray-700 p-5 rounded-lg shadow-md mb-6">
      <div class="flex justify-end items-center mb-5 pb-3 border-b border-gray-600">
        <button 
          @click="goToAddGreeting" 
          class="p-3 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-colors duration-200"
          title="New Greeting"
        >
          <Icon icon="heroicons:plus-20-solid" class="w-6 h-6" />
        </button>
      </div>

      <div v-if="greetings.length === 0" class="text-center text-gray-400 py-8">
        <p class="mb-4">No greetings yet.</p>
        <button 
          @click="goToAddGreeting"
          class="px-8 py-4 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white text-lg rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center mx-auto"
        >
          <Icon icon="heroicons:plus-20-solid" class="w-6 h-6 mr-2" />
          Create First Greeting
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
                  <span 
                    v-for="day in allDays" 
                    :key="day.key" 
                    :class="greeting.days[day.key] 
                      ? 'bg-gray-600 text-gray-200' 
                      : 'bg-transparent border border-gray-600 text-gray-200 opacity-40'"
                    class="px-2 py-1 rounded text-xs"
                  >
                    {{ day.label }}
                  </span>
                </div>
                
                <!-- Servers (vertical list) -->
                <div class="flex flex-col gap-1">
                  <span 
                    v-if="greeting.serverIds.includes('all')" 
                    class="bg-green-600 px-2 py-1 rounded flex items-center gap-1 text-xs text-white w-fit"
                  >
                    <Icon icon="heroicons:check-20-solid" class="w-3 h-3" />
                    All Servers
                  </span>
                  <span 
                    v-else
                    v-for="serverId in greeting.serverIds" 
                    :key="serverId" 
                    class="bg-blue-600 px-2 py-1 rounded flex items-center gap-1 text-xs text-white w-fit"
                  >
                    <Icon icon="heroicons:server-20-solid" class="w-3 h-3" />
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
                  <Icon icon="heroicons:pencil-20-solid" class="w-6 h-6" />
                </button>
                <button 
                  @click="deleteGreeting(index)" 
                  class="p-3 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors duration-200"
                  title="Delete"
                >
                  <Icon icon="heroicons:trash-20-solid" class="w-6 h-6" />
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
import { Icon } from '@iconify/vue';
import { useGreetingsData, type Greeting } from '~/composables/useGreetingsData';

const { greetings, servers, saveToLocalStorage, loadFromLocalStorage } = useGreetingsData();
const router = useRouter();

onMounted(() => {
  loadFromLocalStorage();
});

const allDays = [
  { key: 'monday', label: 'Mo' },
  { key: 'tuesday', label: 'Tu' },
  { key: 'wednesday', label: 'We' },
  { key: 'thursday', label: 'Th' },
  { key: 'friday', label: 'Fr' },
  { key: 'saturday', label: 'Sa' },
  { key: 'sunday', label: 'Su' }
];

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

