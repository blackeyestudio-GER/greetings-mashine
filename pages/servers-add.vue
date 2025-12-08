<template>
  <div class="p-5 bg-eerie-black rounded-lg text-gray-100">
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
              <Icon icon="heroicons:photo-20-solid" class="w-16 h-16 text-gray-400" />
            </div>
            <div class="w-full flex flex-col gap-2">
              <label class="px-3 py-2 rounded-md cursor-pointer text-sm transition-colors duration-200 flex items-center justify-center" style="background-color: var(--color-info); color: var(--color-text-secondary);">
                <Icon icon="heroicons:arrow-up-tray-20-solid" class="w-4 h-4 mr-1" />
                Upload
                <input type="file" accept="image/*" @change="handleIconUpload" class="hidden" />
              </label>
              <button 
                v-if="editedServer.icon" 
                @click="removeIcon" 
                class="px-3 py-2 rounded-md text-sm transition-colors duration-200"
                style="background-color: var(--color-danger); color: var(--color-text-secondary);"
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
          class="btn-cancel"
        >
          <Icon icon="heroicons:x-mark-20-solid" class="w-6 h-6 mr-2" />
          Cancel
        </button>
        
        <button 
          @click="saveServer" 
          :disabled="!editedServer.name.trim() || !editedServer.url.trim()"
          class="btn-action-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon icon="heroicons:arrow-down-tray-20-solid" class="w-6 h-6 mr-2" />
          {{ isEditing ? 'Save Changes' : 'Create Server' }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
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

