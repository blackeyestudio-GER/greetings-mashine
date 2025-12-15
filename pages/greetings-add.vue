<template>
  <div class="bg-eerie-black rounded-lg text-gray-100">
    <section class="bg-gray-700 p-3 md:p-5 rounded-lg shadow-md">
      <!-- Message -->
      <div class="mb-4 md:mb-5">
        <label class="block text-gray-300 mb-2 font-semibold text-sm md:text-base">Message:</label>
        <textarea
          v-model="editedGreeting.text"
          placeholder="Enter your greeting message here..."
          class="w-full p-2 md:p-3 text-sm md:text-base border border-gray-600 rounded-md bg-night text-gray-100 placeholder-gray-400 focus:outline-none focus:border-dark-slate-gray min-h-[120px] md:min-h-[150px] resize-y"
        ></textarea>
      </div>
      
      <!-- Servers and Days side by side on desktop, stacked on mobile -->
      <div class="flex flex-col md:flex-row gap-3 md:gap-4 mb-4 md:mb-5">
        <!-- Server selection -->
        <div class="flex-1 bg-night p-3 md:p-4 rounded-md">
          <h3 class="text-gray-300 mb-2 md:mb-3 font-semibold text-sm md:text-base">Available for Servers:</h3>
          
          <div v-if="servers.length === 0" class="text-center py-3 md:py-4">
            <p class="text-gray-400 text-xs md:text-sm mb-2 md:mb-3">No servers yet.</p>
            <button 
              @click="router.push('/servers-add')"
              class="btn-md btn btn-secondary mx-auto"
            >
              <Icon icon="heroicons:plus-20-solid" class="w-4 h-4 mr-1.5" />
              Add Server
            </button>
          </div>
          
          <div v-else class="space-y-1.5 md:space-y-2">
            <!-- All Servers Option -->
            <label class="flex items-center gap-2 cursor-pointer hover:bg-gray-600 p-1.5 md:p-2 rounded transition-colors border border-gray-500">
              <input 
                type="checkbox" 
                :checked="isAllServersSelected"
                @change="toggleAllServers"
                class="w-3.5 h-3.5 md:w-4 md:h-4 text-dark-slate-gray bg-gray-700 border-gray-600 rounded focus:ring-dark-slate-gray"
              />
              <span class="text-gray-200 font-semibold text-xs md:text-sm">All Servers</span>
            </label>
            
            <!-- Individual Servers (vertical list) -->
            <div class="flex flex-col gap-0.5 md:gap-1">
              <label 
                v-for="server in servers" 
                :key="server.id" 
                class="flex items-center gap-2 cursor-pointer hover:bg-gray-600 p-1.5 md:p-2 rounded transition-colors"
                :class="{ 'opacity-50': isAllServersSelected }"
              >
                <input 
                  type="checkbox" 
                  :value="server.id"
                  v-model="editedGreeting.serverIds"
                  :disabled="isAllServersSelected"
                  class="w-3.5 h-3.5 md:w-4 md:h-4 text-dark-slate-gray bg-gray-700 border-gray-600 rounded focus:ring-dark-slate-gray disabled:opacity-50"
                />
                <div class="flex items-center gap-1.5 md:gap-2">
                  <div v-if="server.icon" class="w-5 h-5 md:w-6 md:h-6 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
                    <img :src="server.icon" alt="" class="w-full h-full object-cover" />
                  </div>
                  <div v-else class="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                    <Icon icon="heroicons:server-20-solid" class="w-3 h-3 text-gray-400" />
                  </div>
                  <span class="text-gray-200 text-xs md:text-sm">{{ server.name }}</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Days of week selection -->
        <div class="flex-1 bg-night p-3 md:p-4 rounded-md">
          <h3 class="text-gray-300 mb-2 md:mb-3 font-semibold text-sm md:text-base">Available Days:</h3>
          <div class="flex flex-col gap-1.5 md:gap-2">
            <!-- Everyday Option -->
            <label class="flex items-center gap-2 cursor-pointer hover:bg-gray-600 p-1.5 md:p-2 rounded transition-colors border border-gray-500">
              <input 
                type="checkbox" 
                :checked="isAllDaysSelected"
                @change="toggleAllDays"
                class="w-3.5 h-3.5 md:w-4 md:h-4 text-dark-slate-gray bg-gray-700 border-gray-600 rounded focus:ring-dark-slate-gray"
              />
              <span class="text-gray-200 font-semibold text-xs md:text-sm">Everyday</span>
            </label>
            
            <!-- Individual Days -->
            <div class="flex flex-col gap-0.5 md:gap-1">
              <label v-for="day in daysOfWeek" :key="day.key" class="flex items-center gap-2 cursor-pointer hover:bg-gray-600 p-1.5 md:p-2 rounded transition-colors">
                <input 
                  type="checkbox" 
                  v-model="editedGreeting.days[day.key]"
                  class="w-3.5 h-3.5 md:w-4 md:h-4 text-dark-slate-gray bg-gray-700 border-gray-600 rounded focus:ring-dark-slate-gray"
                />
                <span class="text-gray-200 text-xs md:text-sm">{{ day.labelFull }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Buttons aligned right -->
      <div class="flex flex-col sm:flex-row gap-2 md:gap-3 mt-4 md:mt-6 sm:justify-end">
        <button 
          @click="goToList" 
          class="btn-cancel order-2 sm:order-1"
        >
          <Icon icon="heroicons:x-mark-20-solid" class="w-5 h-5 mr-2" />
          Cancel
        </button>
        
        <button 
          @click="saveGreeting" 
          :disabled="!editedGreeting.text.trim() || editedGreeting.serverIds.length === 0"
          class="btn-action-primary disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
        >
          <Icon icon="heroicons:arrow-down-tray-20-solid" class="w-5 h-5 mr-2" />
          {{ isEditing ? 'Save Changes' : 'Create Greeting' }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { useGreetingsData, type Greeting } from '~/composables/useGreetingsData';
import { WEEKDAYS, DEFAULT_DAYS } from '~/constants';

const { greetings, servers, saveToLocalStorage, loadFromLocalStorage } = useGreetingsData();
const router = useRouter();
const route = useRoute();

const isEditing = ref(false);
const editingIndex = ref(-1);

const editedGreeting = ref<Greeting>({
  text: '',
  days: { ...DEFAULT_DAYS },
  serverIds: ['all']
});

const daysOfWeek = WEEKDAYS;

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

