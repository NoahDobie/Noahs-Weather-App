import { create } from 'zustand';

/**
 * @typedef {Object} Weather
 * @property {string} city - The city name.
 * @property {string} country - The country name.
 * @property {string} date - The date of the weather data.
 * @property {string} icon - The weather icon URL.
 * @property {string} description - The weather description.
 * @property {number} temperature - The temperature.
 */

/**
 * @typedef {Object} Store
 * @property {string} city - The current city name.
 * @property {function(string): void} setCity - Function to set the current city name.
 * @property {string} searchCity - The city name being searched.
 * @property {function(string): void} setSearchCity - Function to set the city name being searched.
 * @property {boolean} weatherLoaded - Flag indicating if the weather data has been loaded.
 * @property {function(boolean): void} setWeatherLoaded - Function to set the weatherLoaded flag.
 * @property {Weather[]} weatherHistory - The list of weather forecasts.
 * @property {function(Weather): void} addWeatherToHistory - Function to add a weather forecast to the history.
 * @property {function(string): void} removeWeatherFromHistory - Function to remove a weather forecast from the history.
 * @property {number} maxHistory - The maximum number of weather forecasts to keep in history.
 * @property {function(number): void} setMaxHistory - Function to set the maximum number of weather forecasts to keep in history.
 */

const initialState = {
    city: '',
    searchCity: '',
    weatherLoaded: false,
    weatherHistory: [],
    maxHistory: 4,
};

const useStore = create((set) => ({
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
    setMaxHistory: (maxHistory) => set({ maxHistory }),
}));

export default useStore;