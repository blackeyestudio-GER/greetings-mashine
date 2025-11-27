<template>
  <div v-if="viewMode === 'edit-servers'" class="p-5 bg-eerie-black rounded-lg text-gray-100">
    <h1 class="text-dark-slate-gray text-3xl font-bold mb-6 text-center">Server bearbeiten</h1>

    <section class="bg-gray-700 p-5 rounded-lg shadow-md mb-6">
      <h2 class="text-dim-gray mb-5 pb-3 border-b border-gray-600 text-center text-xl font-semibold">Server verwalten</h2>
      <div class="flex flex-col gap-4 mb-5">
        <input v-model="editedChannelName" placeholder="Server Name" class="w-full p-3 border border-gray-600 rounded-md bg-night text-gray-100 placeholder-gray-400 focus:outline-none focus:border-dark-slate-gray" />
        <input v-model="editedChannelUrl" placeholder="Server URL" class="w-full p-3 border border-gray-600 rounded-md bg-night text-gray-100 placeholder-gray-400 focus:outline-none focus:border-dark-slate-gray" />
        <div class="flex flex-wrap gap-3 justify-center">
          <button @click="saveEditedChannel" class="px-4 py-2 border-none rounded-md cursor-pointer text-sm transition-colors duration-200 text-white flex items-center justify-center flex-grow bg-green-500 hover:bg-green-600">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Speichern
          </button>
          <button @click="deleteChannel" :disabled="editingChannelIndex === -1" class="px-4 py-2 border-none rounded-md cursor-pointer text-sm transition-colors duration-200 text-white flex items-center justify-center flex-grow bg-red-500 hover:bg-red-600">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M4 7h16"></path></svg>
            Löschen
          </button>
          <button @click="addNewChannel" class="px-4 py-2 border-none rounded-md cursor-pointer text-sm transition-colors duration-200 text-white flex items-center justify-center flex-grow bg-dark-slate-gray hover:bg-dark-slate-gray-darker">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            Neu hinzufügen
          </button>
        </div>
      </div>
      <ul class="list-none p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <li v-for="(channel, index) in channels" :key="index" @click="editChannel(channel, index)" class="bg-night p-3 rounded-md cursor-pointer transition-colors duration-200 text-gray-200 break-words hover:bg-gray-600">
          {{ channel.name }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface ServerChannel {
  name: string;
  url: string;
  lastGreeted?: number | null;
}

const channels = useState<ServerChannel[]>('channels');
const saveDataToLocalStorage = useState<() => void>('saveDataToLocalStorage');
const viewMode = useState<'greet' | 'edit-greetings' | 'edit-servers' | 'export'>('viewMode');

const editingChannelIndex = ref(-1);
const editedChannelName = ref('');
const editedChannelUrl = ref('');

const editChannel = (channel: ServerChannel, index: number) => {
  editedChannelName.value = channel.name;
  editedChannelUrl.value = channel.url;
  editingChannelIndex.value = index;
};

const saveEditedChannel = () => {
  if (editedChannelName.value.trim() === '' || editedChannelUrl.value.trim() === '') {
    alert('Server Name und URL dürfen nicht leer sein.');
    return;
  }
  if (editingChannelIndex.value !== -1) {
    channels.value[editingChannelIndex.value].name = editedChannelName.value.trim();
    channels.value[editingChannelIndex.value].url = editedChannelUrl.value.trim();
    alert('Server aktualisiert!');
  } else {
    channels.value.push({
      name: editedChannelName.value.trim(),
      url: editedChannelUrl.value.trim(),
      lastGreeted: null,
    });
    alert('Neuer Server hinzugefügt!');
  }
  saveDataToLocalStorage.value();
  editedChannelName.value = '';
  editedChannelUrl.value = '';
  editingChannelIndex.value = -1;
};

const deleteChannel = () => {
  if (editingChannelIndex.value !== -1) {
    if (confirm('Möchtest du diesen Server wirklich löschen?')) {
      channels.value.splice(editingChannelIndex.value, 1);
      saveDataToLocalStorage.value();
      editedChannelName.value = '';
      editedChannelUrl.value = '';
      editingChannelIndex.value = -1;
      alert('Server gelöscht.');
    }
  }
};

const addNewChannel = () => {
  editedChannelName.value = '';
  editedChannelUrl.value = '';
  editingChannelIndex.value = -1;
};

watch(viewMode, (newMode) => {
  if (newMode !== 'edit-servers') {
    editedChannelName.value = '';
    editedChannelUrl.value = '';
    editingChannelIndex.value = -1;
  }
});
</script>

<style scoped>
/* No scoped styles needed as Tailwind is used throughout */
</style>
