<template>
  <div v-if="viewMode === 'edit-greetings'" class="p-5 bg-eerie-black rounded-lg text-gray-100">
    <h1 class="text-dark-slate-gray text-3xl font-bold mb-6 text-center">Begrüßungen bearbeiten</h1>

    <section class="bg-gray-700 p-5 rounded-lg shadow-md mb-6">
      <h2 class="text-dim-gray mb-5 pb-3 border-b border-gray-600 text-center text-xl font-semibold">Begrüßungsnachrichten verwalten</h2>
      <div class="flex flex-col gap-4 mb-5">
        <textarea
          v-model="editedMessageContent"
          placeholder="Nachricht hier bearbeiten oder eine neue hinzufügen..."
          class="w-full p-3 border border-gray-600 rounded-md bg-night text-gray-100 placeholder-gray-400 focus:outline-none focus:border-dark-slate-gray min-h-[100px] resize-y"
        ></textarea>
        <div class="flex flex-wrap gap-3 justify-center">
          <button @click="saveEditedMessage" class="px-4 py-2 border-none rounded-md cursor-pointer text-sm transition-colors duration-200 text-white flex items-center justify-center flex-grow bg-green-500 hover:bg-green-600">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Speichern
          </button>
          <button @click="deleteMessage" :disabled="editingMessageIndex === -1" class="px-4 py-2 border-none rounded-md cursor-pointer text-sm transition-colors duration-200 text-white flex items-center justify-center flex-grow bg-red-500 hover:bg-red-600">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M4 7h16"></path></svg>
            Löschen
          </button>
          <button @click="addNewMessageAsCopy" :disabled="editedMessageContent.trim() === ''" class="px-4 py-2 border-none rounded-md cursor-pointer text-sm transition-colors duration-200 text-white flex items-center justify-center flex-grow bg-dark-slate-gray hover:bg-dark-slate-gray-darker">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8m5-5v5m-5-9H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v8"></path></svg>
            Als neu speichern
          </button>
        </div>
      </div>
      <ul class="list-none p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <li v-for="(msg, index) in messagePool" :key="index" @click="editMessage(msg, index)" class="bg-night p-3 rounded-md cursor-pointer transition-colors duration-200 text-gray-200 break-words hover:bg-gray-600">
          {{ msg }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const messagePool = useState<string[]>('messagePool');
const saveDataToLocalStorage = useState<() => void>('saveDataToLocalStorage');
const viewMode = useState<'greet' | 'edit-greetings' | 'edit-servers' | 'export'>('viewMode');

const editingMessageIndex = ref(-1);
const editedMessageContent = ref('');

const editMessage = (msg: string, index: number) => {
  editedMessageContent.value = msg;
  editingMessageIndex.value = index;
};

const saveEditedMessage = () => {
  if (editedMessageContent.value.trim() === '') {
    alert('Nachricht kann nicht leer sein.');
    return;
  }
  if (editingMessageIndex.value !== -1) {
    messagePool.value[editingMessageIndex.value] = editedMessageContent.value.trim();
    alert('Nachricht aktualisiert!');
  } else {
    messagePool.value.push(editedMessageContent.value.trim());
    alert('Neue Nachricht hinzugefügt!');
  }
  saveDataToLocalStorage.value();
  editedMessageContent.value = '';
  editingMessageIndex.value = -1;
};

const deleteMessage = () => {
  if (editingMessageIndex.value !== -1) {
    if (confirm('Möchtest du diese Nachricht wirklich löschen?')) {
      messagePool.value.splice(editingMessageIndex.value, 1);
      saveDataToLocalStorage.value();
      editedMessageContent.value = '';
      editingMessageIndex.value = -1;
      alert('Nachricht gelöscht.');
    }
  }
};

const addNewMessageAsCopy = () => {
  if (editedMessageContent.value.trim() === '') {
    alert('Nachricht kann nicht leer sein.');
    return;
  }
  messagePool.value.push(editedMessageContent.value.trim());
  saveDataToLocalStorage.value();
  editedMessageContent.value = '';
  editingMessageIndex.value = -1; // Reset selection
  alert('Nachricht als neue Variante hinzugefügt!');
};

watch(viewMode, (newMode) => {
  if (newMode !== 'edit-greetings') {
    editedMessageContent.value = '';
    editingMessageIndex.value = -1;
  }
});
</script>

<style scoped>
/* No scoped styles needed as Tailwind is used throughout */
</style>
