import { useState, useEffect } from 'react';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // API key for OpenWeatherMap API

/**
 * Custom hook to fetch and manage weather data from OpenWeatherMap API.
 *
 * @param {string} city - The name of the city to fetch weather data for.
 * @returns {Object} An object containing the weather data, loading state, and error state.
 * @returns {Object|null} return.weather - The weather data object or null if not available.
 * @returns {string} return.weather.city - The name of the city.
 * @returns {string} return.weather.country - The country code of the city.
 * @returns {string} return.weather.date - The formatted date of the weather data.
 * @returns {string} return.weather.icon - The URL of the weather icon.
 * @returns {string} return.weather.description - The weather description.
 * @returns {number} return.weather.temperature - The temperature in Celsius.
 * @returns {boolean} return.loading - The loading state of the weather data.
 * @returns {string|null} return.error - The error message if the API request fails, or null if no error.
 */
const useWeather = (city) => {
    const [weather, setWeather] = useState(null); // Entire weather data variable

    const [loading, setLoading] = useState(false); // For loading state of the weather data
    const [error, setError] = useState(null); // For error state of the weather data (i.e. if the API request fails)

    // Fetch weather data from OpenWeatherMap API
    useEffect(() => {
        if (city) {
            const fetchWeather = async () => {
                
                setLoading(true); // Set loading state to true
                setError(null); // Reset error state

                try {
                    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
                    const query = `?q=${city}&appid=${API_KEY}&units=metric`;
                    const url = baseUrl + query;

                    // Fetch weather data and check if the response is successful
                    const response = await fetch(url);

                    if (!response.ok) {
                        throw new Error('Failed to fetch weather data.');
                    }

                    const data = await response.json();

                    // Set the weather variable with the fetched data
                    setWeather({
                        city: data.name,
                        country: data.sys.country,
                        date: new Date(data.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' }),
                        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
                        description: data.weather[0].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                        temperature: Math.round(data.main.temp),
                    });
                } catch (error) { // If an error occurs, set the error state and reset the weather state
                    setError(error.message);
                    setWeather(null);
                } finally {
                    setLoading(false); // Set loading state to false as the request is complete
                }
            };
            fetchWeather(); // Call the fetchWeather function
        }
    }, [city]);

    return { weather, loading, error }; // Return the weather data, loading state, and error state
};

export default useWeather;