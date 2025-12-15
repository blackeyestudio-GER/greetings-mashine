<template>
  <div class="bg-eerie-black rounded-lg text-gray-100">
    <section class="bg-gray-700 p-3 md:p-5 rounded-lg shadow-md">
      <div class="flex justify-end items-center mb-3 md:mb-5 pb-2 md:pb-3 border-b border-gray-600">
        <button 
          @click="goToAddServer" 
          class="btn-add"
          title="New Server"
        >
          <Icon icon="heroicons:plus-20-solid" class="w-5 h-5" />
        </button>
      </div>

      <div v-if="servers.length === 0" class="text-center text-gray-400 py-6 md:py-8">
        <p class="mb-3 md:mb-4 text-sm md:text-base">No servers yet.</p>
        <button 
          @click="goToAddServer"
          class="btn-action-secondary mx-auto"
        >
          <Icon icon="heroicons:plus-20-solid" class="w-5 h-5 mr-2" />
          Add First Server
        </button>
      </div>

      <ul v-else class="list-none p-0 space-y-2">
        <li 
          v-for="(server, index) in servers" 
          :key="index" 
          class="bg-night rounded-md transition-all duration-200 hover:bg-gray-600 hover:shadow-lg"
        >
          <div class="flex items-center gap-3 md:gap-4 p-3 md:p-4">
            <!-- Icon and Server Info -->
            <div class="flex-1 flex items-center gap-2 md:gap-3 min-w-0">
              <div v-if="server.icon" class="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
                <img :src="server.icon" alt="Server Icon" class="w-full h-full object-cover" />
              </div>
              <div v-else class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                <Icon icon="heroicons:server-20-solid" class="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
              </div>
              <div class="flex-grow break-words min-w-0">
                <div class="text-gray-200 font-semibold text-sm md:text-base">{{ server.name }}</div>
                <div class="text-xs text-gray-400 break-all">{{ server.url }}</div>
              </div>
            </div>
            
            <!-- Action buttons -->
            <div class="flex gap-1.5 md:gap-2 flex-shrink-0">
              <button 
                @click="editServer(index)" 
                class="btn-edit"
                title="Edit"
              >
                <Icon icon="heroicons:pencil-20-solid" class="w-5 h-5" />
              </button>
              <button 
                @click="deleteServer(index)" 
                class="btn-delete"
                title="Delete"
              >
                <Icon icon="heroicons:trash-20-solid" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useGreetingsData } from '~/composables/useGreetingsData';

const { servers, saveToLocalStorage, removeServerFromGreetings } = useGreetingsData();
const router = useRouter();

const goToAddServer = () => {
  router.push('/servers-add');
};

const editServer = (index: number) => {
  router.push(`/servers-add?edit=${index}`);
};

const deleteServer = (index: number) => {
  if (confirm('Do you really want to delete this server?')) {
    const serverId = servers.value[index].id;
    
    // Remove this server from all greetings
    removeServerFromGreetings(serverId);
    
    // Delete the server
    servers.value.splice(index, 1);
    saveToLocalStorage();
  }
};
</script>

<style scoped>
/* No scoped styles needed as Tailwind is used throughout */
</style>

