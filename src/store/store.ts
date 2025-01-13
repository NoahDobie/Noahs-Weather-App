import { create } from 'zustand';
import { detectSystemTheme } from '../utils/utils'; // Import the utility function

/**
 * @typedef {Object} Weather
 * @property {string} city - The city name.
 * @property {string} country - The country name.
 * @property {string} date - The date of the weather data.
 * @property {string} icon - The weather icon URL.
 * @property {string} description - The weather description.
 * @property {number} temperature - The temperature.
 */

interface Weather {
    city: string;
    country: string;
    date: string;
    icon: string;
    description: string;
    temperature: number;
}

interface Store {
    city: string;
    setCity: (city: string) => void;
    searchCity: string;
    setSearchCity: (searchCity: string) => void;

    weatherLoaded: boolean;
    setWeatherLoaded: (weatherLoaded: boolean) => void;

    weatherHistory: Weather[];
    addWeatherToHistory: (weather: Weather) => void;
    removeWeatherFromHistory: (city: string) => void;
    maxHistory: number;
    
    theme: string;
    toggleTheme: (newTheme?: string) => void;
}

const initialState = {
    city: '',
    searchCity: '',
    weatherLoaded: false,
    weatherHistory: [],
    maxHistory: 4,
    theme: detectSystemTheme(), // Set the initial theme based on the system theme
};

/**
 * Zustand store for managing the state of the Weather App.
 * 
 * @typedef {Object} Store
 * @property {string} city - The current city.
 * @property {string} searchCity - The city being searched.
 * @property {boolean} weatherLoaded - Indicates if the weather data is loaded.
 * @property {Array<Object>} weatherHistory - The history of weather data.
 * @property {number} maxHistory - The maximum number of weather history entries.
 * @property {string} theme - The current theme ('light' or 'dark').
 * 
 * @function setCity
 * @description Sets the current city.
 * @param {string} city - The city to set.
 * 
 * @function setSearchCity
 * @description Sets the city being searched.
 * @param {string} searchCity - The city to set for search.
 * 
 * @function setWeatherLoaded
 * @description Sets the weather loaded state.
 * @param {boolean} weatherLoaded - The weather loaded state to set.
 * 
 * @function addWeatherToHistory
 * @description Adds a weather entry to the history.
 * @param {Object} weather - The weather data to add.
 * 
 * @function removeWeatherFromHistory
 * @description Removes a weather entry from the history by city.
 * @param {string} city - The city of the weather entry to remove.
 * 
 * @function toggleTheme
 * @description Toggles the theme between 'light' and 'dark'.
 * @param {string} [newTheme] - The new theme to set. If not provided, toggles between 'light' and 'dark'.
 */
const useStore = create<Store>((set) => ({
    ...initialState,

    setCity: (city) => set({ city }),
    setSearchCity: (searchCity) => set({ searchCity }),
    setWeatherLoaded: (weatherLoaded) => set({ weatherLoaded }),

    addWeatherToHistory: (weather) => set((state) => {
        const newHistory = [weather, ...state.weatherHistory];
        return { weatherHistory: newHistory.slice(0, state.maxHistory) };
    }),

    removeWeatherFromHistory: (city) => set((state) => ({
        weatherHistory: state.weatherHistory.filter((weather) => weather.city !== city),
    })),

    toggleTheme: (newTheme) => set((state) => ({
        theme: newTheme || (state.theme === 'dark' ? 'light' : 'dark'),
    })),
}));

export default useStore;