<template>
  <div class="bg-eerie-black rounded-lg text-gray-100">
    <section class="bg-gray-700 p-3 md:p-5 rounded-lg shadow-md">
      <div class="flex justify-end items-center mb-3 md:mb-5 pb-2 md:pb-3 border-b border-gray-600">
        <button 
          @click="goToAddGreeting" 
          class="btn-add"
          title="New Greeting"
        >
          <Icon icon="heroicons:plus-20-solid" class="w-5 h-5" />
        </button>
      </div>

      <div v-if="greetings.length === 0" class="text-center text-gray-400 py-6 md:py-8">
        <p class="mb-3 md:mb-4 text-sm md:text-base">No greetings yet.</p>
        <button 
          @click="goToAddGreeting"
          class="btn-action-primary mx-auto"
        >
          <Icon icon="heroicons:plus-20-solid" class="w-5 h-5 mr-2" />
          Create First Greeting
        </button>
      </div>

      <ul v-else class="list-none p-0 space-y-2">
        <li 
          v-for="(greeting, index) in greetings" 
          :key="index" 
          class="bg-night rounded-md transition-all duration-200 hover:bg-gray-600 hover:shadow-lg"
        >
          <div class="flex flex-col md:flex-row items-start gap-3 md:gap-4 p-3 md:p-4">
            <!-- Message -->
            <div class="w-full md:flex-1 text-gray-200 text-sm md:text-base break-words">
              {{ greeting.text }}
            </div>
            
            <!-- Days, Servers, and Actions -->
            <div class="w-full md:flex-1 flex flex-col sm:flex-row items-start sm:justify-between gap-3">
              <div class="flex flex-col gap-1.5">
                <!-- Days -->
                <div class="flex flex-wrap gap-0.5 md:gap-1">
                  <span 
                    v-for="day in allDays" 
                    :key="day.key" 
                    :class="greeting.days[day.key] 
                      ? 'bg-gray-600 text-gray-200' 
                      : 'bg-transparent border border-gray-600 text-gray-200 opacity-40'"
                    class="px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs"
                  >
                    {{ day.labelShort }}
                  </span>
                </div>
                
                <!-- Servers (vertical list) -->
                <div class="flex flex-col gap-0.5 md:gap-1">
                  <span 
                    v-if="greeting.serverIds.includes('all')" 
                    class="bg-dark-slate-gray px-1.5 md:px-2 py-0.5 md:py-1 rounded flex items-center gap-1 text-xs text-gray-200 w-fit"
                  >
                    <Icon icon="heroicons:check-20-solid" class="w-3 h-3" />
                    All Servers
                  </span>
                  <span 
                    v-else
                    v-for="serverId in greeting.serverIds" 
                    :key="serverId" 
                    class="px-1.5 md:px-2 py-0.5 md:py-1 rounded flex items-center gap-1 text-xs w-fit"
                    style="background-color: var(--color-info); color: var(--color-text-secondary);"
                  >
                    <Icon icon="heroicons:server-20-solid" class="w-3 h-3" />
                    {{ getServerName(serverId) }}
                  </span>
                </div>
              </div>
              
              <!-- Action buttons -->
              <div class="flex gap-1.5 md:gap-2">
                    <button 
                      @click="editGreeting(index)" 
                      class="btn-edit"
                      title="Edit"
                    >
                      <Icon icon="heroicons:pencil-20-solid" class="w-5 h-5" />
                    </button>
                    <button 
                      @click="deleteGreeting(index)" 
                      class="btn-delete"
                      title="Delete"
                    >
                      <Icon icon="heroicons:trash-20-solid" class="w-5 h-5" />
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
import { WEEKDAYS } from '~/constants';

const { greetings, servers, saveToLocalStorage, loadFromLocalStorage } = useGreetingsData();
const router = useRouter();

onMounted(() => {
  loadFromLocalStorage();
});

const allDays = WEEKDAYS;

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

