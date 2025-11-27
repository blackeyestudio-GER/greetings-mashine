<template>
  <div v-if="viewMode === 'export'" class="p-5 bg-eerie-black rounded-lg text-gray-100">
    <h1 class="text-dark-slate-gray text-3xl font-bold mb-6 text-center">Daten Export & Import</h1>

    <section class="bg-gray-700 p-5 rounded-lg shadow-md mb-6">
      <h2 class="text-dim-gray mb-5 pb-3 border-b border-gray-600 text-center text-xl font-semibold">Daten exportieren</h2>
      <div class="flex flex-wrap gap-3 justify-center">
        <button @click="exportServerList" class="px-4 py-2 border-none rounded-md cursor-pointer text-base transition-colors duration-200 text-white text-center min-w-[180px] flex items-center justify-center bg-green-500 hover:bg-green-600">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Export Server List
        </button>
        <button @click="exportGreetings" class="px-4 py-2 border-none rounded-md cursor-pointer text-base transition-colors duration-200 text-white text-center min-w-[180px] flex items-center justify-center bg-green-500 hover:bg-green-600">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Export Greetings
        </button>
      </div>
    </section>

    <section class="bg-gray-700 p-5 rounded-lg shadow-md mb-6">
      <h2 class="text-dim-gray mb-5 pb-3 border-b border-gray-600 text-center text-xl font-semibold">Daten importieren</h2>
      <div class="flex flex-wrap gap-3 justify-center">
        <label for="importChannels" class="px-4 py-2 border-none rounded-md cursor-pointer text-base transition-colors duration-200 text-white text-center min-w-[180px] flex items-center justify-center bg-red-500 hover:bg-red-600">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Import Server List
        </label>
        <input type="file" id="importChannels" @change="(e) => importData(e, 'channels')" accept=".json" class="hidden"/>

        <label for="importGreetings" class="px-4 py-2 border-none rounded-md cursor-pointer text-base transition-colors duration-200 text-white text-center min-w-[180px] flex items-center justify-center bg-red-500 hover:bg-red-600">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Import Greetings
        </label>
        <input type="file" id="importGreetings" @change="(e) => importData(e, 'messages')" accept=".json" class="hidden"/>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useState } from 'vue';

interface ServerChannel {
  name: string;
  url: string;
  lastGreeted?: number | null;
}

const messagePool = useState<string[]>('messagePool');
const channels = useState<ServerChannel[]>('channels');
const saveDataToLocalStorage = useState<() => void>('saveDataToLocalStorage');
const viewMode = useState<'greet' | 'edit-greetings' | 'edit-servers' | 'export'>('viewMode');

// Export Funktionen
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

const exportServerList = () => {
  exportData(channels.value, 'server_channels.json');
};

const exportGreetings = () => {
  exportData(messagePool.value, 'greetings_messages.json');
};

// Import Funktionen
const importData = (event: Event, dataType: 'messages' | 'channels') => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        if (dataType === 'messages' && Array.isArray(importedData)) {
          messagePool.value = importedData;
          saveDataToLocalStorage.value();
          alert('Nachrichten erfolgreich importiert!');
        } else if (dataType === 'channels' && Array.isArray(importedData)) {
          // Stellen Sie sicher, dass importedData die korrekte Struktur für channels hat
          const validatedChannels: ServerChannel[] = importedData.map(item => ({
            name: item.name || 'Unknown',
            url: item.url || '',
            lastGreeted: item.lastGreeted || null,
          }));
          channels.value = validatedChannels;
          saveDataToLocalStorage.value();
          alert('Server-Listen erfolgreich importiert!');
        } else {
          alert('Fehler: Ungültiges Dateiformat für den Import.');
        }
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
