<template>
  <div class="p-5 bg-eerie-black rounded-lg text-gray-100">
    <h2 class="text-dark-slate-gray mb-5 text-center">Server List</h2>
    <ul class="list-none p-0">
      <li v-for="(channel, index) in channels" :key="index" class="bg-gray-700 p-4 mb-5 rounded-lg shadow-md">
        <div class="flex items-center cursor-pointer mb-3 pb-3 border-b border-gray-600" @click="toggleChannelExpansion(index)">
          <input type="checkbox" :checked="!!channel.lastGreeted" disabled class="mr-3 w-5 h-5 accent-green-500" />
          <h3 class="text-dim-gray m-0 flex-grow">{{ channel.name }}</h3>
          <svg :class="{'w-6 h-6 text-dim-gray transition-transform duration-300 ease-in-out': true, 'rotate-180': expandedChannels[index]}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>

        <div v-if="expandedChannels[index]" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
          <div v-for="(message, msgIndex) in getRandomMessages(5)" :key="msgIndex" class="bg-night p-4 rounded-md shadow-sm flex flex-col justify-between">
            <p class="mt-0 mb-4 text-gray-200 text-sm leading-tight">{{ message }}</p>
            <div class="flex gap-3 flex-wrap">
              <button @click="copyToClipboardAndOpenLink(message, channel.url, channel.name)" class="px-3 py-2 border-none rounded cursor-pointer text-xs transition-all duration-200 ease-in-out text-white text-center flex items-center justify-center flex-grow bg-dark-slate-gray hover:bg-dark-slate-gray-darker">
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Copy & Open
              </button>
              <button @click="emit('copyToInput', message)" class="px-3 py-2 border-none rounded cursor-pointer text-xs transition-all duration-200 ease-in-out text-white text-center flex items-center justify-center flex-grow bg-green-500 hover:bg-green-600">
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                Edit
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

interface ServerChannel {
  name: string;
  url: string;
  lastGreeted?: number | null;
}

const props = defineProps({
  channels: {
    type: Array as () => ServerChannel[],
    required: true,
  },
  messagePool: {
    type: Array as () => string[],
    required: true,
  },
});

const emit = defineEmits(['copyToInput', 'channelGreeted']);

const expandedChannels = ref<boolean[]>(props.channels.map(() => false));

const toggleChannelExpansion = (index: number) => {
  expandedChannels.value[index] = !expandedChannels.value[index];
};

const getRandomMessages = (count: number) => {
  if (props.messagePool.length === 0) {
    return [];
  }
  const shuffled = [...props.messagePool].sort(() => 0.5 - Math.random());
  const uniqueMessages = Array.from(new Set(shuffled));
  return uniqueMessages.slice(0, count);
};

const copyToClipboardAndOpenLink = async (message: string, url: string, channelName: string) => {
  try {
    await navigator.clipboard.writeText(message);
    alert('Message copied to clipboard! Opening link...');
    window.open(url, '_blank');
    emit('channelGreeted', channelName);
  } catch (err) {
    console.error('Failed to copy or open link:', err);
    alert('Failed to copy message or open link. Please try again.');
  }
};
</script>
