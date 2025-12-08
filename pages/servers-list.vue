<template>
  <div class="p-5 bg-eerie-black rounded-lg text-gray-100">
    <section class="bg-gray-700 p-5 rounded-lg shadow-md mb-6">
      <div class="flex justify-end items-center mb-5 pb-3 border-b border-gray-600">
        <button 
          @click="goToAddServer" 
          class="p-3 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-colors duration-200"
          title="New Server"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </button>
      </div>

      <div v-if="servers.length === 0" class="text-center text-gray-400 py-8">
        <p class="mb-4">No servers yet.</p>
        <button 
          @click="goToAddServer"
          class="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors duration-200"
        >
          Create your first server
        </button>
      </div>

      <ul v-else class="list-none p-0 space-y-2">
        <li 
          v-for="(server, index) in servers" 
          :key="index" 
          class="bg-night rounded-md transition-all duration-200 hover:bg-gray-600 hover:shadow-lg"
        >
          <div class="flex items-center gap-4 p-4">
            <!-- Left side: Icon and Server Info (50%) -->
            <div class="flex-1 flex items-center gap-3">
              <div v-if="server.icon" class="w-12 h-12 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
                <img :src="server.icon" alt="Server Icon" class="w-full h-full object-cover" />
              </div>
              <div v-else class="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
                </svg>
              </div>
              <div class="flex-grow break-words">
                <div class="text-gray-200 font-semibold">{{ server.name }}</div>
                <div class="text-xs text-gray-400 break-all">{{ server.url }}</div>
              </div>
            </div>
            
            <!-- Right side: Action buttons (50%) -->
            <div class="flex-1 flex justify-end gap-2">
              <button 
                @click="editServer(index)" 
                class="p-3 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-lg transition-colors duration-200"
                title="Edit"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
              </button>
              <button 
                @click="deleteServer(index)" 
                class="p-3 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors duration-200"
                title="Delete"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
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

