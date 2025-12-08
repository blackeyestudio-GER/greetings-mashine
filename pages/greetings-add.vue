<template>
  <div class="p-5 bg-eerie-black rounded-lg text-gray-100">
    <section class="bg-gray-700 p-5 rounded-lg shadow-md mb-6">
      <!-- Message -->
      <div class="mb-5">
        <label class="block text-gray-300 mb-2 font-semibold">Message:</label>
        <textarea
          v-model="editedGreeting.text"
          placeholder="Enter your greeting message here..."
          class="w-full p-3 border border-gray-600 rounded-md bg-night text-gray-100 placeholder-gray-400 focus:outline-none focus:border-dark-slate-gray min-h-[150px] resize-y"
        ></textarea>
      </div>
      
      <!-- Servers and Days side by side -->
      <div class="flex gap-4 mb-5">
        <!-- Left side: Server selection -->
        <div class="flex-1 bg-night p-4 rounded-md">
          <h3 class="text-gray-300 mb-3 font-semibold">Available for Servers:</h3>
          
          <div v-if="servers.length === 0" class="text-center py-4">
            <p class="text-gray-400 text-sm mb-3">No servers yet.</p>
            <button 
              @click="router.push('/servers-add')"
              class="px-6 py-3 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center mx-auto"
            >
              <Icon icon="heroicons:plus-20-solid" class="w-5 h-5 mr-2" />
              Add Server
            </button>
          </div>
          
          <div v-else class="space-y-2">
            <!-- All Servers Option -->
            <label class="flex items-center gap-2 cursor-pointer hover:bg-gray-600 p-2 rounded transition-colors border border-gray-500">
              <input 
                type="checkbox" 
                :checked="isAllServersSelected"
                @change="toggleAllServers"
                class="w-4 h-4 text-dark-slate-gray bg-gray-700 border-gray-600 rounded focus:ring-dark-slate-gray"
              />
              <span class="text-gray-200 font-semibold">All Servers</span>
            </label>
            
            <!-- Individual Servers (vertical list) -->
            <div class="flex flex-col gap-1">
              <label 
                v-for="server in servers" 
                :key="server.id" 
                class="flex items-center gap-2 cursor-pointer hover:bg-gray-600 p-2 rounded transition-colors"
                :class="{ 'opacity-50': isAllServersSelected }"
              >
                <input 
                  type="checkbox" 
                  :value="server.id"
                  v-model="editedGreeting.serverIds"
                  :disabled="isAllServersSelected"
                  class="w-4 h-4 text-dark-slate-gray bg-gray-700 border-gray-600 rounded focus:ring-dark-slate-gray disabled:opacity-50"
                />
                <div class="flex items-center gap-2">
                  <div v-if="server.icon" class="w-6 h-6 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
                    <img :src="server.icon" alt="" class="w-full h-full object-cover" />
                  </div>
                  <div v-else class="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                    <Icon icon="heroicons:server-20-solid" class="w-3 h-3 text-gray-400" />
                  </div>
                  <span class="text-gray-200 text-sm">{{ server.name }}</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Right side: Days of week selection -->
        <div class="flex-1 bg-night p-4 rounded-md">
          <h3 class="text-gray-300 mb-3 font-semibold">Available Days:</h3>
          <div class="flex flex-col gap-2">
            <!-- Everyday Option -->
            <label class="flex items-center gap-2 cursor-pointer hover:bg-gray-600 p-2 rounded transition-colors border border-gray-500">
              <input 
                type="checkbox" 
                :checked="isAllDaysSelected"
                @change="toggleAllDays"
                class="w-4 h-4 text-dark-slate-gray bg-gray-700 border-gray-600 rounded focus:ring-dark-slate-gray"
              />
              <span class="text-gray-200 font-semibold">Everyday</span>
            </label>
            
            <!-- Individual Days -->
            <div class="flex flex-col gap-1">
              <label v-for="day in daysOfWeek" :key="day.key" class="flex items-center gap-2 cursor-pointer hover:bg-gray-600 p-2 rounded transition-colors">
                <input 
                  type="checkbox" 
                  v-model="editedGreeting.days[day.key]"
                  class="w-4 h-4 text-dark-slate-gray bg-gray-700 border-gray-600 rounded focus:ring-dark-slate-gray"
                />
                <span class="text-gray-200">{{ day.label }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Buttons side by side (aligned right) -->
      <div class="flex gap-3 mt-6 justify-end">
        <button 
          @click="goToList" 
          class="px-8 py-4 border-2 border-gray-500 rounded-lg cursor-pointer text-lg transition-colors duration-200 text-gray-300 hover:bg-gray-600 flex items-center justify-center"
        >
          <Icon icon="heroicons:x-mark-20-solid" class="w-6 h-6 mr-2" />
          Cancel
        </button>
        
        <button 
          @click="saveGreeting" 
          :disabled="!editedGreeting.text.trim() || editedGreeting.serverIds.length === 0"
          class="px-8 py-4 border-2 border-green-500 rounded-lg cursor-pointer text-lg transition-colors duration-200 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon icon="heroicons:arrow-down-tray-20-solid" class="w-6 h-6 mr-2" />
          {{ isEditing ? 'Save Changes' : 'Create Greeting' }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Icon } from '@iconify/vue';
import { useGreetingsData, type Greeting } from '~/composables/useGreetingsData';

const { greetings, servers, saveToLocalStorage, loadFromLocalStorage } = useGreetingsData();
const router = useRouter();
const route = useRoute();

const isEditing = ref(false);
const editingIndex = ref(-1);

const editedGreeting = ref<Greeting>({
  text: '',
  days: {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true
  },
  serverIds: ['all']
});

const daysOfWeek = [
  { key: 'monday' as const, label: 'Monday' },
  { key: 'tuesday' as const, label: 'Tuesday' },
  { key: 'wednesday' as const, label: 'Wednesday' },
  { key: 'thursday' as const, label: 'Thursday' },
  { key: 'friday' as const, label: 'Friday' },
  { key: 'saturday' as const, label: 'Saturday' },
  { key: 'sunday' as const, label: 'Sunday' }
];

const isAllServersSelected = computed(() => {
  return editedGreeting.value.serverIds.includes('all');
});

const toggleAllServers = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked;
  if (checked) {
    editedGreeting.value.serverIds = ['all'];
  } else {
    editedGreeting.value.serverIds = [];
  }
};

