<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import ServerList from '#/components/ServerList.vue';
import { servers as initialServers } from '#/data/servers.js';

interface ServerChannel {
  name: string;
  url: string;
  lastGreeted?: number | null; // Timestamp für das letzte Begrüßen
}

const messagePool = useState<string[]>('messagePool', () => []);
const newMessage = ref('');
const channels = useState<ServerChannel[]>('channels', () => initialServers.map(channel => ({
  ...channel,
  lastGreeted: null // Initialisiert lastGreeted
})));

const viewMode = useState<'greet' | 'edit-greetings' | 'edit-servers' | 'export'>('viewMode');

const addMessage = () => {
  if (newMessage.value.trim() !== '') {
    messagePool.value.push(newMessage.value.trim());
    newMessage.value = '';
    saveDataToLocalStorage();
  }
};

const saveDataToLocalStorage = () => {
  localStorage.setItem('greetingsMessages', JSON.stringify(messagePool.value));
  localStorage.setItem('serverChannels', JSON.stringify(channels.value));
};

const loadDataFromLocalStorage = () => {
  const storedMessages = localStorage.getItem('greetingsMessages');
  if (storedMessages) {
    messagePool.value = JSON.parse(storedMessages);
  }
  const storedChannels = localStorage.getItem('serverChannels');
  if (storedChannels) {
    const parsedChannels = JSON.parse(storedChannels);
    // Sicherstellen, dass lastGreeted korrekt initialisiert ist
    channels.value = parsedChannels.map((channel: ServerChannel) => ({
      ...channel,
      lastGreeted: channel.lastGreeted || null // Wenn lastGreeted fehlt, null setzen
    }));
  }
};

const copyMessageToInput = (message: string) => {
  newMessage.value = message;
};

// Funktion, um den Begrüßungsstatus eines Kanals zu aktualisieren
const updateGreetedStatus = (channelName: string) => {
  const channelIndex = channels.value.findIndex(c => c.name === channelName);
  if (channelIndex !== -1) {
    const currentTime = Date.now();
    // 18 Stunden in Millisekunden
    const eighteenHoursInMs = 18 * 60 * 60 * 1000;
    channels.value[channelIndex].lastGreeted = currentTime + eighteenHoursInMs;
    saveDataToLocalStorage();
  }
};

// Überprüfen und zurücksetzen des lastGreeted Status beim Laden
const checkAndResetGreetedStatus = () => {
  channels.value.forEach(channel => {
    if (channel.lastGreeted && (Date.now() > channel.lastGreeted)) {
      channel.lastGreeted = null; // Status zurücksetzen, wenn 18 Stunden vergangen sind
    }
  });
  saveDataToLocalStorage(); // Änderungen speichern
};

onMounted(() => {
  loadDataFromLocalStorage();
  checkAndResetGreetedStatus();
});
</script>

<template>
  <div>
    <h1 v-if="viewMode === 'greet'" class="text-moonstone text-3xl font-bold mb-6 text-center">Welcome to the Greetings Machine</h1>
    <div v-if="viewMode === 'greet'" class="p-5 bg-eerie-black rounded-lg shadow-md">
      <div class="flex gap-3 mb-5 items-center">
        <input
          v-model="newMessage"
          placeholder="Nachricht eingeben..."
          class="flex-grow p-3 border border-gray-600 rounded-md bg-night text-gray-100 placeholder-gray-400 focus:outline-none focus:border-moonstone"
        />
        <button @click="addMessage" class="px-4 py-2 bg-dark-slate-gray text-white rounded-md cursor-pointer text-base transition-colors duration-200 hover:bg-dark-slate-gray-darker">
          Nachricht speichern
        </button>
      </div>
      <ServerList
        :channels="channels"
        :messagePool="messagePool"
        @copyToInput="copyMessageToInput"
        @channelGreeted="updateGreetedStatus"
      />
    </div>

    <div v-if="viewMode === 'edit-greetings'">
      <NuxtPage />
    </div>

    <div v-if="viewMode === 'edit-servers'">
      <NuxtPage />
    </div>

    <div v-if="viewMode === 'export'">
      <NuxtPage />
    </div>
  </div>
</template>

<style scoped>
/* No scoped styles needed as Tailwind is used throughout */
</style>