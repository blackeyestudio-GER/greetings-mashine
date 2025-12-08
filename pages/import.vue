<template>
  <div class="p-5 bg-eerie-black rounded-lg text-gray-100">
    <section class="bg-gray-700 p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <div class="flex flex-col gap-4">
        <label for="importServers" class="btn-import">
          <Icon icon="heroicons:server-20-solid" class="w-8 h-8 mr-3" />
          Servers
        </label>
        <input type="file" id="importServers" @change="(e) => importData(e, 'servers')" accept=".json" class="hidden"/>

        <label for="importGreetings" class="btn-import">
          <Icon icon="heroicons:chat-bubble-left-ellipsis-20-solid" class="w-8 h-8 mr-3" />
          Greetings
        </label>
        <input type="file" id="importGreetings" @change="(e) => importData(e, 'greetings')" accept=".json" class="hidden"/>

        <label for="importAll" class="btn-import-all">
          <Icon icon="heroicons:arrow-up-tray-20-solid" class="w-8 h-8 mr-3" />
          Everything
        </label>
        <input type="file" id="importAll" @change="(e) => importData(e, 'all')" accept=".json" class="hidden"/>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useGreetingsData, type Server, type Greeting } from '~/composables/useGreetingsData';

const { greetings, servers, saveToLocalStorage } = useGreetingsData();

// Import Functions
const importData = (event: Event, dataType: 'servers' | 'greetings' | 'all') => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        
        if (dataType === 'greetings' && Array.isArray(importedData)) {
          // Validate greetings structure
          const validatedGreetings: Greeting[] = importedData.map(item => ({
            text: item.text || '',
            days: {
              monday: item.days?.monday ?? true,
              tuesday: item.days?.tuesday ?? true,
              wednesday: item.days?.wednesday ?? true,
              thursday: item.days?.thursday ?? true,
              friday: item.days?.friday ?? true,
              saturday: item.days?.saturday ?? true,
              sunday: item.days?.sunday ?? true
            },
            serverIds: item.serverIds || ['all']
          }));
          greetings.value = validatedGreetings;
          saveToLocalStorage();
          alert('Greetings imported successfully!');
          
        } else if (dataType === 'servers' && Array.isArray(importedData)) {
          // Validate servers structure
          const validatedServers: Server[] = importedData.map(item => ({
            id: item.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: item.name || 'Unknown',
            url: item.url || '',
            icon: item.icon || undefined,
            lastGreeted: item.lastGreeted || null
          }));
          servers.value = validatedServers;
          saveToLocalStorage();
          alert('Servers imported successfully!');
          
        } else if (dataType === 'all' && typeof importedData === 'object') {
          // Import everything from backup file
          if (Array.isArray(importedData.greetings)) {
            const validatedGreetings: Greeting[] = importedData.greetings.map((item: any) => ({
              text: item.text || '',
              days: {
                monday: item.days?.monday ?? true,
                tuesday: item.days?.tuesday ?? true,
                wednesday: item.days?.wednesday ?? true,
                thursday: item.days?.thursday ?? true,
                friday: item.days?.friday ?? true,
                saturday: item.days?.saturday ?? true,
                sunday: item.days?.sunday ?? true
              },
              serverIds: item.serverIds || ['all']
            }));
            greetings.value = validatedGreetings;
          }
          
          if (Array.isArray(importedData.servers)) {
            const validatedServers: Server[] = importedData.servers.map((item: any) => ({
              id: item.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              name: item.name || 'Unknown',
              url: item.url || '',
              icon: item.icon || undefined,
              lastGreeted: item.lastGreeted || null
            }));
            servers.value = validatedServers;
          }
          
          saveToLocalStorage();
          alert('All data imported successfully!');
          
        } else {
          alert('Error: Invalid file format for import.');
        }
        
        // Reset file input
        target.value = '';
        
      } catch (err) {
        alert('Error parsing JSON file.');
        console.error('Error parsing JSON:', err);
      }
    };
    reader.readAsText(file);
  }
};
</script>

<style scoped>
/* No scoped styles needed as Tailwind is used throughout */
</style>

