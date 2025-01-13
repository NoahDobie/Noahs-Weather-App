import React, { useEffect } from 'react';
import './tailwind.css';
import CityInput from './components/CityInput';
import WeatherList from './components/WeatherList';
import ThemeToggle from './components/ThemeToggle';
import useStore from './store/store';
import useWeather from './hooks/useWeather';

const App: React.FC = () => {
    const { city, setCity, searchCity, setSearchCity, setWeatherLoaded, weatherHistory, addWeatherToHistory, theme } = useStore();
    const { weather, loading, error } = useWeather(searchCity);

    // Handle search for weather data
    const handleSearch = () => {
        if (city.trim() !== '') {
            console.log('Searching for city:', city); // Debug log
            setSearchCity(city); // Set the city being searched
            setWeatherLoaded(true); // Set the weather data loaded flag
            setCity(''); // Clear the city input
        }
    };

    // Handle key press event
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' || event.key === 'Done' || event.keyCode === 13) {
            handleSearch();
        }
    };

    // Add weather to history when new weather data is fetched
    useEffect(() => {
        if (weather) {
            console.log('Adding weather to history:', weather); // Debug log
            addWeatherToHistory(weather);
        }
    }, [weather, addWeatherToHistory]);

    const title = 'Noah\'s Weather App';

    // Render the app
    return (
        <div className={`min-w-screen min-h-screen h-screen flex flex-col justify-center items-center font-sans overflow-hidden transition-all duration-500
            ${theme === 'dark' ? 'bg-dark-background text-dark-text' : 'bg-light-background text-light-text'}`}
        >
            <ThemeToggle />

            <h1 className="mt-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold flex items-center">
                {title}
            </h1>

            <CityInput handleKeyPress={handleKeyPress} error={error} />

            <div className="w-full flex justify-center">
                <WeatherList weatherHistory={weatherHistory} loading={loading} />
            </div>
        </div>
    );
}

export default App;