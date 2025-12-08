<template>
  <div class="p-5 bg-eerie-black rounded-lg text-gray-100">
    <div class="flex items-center mb-6">
      <button 
        @click="goToList" 
        class="mr-4 p-2 text-gray-400 hover:text-gray-200 transition-colors"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
      </button>
      <h1 class="text-dark-slate-gray text-3xl font-bold">
        {{ isEditing ? 'Edit Server' : 'New Server' }}
      </h1>
    </div>

    <section class="bg-gray-700 p-5 rounded-lg shadow-md mb-6">
      <!-- Icon Upload (Left) and Form Fields (Right) -->
      <div class="flex gap-4 mb-5">
        <!-- Left side: Icon Upload (~30%) -->
        <div class="w-1/3 bg-night p-4 rounded-md">
          <h3 class="text-gray-300 mb-3 font-semibold">Server Icon:</h3>
          <div class="flex flex-col items-center gap-3">
            <div v-if="editedServer.icon" class="w-32 h-32 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
              <img :src="editedServer.icon" alt="Server Icon" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-32 h-32 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
              <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="w-full flex flex-col gap-2">
              <label class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md cursor-pointer text-sm transition-colors duration-200 flex items-center justify-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                </svg>
                Upload
                <input type="file" accept="image/*" @change="handleIconUpload" class="hidden" />
              </label>
              <button 
                v-if="editedServer.icon" 
                @click="removeIcon" 
                class="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition-colors duration-200"
              >
                Remove
              </button>
            </div>
            <p class="text-xs text-gray-400 text-center">Recommended: 512x512px, max. 2MB</p>
          </div>
        </div>

        <!-- Right side: Form Fields (~70%) -->
        <div class="w-2/3 flex flex-col gap-4">
          <div>
            <label class="block text-gray-300 mb-2 font-semibold">Server Name:</label>
            <input 
              v-model="editedServer.name" 
              placeholder="e.g. My Chat Server" 
              class="w-full p-3 border border-gray-600 rounded-md bg-night text-gray-100 placeholder-gray-400 focus:outline-none focus:border-dark-slate-gray" 
            />
          </div>

          <div>
            <label class="block text-gray-300 mb-2 font-semibold">Server URL:</label>
            <input 
              v-model="editedServer.url" 
              placeholder="https://example.com/channels/..." 
              class="w-full p-3 border border-gray-600 rounded-md bg-night text-gray-100 placeholder-gray-400 focus:outline-none focus:border-dark-slate-gray" 
            />
          </div>
        </div>
      </div>

      <!-- Buttons aligned right -->
      <div class="flex gap-3 mt-6 justify-end">
        <button 
          @click="goToList" 
          class="px-8 py-4 border-2 border-gray-500 rounded-lg cursor-pointer text-lg transition-colors duration-200 text-gray-300 hover:bg-gray-600"
        >
          Cancel
        </button>
        
        <button 
          @click="saveServer" 
          :disabled="!editedServer.name.trim() || !editedServer.url.trim()"
          class="px-8 py-4 border-2 border-green-500 rounded-lg cursor-pointer text-lg transition-colors duration-200 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          {{ isEditing ? 'Save Changes' : 'Create Server' }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGreetingsData, type Server } from '~/composables/useGreetingsData';

const { servers, saveToLocalStorage, loadFromLocalStorage, generateId } = useGreetingsData();
const router = useRouter();
const route = useRoute();

const isEditing = ref(false);
const editingIndex = ref(-1);

const editedServer = ref<Server>({
  id: generateId(),
  name: '',
  url: '',
  icon: undefined,
  lastGreeted: null
});

onMounted(() => {
  loadFromLocalStorage();
  
  const editParam = route.query.edit;
  if (editParam !== undefined) {
    const index = parseInt(editParam as string);
    if (!isNaN(index) && index >= 0 && index < servers.value.length) {
      isEditing.value = true;
      editingIndex.value = index;
      editedServer.value = JSON.parse(JSON.stringify(servers.value[index]));
    }
  }
});

const handleIconUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (file) {
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('File is too large. Maximum size: 2MB');
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      editedServer.value.icon = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const removeIcon = () => {
  editedServer.value.icon = undefined;
};

const saveServer = () => {
  if (editedServer.value.name.trim() === '' || editedServer.value.url.trim() === '') {
    alert('Server name and URL cannot be empty.');
    return;
  }
  
  if (isEditing.value && editingIndex.value !== -1) {
    servers.value[editingIndex.value] = JSON.parse(JSON.stringify(editedServer.value));
  } else {
    servers.value.push(JSON.parse(JSON.stringify(editedServer.value)));
  }
  
  saveToLocalStorage();
  goToList();
};

const goToList = () => {
  router.push('/servers-list');
};
</script>

<style scoped>
/* No scoped styles needed as Tailwind is used throughout */
</style>

