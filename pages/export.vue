<template>
  <div class="p-5 bg-eerie-black rounded-lg text-gray-100">
    <h1 class="text-dark-slate-gray text-3xl font-bold mb-6 text-center">Daten Export & Import</h1>

    <section class="bg-gray-700 p-5 rounded-lg shadow-md mb-6">
      <h2 class="text-dim-gray mb-5 pb-3 border-b border-gray-600 text-center text-xl font-semibold">Daten exportieren</h2>
      <div class="flex flex-wrap gap-3 justify-center">
        <button @click="exportServers" class="px-4 py-2 border-none rounded-md cursor-pointer text-base transition-colors duration-200 text-white text-center min-w-[180px] flex items-center justify-center bg-green-500 hover:bg-green-600">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Export Servers
        </button>
        <button @click="exportGreetings" class="px-4 py-2 border-none rounded-md cursor-pointer text-base transition-colors duration-200 text-white text-center min-w-[180px] flex items-center justify-center bg-green-500 hover:bg-green-600">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Export Greetings
        </button>
        <button @click="exportAll" class="px-4 py-2 border-none rounded-md cursor-pointer text-base transition-colors duration-200 text-white text-center min-w-[180px] flex items-center justify-center bg-blue-500 hover:bg-blue-600">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Export Alles
        </button>
      </div>
    </section>

    <section class="bg-gray-700 p-5 rounded-lg shadow-md mb-6">
      <h2 class="text-dim-gray mb-5 pb-3 border-b border-gray-600 text-center text-xl font-semibold">Daten importieren</h2>
      <div class="flex flex-wrap gap-3 justify-center">
        <label for="importServers" class="px-4 py-2 border-none rounded-md cursor-pointer text-base transition-colors duration-200 text-white text-center min-w-[180px] flex items-center justify-center bg-red-500 hover:bg-red-600">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Import Servers
        </label>
        <input type="file" id="importServers" @change="(e) => importData(e, 'servers')" accept=".json" class="hidden"/>

        <label for="importGreetings" class="px-4 py-2 border-none rounded-md cursor-pointer text-base transition-colors duration-200 text-white text-center min-w-[180px] flex items-center justify-center bg-red-500 hover:bg-red-600">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Import Greetings
        </label>
        <input type="file" id="importGreetings" @change="(e) => importData(e, 'greetings')" accept=".json" class="hidden"/>

        <label for="importAll" class="px-4 py-2 border-none rounded-md cursor-pointer text-base transition-colors duration-200 text-white text-center min-w-[180px] flex items-center justify-center bg-purple-500 hover:bg-purple-600">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Import Alles
        </label>
        <input type="file" id="importAll" @change="(e) => importData(e, 'all')" accept=".json" class="hidden"/>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
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
  alert('Server erfolgreich exportiert!');
};

const exportGreetings = () => {
  exportData(greetings.value, 'greetings.json');
  alert('Begrüßungen erfolgreich exportiert!');
};

const exportAll = () => {
  const allData = {
    servers: servers.value,
    greetings: greetings.value,
    exportDate: new Date().toISOString()
  };
  exportData(allData, 'greetings-machine-backup.json');
  alert('Alle Daten erfolgreich exportiert!');
};

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
            }
          }));
          greetings.value = validatedGreetings;
          saveToLocalStorage();
          alert('Begrüßungen erfolgreich importiert!');
          
        } else if (dataType === 'servers' && Array.isArray(importedData)) {
          // Validate servers structure
          const validatedServers: Server[] = importedData.map(item => ({
            name: item.name || 'Unknown',
            url: item.url || '',
            icon: item.icon || undefined,
            lastGreeted: item.lastGreeted || null
          }));
          servers.value = validatedServers;
          saveToLocalStorage();
          alert('Server erfolgreich importiert!');
          
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
              }
            }));
            greetings.value = validatedGreetings;
          }
          
          if (Array.isArray(importedData.servers)) {
            const validatedServers: Server[] = importedData.servers.map((item: any) => ({
              name: item.name || 'Unknown',
              url: item.url || '',
              icon: item.icon || undefined,
              lastGreeted: item.lastGreeted || null
            }));
            servers.value = validatedServers;
          }
          
          saveToLocalStorage();
          alert('Alle Daten erfolgreich importiert!');
          
        } else {
          alert('Fehler: Ungültiges Dateiformat für den Import.');
        }
        
        // Reset file input
        target.value = '';
        
      } catch (err) {
        alert('Fehler beim Parsen der JSON-Datei.');
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