const isAllDaysSelected = computed(() => {
  return Object.values(editedGreeting.value.days).every(day => day === true);
});

const toggleAllDays = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked;
  daysOfWeek.forEach(day => {
    editedGreeting.value.days[day.key] = checked;
  });
};

onMounted(() => {
  loadFromLocalStorage();
  
  const editParam = route.query.edit;
  if (editParam !== undefined) {
    const index = parseInt(editParam as string);
    if (!isNaN(index) && index >= 0 && index < greetings.value.length) {
      isEditing.value = true;
      editingIndex.value = index;
      const greeting = JSON.parse(JSON.stringify(greetings.value[index]));
      // Ensure serverIds exists
      if (!greeting.serverIds) {
        greeting.serverIds = ['all'];
      }
      editedGreeting.value = greeting;
    }
  }
});

const saveGreeting = () => {
  if (editedGreeting.value.text.trim() === '') {
    alert('Message cannot be empty.');
    return;
  }
  
  if (editedGreeting.value.serverIds.length === 0) {
    alert('Please select at least one server.');
    return;
  }
  
  if (isEditing.value && editingIndex.value !== -1) {
    greetings.value[editingIndex.value] = JSON.parse(JSON.stringify(editedGreeting.value));
  } else {
    greetings.value.push(JSON.parse(JSON.stringify(editedGreeting.value)));
  }
  
  saveToLocalStorage();
  goToList();
};

const goToList = () => {
  router.push('/greetings-list');
};
</script>

<style scoped>
/* No scoped styles needed as Tailwind is used throughout */
</style>

