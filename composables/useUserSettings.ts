import { ref } from 'vue';

export interface UserSettings {
  theme: {
    selectedTheme?: string;
    primaryColor: string;
    backgroundColor: string;
    accentColor: string;
  };
}

const defaultSettings: UserSettings = {
  theme: {
    selectedTheme: 'default',
    primaryColor: '#3AA1BD', // moonstone
    backgroundColor: '#111212', // night
    accentColor: '#1E4545', // dark-slate-gray
  },
};

// Global state for user settings
const userSettings = ref<UserSettings>(defaultSettings);

export const useUserSettings = () => {
  // Load settings from localStorage
  const loadSettings = () => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem('userSettings');
      if (stored) {
        const parsed = JSON.parse(stored);
        userSettings.value = { ...defaultSettings, ...parsed };
      }
    } catch (error) {
      console.error('Error loading user settings:', error);
    }
  };

  // Save settings to localStorage
  const saveSettings = () => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem('userSettings', JSON.stringify(userSettings.value));
    } catch (error) {
      console.error('Error saving user settings:', error);
    }
  };

  // Reset to default settings
  const resetSettings = () => {
    userSettings.value = { ...defaultSettings };
    saveSettings();
  };

  // Update theme colors
  const updateTheme = (theme: Partial<UserSettings['theme']>) => {
    userSettings.value.theme = { ...userSettings.value.theme, ...theme };
    saveSettings();
  };

  return {
    userSettings,
    loadSettings,
    saveSettings,
    resetSettings,
    updateTheme,
  };
};

