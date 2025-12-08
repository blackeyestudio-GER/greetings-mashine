<template>
  <div class="p-5 bg-eerie-black rounded-lg text-gray-100">
    <section class="bg-gray-700 p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <div class="flex flex-col gap-4">
        <button @click="exportServers" class="btn-export">
          <Icon icon="heroicons:server-20-solid" class="w-8 h-8 mr-3" />
          Servers
        </button>
        <button @click="exportGreetings" class="btn-export">
          <Icon icon="heroicons:chat-bubble-left-ellipsis-20-solid" class="w-8 h-8 mr-3" />
          Greetings
        </button>
        <button @click="exportAll" class="btn-export-all">
          <Icon icon="heroicons:arrow-down-tray-20-solid" class="w-8 h-8 mr-3" />
          Everything
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useGreetingsData, type Server, type Greeting } from '~/composables/useGreetingsData';

const { greetings, servers, saveToLocalStorage } = useGreetingsData();

// Export Functions
const exportData = (data: any, filename: string) => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const exportServers = () => {
  exportData(servers.value, 'servers.json');
  alert('Servers exported successfully!');
};

const exportGreetings = () => {
  exportData(greetings.value, 'greetings.json');
  alert('Greetings exported successfully!');
};

const exportAll = () => {
  const allData = {
    servers: servers.value,
    greetings: greetings.value,
    exportDate: new Date().toISOString()
  };
  exportData(allData, 'greetings-machine-backup.json');
  alert('All data exported successfully!');
};

</script>

<style scoped>
/* No scoped styles needed as Tailwind is used throughout */
</style>
