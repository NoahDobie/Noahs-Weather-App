import React, { useEffect } from 'react';
import './tailwind.css';
import Weather from './Weather';
import CityInput from './CityInput';
import WeatherList from './WeatherList';
import LoadingSpinner from './LoadingSpinner';
import useStore from './store';
import useWeather from './useWeather';

/**
 * Main application component for the Weather App.
 * 
 * This component handles the state and actions for searching and displaying weather data.
 * It uses Zustand for state management and includes event handlers for searching weather data
 * and handling key press events.
 * 
 * @component
 * @example
 * return (
 *   <App />
 * )
 * 
 * @returns {JSX.Element} The rendered component.
 */
function App() {
    // Get the store state and actions - from Zustand store.js
    const { city, setCity, searchCity, setSearchCity, weatherLoaded, setWeatherLoaded, weatherHistory, addWeatherToHistory } = useStore();
    const { weather, loading, error } = useWeather(searchCity);

    // Handle search for weather data
    const handleSearch = () => {
        if (city.trim() !== '') {
            setSearchCity(city); // Set the city being searched
            setWeatherLoaded(true); // Set the weather data loaded flag
            setCity(''); // Clear the city input
        }
    };

    // Handle key press event
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') { // If the key pressed is Enter
            handleSearch(); // Search for weather data
        }
    };

    // Add the weather data to history when it is loaded
    useEffect(() => {
        if (weather) {
            addWeatherToHistory(weather);
        }
    }, [weather]);

    const title = 'Noah\'s Weather App'; // App title

    // Render the app
    return (
        <div className={`h-screen flex flex-col justify-center items-center font-sans
            bg-gray-900 text-white overflow-hidden
            transition-all duration-500`}>
            <h1 className="mt-10 mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-semibold">
                { title }
            </h1>
            <CityInput city={city} setCity={setCity} handleKeyPress={handleKeyPress} />
            {loading && <LoadingSpinner />}
            {error && <p className="mt-10 text-center text-red-500">{error}</p>}
            <div className="flex flex-col items-center transition-all duration-500" style={{ minHeight: '200px' }}>
                {weatherHistory.length > 0 && <WeatherList weatherHistory={weatherHistory} />}
            </div>
        </div>
    );
}

export default App;