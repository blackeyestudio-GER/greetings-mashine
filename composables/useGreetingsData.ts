// No imports needed - using Nuxt's useState

export interface Greeting {
  text: string;
  days: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  serverIds: string[]; // Array of server IDs, or ['all'] for all servers
}

export interface Server {
  id: string;
  name: string;
  url: string;
  icon?: string; // base64 encoded image
  lastGreeted?: number | null;
}

// Generate a unique ID
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const useGreetingsData = () => {
  const greetings = useState<Greeting[]>('greetings', () => []);
  const servers = useState<Server[]>('servers', () => []);

  const saveToLocalStorage = () => {
    if (process.client) {
      localStorage.setItem('greetingsData', JSON.stringify(greetings.value));
      localStorage.setItem('serversData', JSON.stringify(servers.value));
    }
  };

  const loadFromLocalStorage = () => {
    if (process.client) {
      const storedGreetings = localStorage.getItem('greetingsData');
      if (storedGreetings) {
        try {
          const parsed = JSON.parse(storedGreetings);
          // Migrate old greetings to include serverIds
          greetings.value = parsed.map((greeting: any) => ({
            ...greeting,
            serverIds: greeting.serverIds || ['all']
          }));
        } catch (e) {
          console.error('Error loading greetings:', e);
        }
      }

      const storedServers = localStorage.getItem('serversData');
      if (storedServers) {
        try {
          const parsed = JSON.parse(storedServers);
          let needsSave = false;
          // Migrate old servers to include id
          servers.value = parsed.map((server: any) => {
            if (!server.id) {
              needsSave = true;
              return {
                ...server,
                id: generateId(),
                lastGreeted: server.lastGreeted || null
              };
            }
            return {
              ...server,
              lastGreeted: server.lastGreeted || null
            };
          });
          if (needsSave) {
            saveToLocalStorage();
          }
        } catch (e) {
          console.error('Error loading servers:', e);
        }
      }
    }
  };

  const updateServerGreetedStatus = (serverId: string) => {
    const serverIndex = servers.value.findIndex(s => s.id === serverId);
    if (serverIndex !== -1) {
      const currentTime = Date.now();
      const eighteenHoursInMs = 18 * 60 * 60 * 1000;
      servers.value[serverIndex].lastGreeted = currentTime + eighteenHoursInMs;
      saveToLocalStorage();
    }
  };

  const checkAndResetGreetedStatus = () => {
    servers.value.forEach(server => {
      if (server.lastGreeted && Date.now() > server.lastGreeted) {
        server.lastGreeted = null;
      }
    });
    saveToLocalStorage();
  };

  // Get greetings that are valid for today
  const getGreetingsForToday = (): Greeting[] => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()] as keyof Greeting['days'];
    
    return greetings.value.filter(greeting => greeting.days[today]);
  };

  // Get greetings for a specific server
  const getGreetingsForServer = (serverId: string): Greeting[] => {
    const todayGreetings = getGreetingsForToday();
    return todayGreetings.filter(greeting => 
      greeting.serverIds.includes('all') || greeting.serverIds.includes(serverId)
    );
  };

  // Remove server ID from all greetings and set to 'all' if empty
  const removeServerFromGreetings = (serverId: string) => {
    greetings.value.forEach(greeting => {
      // Skip if this greeting is already set to 'all'
      if (greeting.serverIds.includes('all')) {
        return;
      }
      
      // Remove the server ID from the greeting's serverIds array
      const index = greeting.serverIds.indexOf(serverId);
      if (index > -1) {
        greeting.serverIds.splice(index, 1);
        
        // If serverIds is empty after removal, default to 'all'
        if (greeting.serverIds.length === 0) {
          greeting.serverIds = ['all'];
        }
      }
    });
    saveToLocalStorage();
  };

  return {
    greetings,
    servers,
    saveToLocalStorage,
    loadFromLocalStorage,
    updateServerGreetedStatus,
    checkAndResetGreetedStatus,
    getGreetingsForToday,
    getGreetingsForServer,
    generateId,
    removeServerFromGreetings
  };
};

